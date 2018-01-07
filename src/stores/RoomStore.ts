import { observable, computed, action } from "mobx";
import { secondsToTime } from "../helpers/utils";
import * as api from "../vendor/api";
import { RootStore } from "./";

export class RoomStore {
    rootStore: RootStore;
    @observable room: api.Room | null = null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;     
        this.getNewRoom();
    }

    async getNewRoom() {
        const room = await api.getRandomRoom();
        if (room) {
            this.rootStore.routerStore.push(`/${room.data!.name}`);
            this.room = room.data!;

            api.listenRoom(room.data!.name).subscribe(file => {

            });
        }
    }

    getRoom(roomName: string) {

    }

    @computed
    get timeLeft() {
        if (!this.room) {
            return null;
        }
        
        // TODO
        // return secondsToTime(this.room.timeLeft);
    }
}