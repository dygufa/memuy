import * as io from "socket.io-client";
import { Observable } from 'rxjs/Observable';

const API_ENDPOINT = process.env.NODE_ENV === "development" ? "http://localhost:9090/v2" : "https://api.memuy.com/v2";
const socket = io(API_ENDPOINT);

export interface ApiResponse<Payload> {
    status: string
    data?: Payload
    error?: {
        name: string
        message: string
    }
};

export interface Room {
    name: string
    status: string
    usedSpace: number
    maxSpace: number
    files: File[]
    createdAt: Date
    expiresOn: Date
}

export interface File {
    name: string
    location: string
    size: number
    mimetype: string
}

const getToken = () => {
    return localStorage.getItem("jwt");
};

const parseDates = <T>(object: ApiResponse<T>, properties: string[]) => {
    const data: T & { [key: string]: any } = Object.assign({}, object.data);
    for (let property of properties) {
        data[property] = new Date(data[property]);
    }
    object.data = data;
    return object;
};

export const getRandomRoom = (): Promise<ApiResponse<Room>> => {
    return fetch(API_ENDPOINT + "/rooms", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*"
        },
    }).then(async (res) => {
        const json = await res.json() as ApiResponse<Room>;
        return parseDates<Room>(json, ["createdAt", "expiresOn"]);
    });
}

export const getRoom = (roomName: string): Promise<ApiResponse<Room>> => {
    return fetch(API_ENDPOINT + "/rooms/" + roomName, {
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain, */*"
        },
    }).then(async (res) => {
        const json = await res.json() as ApiResponse<Room>;
        return parseDates<Room>(json, ["createdAt", "expiresOn"]);
    });
}

export const listenRoom = (roomName: string): Observable<File[]> => {
    socket.emit("joinRoom", roomName);

    return Observable.create((observer: any) => {
        socket.on("newFile", (res: any) => {
            observer.next(res)
        });
    });
}