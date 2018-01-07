import { RoomStore, RouterStore } from "./";

export class RootStore {
    roomStore: RoomStore;
    routerStore: RouterStore;

    constructor() {
        this.roomStore = new RoomStore(this);
        this.routerStore = new RouterStore();

        return {
            roomStore: this.roomStore,
            routerStore: this.routerStore
        }
    }
}