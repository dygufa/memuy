import { observable, action, toJS } from "mobx";
import { secondsToTime } from "../helpers/utils";
import { RootStore } from "./";
import { RoomModel } from "../models/";
import * as api from "../vendor/api";

export class RoomStore {
    rootStore: RootStore;
    @observable room: RoomModel | null = null;
    @observable error!: string | null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;     
    }

    async getNewRoom() {
        const room = await api.getRandomRoom();
        if (room.status === "success") {
            this.error = null;
            this.rootStore.routerStore.push(`/${room.data!.name}`);
            this.room = new RoomModel(room.data!);
        }
    }

    async getRoom(roomName: string) {
        const room = await api.getRoom(roomName);
        
        if (room.status === "fail") {
            this.error = room.error!.name;
        } else {
            this.error = null;
            this.room = new RoomModel(room.data!);
        }      
    }

}