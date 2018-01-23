import { observable, computed, action, toJS } from "mobx";
import * as api from "../vendor/api";
import { FileModel } from "."

export class RoomModel {
    @observable name: string;
    @observable status: string;
    @observable usedSpace: number;
    @observable maxSpace: number;
    @observable files: FileModel[];
    @observable createdAt: Date;
    @observable expiresOn: Date;

    constructor(room: api.IRoom) {
        this.name = room.name;
        this.status = room.status;
        this.usedSpace = room.usedSpace;
        this.maxSpace = room.maxSpace;
        this.files = room.files.map(f => new FileModel(f));
        this.createdAt = room.createdAt;
        this.expiresOn = room.expiresOn;

        api.listenRoom(this.name).subscribe(file => {
            if (file.roomName === this.name && !this.files.find(f => f.name === file.file.name)) {
                this.files = this.files.concat(new FileModel(file.file));
            }
        });
    }

    @action
    uploadFile(file: File) {
        const fileModel = new FileModel();
        fileModel.setStatus("uploading");
        this.files = this.files.concat(fileModel);

        api.uploadFile(this.name, file, (progress) => {
            const progressPercentage = progress.loaded / progress.total * 100;
            if (progressPercentage === 100) {
                fileModel.setStatus("processing");
            } else {
                fileModel.setUploadProgress(progressPercentage.toString());
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