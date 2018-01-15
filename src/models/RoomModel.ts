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
            if (!this.files.find(f => f.name === file.name)) {
                this.files = this.files.concat(new FileModel(file));
            }
        });
    }

    @action
    uploadFile(file: File) {
        const fileModel = new FileModel();
        this.files = this.files.concat(fileModel);

        api.uploadFile(this.name, file, (progress) => {
            fileModel.setUploadProgress(progress.loaded / progress.total * 100);
        }).then(res => {
            if (res.status) {
                fileModel.setData(res.data!);
            }
        });
    }
}