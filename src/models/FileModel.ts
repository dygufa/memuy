import { observable, computed, action, toJS } from "mobx";
import * as api from "../vendor/api";

export class FileModel {
    @observable name: string;
    @observable location: string;
    @observable size: number;
    @observable mimetype: string;
    @observable uploading: boolean = true;
    @observable uploadProgress: number;

    constructor(file?: api.IFile) {
        if (file) {
            this._setData(file);
            this.uploading = false;
        }        
    }

    private _setData(file: api.IFile) {
        this.name = file.name;
        this.location = file.location;
        this.size = file.size;
        this.mimetype = file.mimetype;
        
    }

    @action
    setUploadProgress(progress: number) {
        this.uploadProgress = progress;
    }

    @action
    setData(file: api.IFile) {
        this._setData(file);
    }
}