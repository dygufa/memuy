const io = require("socket.io-client");

const API_ENDPOINT = process.env.NODE_ENV === "development" ? "http://localhost:8080/v1" : "https://api.memuy.com/v1";
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

export const getRandomRoom = (): Promise<ApiResponse<Room>> => {
    return fetch(API_ENDPOINT + "/rooms", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*"
        },
    }).then(res => res.json());
}