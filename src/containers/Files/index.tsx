import * as React from "react";
import { inject, observer } from "mobx-react";
import { RoomStore } from "../../stores/";

/**
 * Components
 */

import FileBox from "../../components/FileBox/";
import File from "../../components/File/";
import SendFile from "../../components/SendFile/";

/** 
 * Style
 */

const s = require("./style.scss");

interface IFilesProps {
    roomStore?: RoomStore;
    onFileInputChange: (files: FileList) => void;
}

@inject("roomStore")
@observer
export default class Files extends React.Component<IFilesProps, {}> {
    render() {
        const fileBoxes = this.props.roomStore!.room!.files.map((file, i) => [
            <FileBox key={i}>
                <File file={file}/>
            </FileBox>
        ]);

        return (
            <div className={s.files}>   
                <FileBox>
                    <SendFile
                        color="blue"
                        size="medium"
                        onFileInputChange={this.props.onFileInputChange}
                    />
                </FileBox>            
                {fileBoxes}
            </div>
        );
    }
};