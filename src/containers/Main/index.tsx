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
        if (!this.props.roomStore!.room) {
            return <Loading />;
        }

        if (this.props.roomStore!.room!.files.length === 0) {
            return (
                <SendFile
                    color="white"
                    onFileInputChange={this.onFileInputChange}
                />
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