import * as io from "socket.io-client";
import { Observable } from 'rxjs/Observable';
import { futch } from "../helpers/utils";

const API_ENDPOINT = process.env.NODE_ENV === "development" ? "http://localhost:9090/v2" : "https://api.memuy.com/v2";
const socket = io(API_ENDPOINT);

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
    const fileAsBlob = new Blob([file]);
    const formData = new FormData();
    formData.append("roomName", roomName);
    formData.append("file", fileAsBlob);

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

export const listenRoom = (roomName: string): Observable<IFile> => {
    socket.emit("joinRoom", roomName);

    return Observable.create((observer: any) => {
        socket.on("newFile", (res: any) => {
            observer.next(res)
        });
    });
}