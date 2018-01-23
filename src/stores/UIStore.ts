import { observable, computed, action, toJS } from "mobx";
import { RootStore } from "./";

export class UIStore {
    rootStore: RootStore;
    @observable draggingFile: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;     
    }
}