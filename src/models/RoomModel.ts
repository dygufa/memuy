import { observable, computed, action, toJS } from "mobx";
import * as api from "../vendor/api";
import { fileMd5 } from "../helpers/utils";
import { FileModel } from ".";

export class RoomModel {
    @observable name: string;
    @observable status: string;
    @observable usedSpace: number;
    @observable maxSpace: number;
    @observable files: FileModel[];
    @observable createdAt: Date;
    @observable expiresOn: Date;
    @observable roomUrl: string;

    constructor(room: api.IRoom) {
        this.name = room.name;
        this.status = room.status;
        this.usedSpace = room.usedSpace;
        this.maxSpace = room.maxSpace;
        this.files = room.files.map(f => new FileModel(f));
        this.createdAt = room.createdAt;
        this.expiresOn = room.expiresOn;
        this.roomUrl = `memuy.com/${room.name}`;

        api.listenRoom(this.name).subscribe(file => {
            if (file.roomName === this.name) {
                const findFile = this.files.find(f => f.hash === file.file.hash);

                if (findFile) {
                    findFile.setData(file.file);
                } else {
                    this.files = this.files.concat(new FileModel(file.file));
                }
            }
        });
    }

    @action
    async uploadFile(file: File) {
        const md5Hash = await fileMd5(file);

        const fileModel = new FileModel();
        fileModel.setHash(md5Hash);
        fileModel.setStatus("uploading");
        this.files = this.files.concat(fileModel);

        api.uploadFile(this.name, file, (progress) => {
            const progressPercentage = progress.loaded / progress.total * 100;
            if (progressPercentage === 100) {
                fileModel.setStatus("processing");
            } else {
                fileModel.setUploadProgress(progressPercentage);
            }

        }).then(res => {
            if (res.status) {
                const file = res.data!;
                fileModel.setData(file);
                fileModel.setStatus("idle");
                this.usedSpace += file.size;
            }
        });
    }
}