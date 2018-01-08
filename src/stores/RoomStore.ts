import { observable, computed, action, toJS } from "mobx";
import { secondsToTime } from "../helpers/utils";
import * as api from "../vendor/api";
import { RootStore } from "./";

export class RoomStore {
    rootStore: RootStore;
    @observable room: api.Room | null = null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;     
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

    async getRoom(roomName: string) {
        const room = await api.getRoom(roomName);
        if (room) {
            this.room = room.data!;
        }
        console.log(toJS(this.room));
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