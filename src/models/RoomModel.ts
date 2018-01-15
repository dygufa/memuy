import { observable, computed, action, toJS } from "mobx";
import * as api from "../vendor/api";

export class RoomModel {
    @observable name: string;
    @observable status: string;
    @observable usedSpace: number;
    @observable maxSpace: number;
    @observable files: api.IFile[];
    @observable createdAt: Date;
    @observable expiresOn: Date;

    constructor(room: api.IRoom) {
        this.name = room.name;
        this.status = room.status;
        this.usedSpace = room.usedSpace;
        this.maxSpace = room.maxSpace;
        this.files = room.files;
        this.createdAt = room.createdAt;
        this.expiresOn = room.expiresOn;

        api.listenRoom(this.name).subscribe(file => {
            this.addFile(file);
        });
    }


    addFile(file: api.IFile) {
        if (!this.files.find(f => f.name === file.name)) {
            this.files = this.files.concat(file);
        }
    }

    @action
    uploadFile(file: File) {
        api.uploadFile(this.name, file).then(res => {
            if (res.status) {
                this.addFile(res.data!);
            }
        });
    }
}