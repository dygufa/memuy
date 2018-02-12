import * as io from "socket.io-client";
import { Observable } from 'rxjs/Observable';
import { futch } from "../helpers/utils";

const BASE_URL = process.env.NODE_ENV !== "development" ? "http://localhost:9090" : "https://api.memuy.com";
const PATH = "/v2";
const API_ENDPOINT = BASE_URL + PATH;

const socket = io(BASE_URL, {
    path: PATH + "/socketio"
});

export interface IApiResponse<Payload> {
    status: string
    data?: Payload
    error?: {
        name: string
        message: string
    }
};

export interface IRoom {
    name: string
    status: string
    usedSpace: number
    maxSpace: number
    files: IFile[]
    createdAt: Date
    expiresOn: Date
}

export interface IFile {
    name: string
    location: string
    size: number
    mimetype: string
    hash: string
}

export interface NewFileSocket {
    roomName: string,
    file: IFile
}

const getToken = () => {
    return localStorage.getItem("jwt");
};

const parseDates = <T>(object: IApiResponse<T>, properties: string[]) => {
    const data: T & { [key: string]: any } = Object.assign({}, object.data);
    for (let property of properties) {
        data[property] = new Date(data[property]);
    }
    object.data = data;
    return object;
};

export const getRandomRoom = (): Promise<IApiResponse<IRoom>> => {
    return fetch(API_ENDPOINT + "/rooms", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*"
        },
    }).then(async (res) => {
        const json = await res.json() as IApiResponse<IRoom>;
        return parseDates<IRoom>(json, ["createdAt", "expiresOn"]);
    });
}

export const uploadFile = (roomName: string, file: File, onProgress: (progress: ProgressEvent) => void): Promise<IApiResponse<IFile>> => {
    const formData = new FormData();
    formData.append("roomName", roomName);
    formData.append("file", file);

    return futch(API_ENDPOINT + "/files", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*"
        },
        body: formData
    }, onProgress).then(res => {
        return JSON.parse(res as string);
    });
}

export const getRoom = (roomName: string): Promise<IApiResponse<IRoom>> => {
    return fetch(API_ENDPOINT + "/rooms/" + roomName, {
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain, */*"
        },
    }).then(async (res) => {
        const json = await res.json() as IApiResponse<IRoom>;
        return parseDates<IRoom>(json, ["createdAt", "expiresOn"]);
    });
}

export const listenRoom = (roomName: string): Observable<NewFileSocket> => {
    socket.on("connect", () => {
        socket.emit("joinRoom", roomName);
    });

    return Observable.create((observer: any) => {
        socket.on("newFile", (res: NewFileSocket) => {
            observer.next(res);
        });
    });
}