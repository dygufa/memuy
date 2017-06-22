import { observable, computed, action } from "mobx";
import { secondsToTime } from "../vendor/helpers";
const io = require("socket.io-client");

const API_ENDPOINT = "https://api.memuy.com";
const socket = io(API_ENDPOINT);

export interface IRoom {
    id: string;
    maxSpace: number;
    room: string;
    status: number;
    timeLeft: number;
    usedSpace: number; 
}

export class RoomStore {
    // @observable files = [];
    @observable room: IRoom = null;

    constructor() {     
        socket.on("connect_error", this._connectionError);
        socket.on("roomData", this._roomData)
        socket.on("newFile", this._newFile)
        socket.on("roomError", this._roomError)
    }

    _connectionError = (data: any) => {
        console.log(data);
    }

    _roomData = (data: any) => {
        this.room = data;  
    }

    _newFile = (data: any) => {
        console.log(data);
    }

    _roomError = (data: any) => {
        console.log(data);
    }

    getNewRoom() {
        socket.emit("newRoom");
    }

    getRoom(roomId: string) {
        socket.emit('tryRoom', roomId, {type: "url"});
    }

    @computed
    get timeLeft() {
        if (!this.room) {
            return null;
        }
        return secondsToTime(this.room.timeLeft);
    }
}