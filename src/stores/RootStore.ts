import { RoomStore, RouterStore, UIStore } from "./";

export class RootStore {
    roomStore: RoomStore;
    routerStore: RouterStore;
    uiStore: UIStore;

    constructor() {
        this.roomStore = new RoomStore(this);
        this.routerStore = new RouterStore();
        this.uiStore = new UIStore(this);

        return {
            roomStore: this.roomStore,
            routerStore: this.routerStore,
            uiStore: this.uiStore
        }
    }
}