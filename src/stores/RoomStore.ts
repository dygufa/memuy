import { observable, computed, action } from "mobx";
import { secondsToTime } from "../helpers/utils";
import { Room } from "../vendor/api";

export class RoomStore {
    @observable room: Room | null = null;

    constructor() {     
        
    }


    getNewRoom() {
        
    }

    getRoom(roomId: string) {
        
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