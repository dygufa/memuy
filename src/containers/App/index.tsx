import * as React from "react";
import { inject, observer } from "mobx-react";
import { RoomStore } from "../../stores";
import { RouterStore } from "mobx-react-router";

/**
 * Component
 */

import Header from "../Header/";

/** 
 * Style
 */

const s = require("./style.scss");

/**
 * Component
 */

interface IAppProps {
    roomStore: RoomStore;
    routerStore: RouterStore;
    params: any;
}

interface IAppState {};

@inject("routerStore", "roomStore")
@observer
export default class App extends React.Component<IAppProps, IAppState> {
    componentDidMount() {
        const { location, push, goBack } = this.props.routerStore;
        const roomId = this.props.params.roomId;

        if (!roomId) {
            this.props.roomStore.getNewRoom();
        } else {
            this.props.roomStore.getRoom(roomId);
        }
    }

    render() {
        return (
            <div className={s.container}>
                <Header/>
                {this.props.children}
            </div>
        );
    }
};