import { observable, computed, action, toJS } from "mobx";
import { secondsToTime } from "../helpers/utils";
import { RootStore } from "./";
import { RoomModel } from "../models/";
import * as api from "../vendor/api";

export class RoomStore {
    rootStore: RootStore;
    @observable room: RoomModel | null = null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;     
    }

    async getNewRoom() {
        const room = await api.getRandomRoom();
        if (room) {
            this.rootStore.routerStore.push(`/${room.data!.name}`);
            this.room = new RoomModel(room.data!);
        }
    }

    async getRoom(roomName: string) {
        const room = await api.getRoom(roomName);
        if (room) {
            this.room = new RoomModel(room.data!);
        }
    }
}