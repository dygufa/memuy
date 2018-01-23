import * as React from "react";
import { inject, observer } from "mobx-react";
import { RoomStore, UIStore } from "../../stores";
import { RouterStore } from "mobx-react-router";
import { match } from "react-router-dom";

/**
 * Component
 */

import Header from "../Header/";
import Main from "../Main/";
import { DragEvent } from "react";
const FileDrop = require("react-file-drop");

/** 
 * Style
 */

const s = require("./style.scss");

/**
 * Component
 */

interface IAppProps {
    roomStore?: RoomStore;
    uiStore?: UIStore;
    routerStore?: RouterStore;
    match?: match<{
        roomId: string
    }>;
}

interface IAppState {};

@inject("routerStore", "roomStore", "uiStore")
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

    onFrameDragEnter = (e: React.DragEvent<any>) => {
        this.props.uiStore!.draggingFile = true;
    }

    onFrameDragLeave = (e: React.DragEvent<any>) => {
        this.props.uiStore!.draggingFile = false;
    }

    onFrameDrop = (e: React.DragEvent<any>) => {
        this.props.uiStore!.draggingFile = false;
    }

    onDrop = (files: File[], e: React.DragEvent<any>) => {
        const file = files[0];
        this.props.roomStore!.room!.uploadFile(file);
    }

    render() {
        return (
            <div className={s.container}>
                <Header/>
                <Main/>
                <FileDrop 
                    frame={document} 
                    onFrameDragEnter={this.onFrameDragEnter}
                    onFrameDragLeave={this.onFrameDragLeave}
                    onFrameDrop={this.onFrameDrop}
                    onDrop={this.onDrop}
                />
                {this.props.uiStore!.draggingFile ? (
                    <div className={s.draggingFile}></div>
                ) : null}
            </div>
        );
    }
};