import { observable, computed, action, toJS } from "mobx";
import * as api from "../vendor/api";

var IMAGE_MIMETYPES = ["image/jpeg", "image/png"];

export class FileModel {
    @observable name: string;
    @observable location: string;
    @observable size: number;
    @observable mimetype: string;
    @observable status: "idle" | "processing" | "uploading" = "idle";
    @observable uploadProgress: string;

    constructor(file?: api.IFile) {
        if (file) {
            this._setData(file);
        }        
    }

    private _setData(file: api.IFile) {
        this.name = file.name;
        this.location = file.location;
        this.size = file.size;
        this.mimetype = file.mimetype;     
    }

    @action
    setStatus(status: "idle" | "processing" | "uploading") {
        this.status = status;
    }

    @computed
    get fileType() {
        if (IMAGE_MIMETYPES.indexOf(this.mimetype) !== -1) {
            return "image";
        }

        return "file";
    }

    @action
    setUploadProgress(uploadProgress: string) {
        this.uploadProgress = uploadProgress;
    }

    @action
    setData(file: api.IFile) {
        this._setData(file);
    }
}