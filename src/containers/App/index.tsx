import * as React from "react";
import { inject, observer } from "mobx-react";
import { RoomStore } from "../../stores";
import { RouterStore } from "mobx-react-router";
import { match } from "react-router-dom";

/**
 * Component
 */

import Header from "../Header/";
import Main from "../Main/";

/** 
 * Style
 */

const s = require("./style.scss");

/**
 * Component
 */

interface IAppProps {
    roomStore?: RoomStore;
    routerStore?: RouterStore;
    match?: match<{
        roomId: string
    }>;
}

interface IAppState {};

@inject("routerStore", "roomStore")
@observer
export default class App extends React.Component<IAppProps, IAppState> {
    componentDidMount() {
        const { location, push, goBack } = this.props.routerStore!;
        const roomId = this.props.match!.params.roomId;

        if (!roomId) {
            this.props.roomStore!.getNewRoom();
        } else {
            this.props.roomStore!.getRoom(roomId);
        }
    }

    render() {
        return (
            <div className={s.container}>
                <Header/>
                <Main/>
            </div>
        );
    }
};