import * as React from "react";
import { inject, observer } from "mobx-react";
import { RoomStore } from "../../stores/";

/**
 * Components
 */

import Loading from "../../components/Loading/";
import SendFile from "../../components/SendFile/";
import Files from "../Files/";

/** 
 * Style
 */

const s = require("./style.scss");

interface IMainProps {
    roomStore?: RoomStore;
}

@inject("roomStore")
@observer
export default class Main extends React.Component<IMainProps, {}> {
    private onFileInputChange = (files: FileList) => {
        const file = files[0];
        this.props.roomStore!.room!.uploadFile(file);
    }

    render() {
        if (this.props.roomStore!.error === "roomNotFound") {
            return <div className={s.error}>Sorry, but I coudln't find this room :(</div>
        }

        if (!this.props.roomStore!.room) {
            return <Loading />;
        }

        if (this.props.roomStore!.room!.files.length === 0) {
            return (
                <div style={{marginTop: "70px"}}>
                    <SendFile
                        color="white"
                        size="big"
                        onFileInputChange={this.onFileInputChange}
                    />
                </div>
            );
        }

        return (
            <div>    
                <Files
                    onFileInputChange={this.onFileInputChange}
                />
            </div>
        );
     }
};