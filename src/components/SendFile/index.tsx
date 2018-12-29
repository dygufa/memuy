import * as React from "react";
import { ChangeEvent, FormEvent } from "react";

const s = require("./style.scss");

interface ISendFileProps {
    color: "white" | "blue";
    onFileInputChange: (files: FileList) => void;
    size: "medium" | "big"
};

interface ISendFileState {};

class SendFile extends React.Component<ISendFileProps, ISendFileState> {
    private fileInputRef!: HTMLInputElement;

    private onClick = () => {
        this.fileInputRef.click();
    }

    public render(): JSX.Element {
        return (
            <div onClick={this.onClick} className={`${s.cloudContainer} ${s[this.props.color]}`}>
                <div className={`${s.cloud} ${s[this.props.size]}`}></div>
                <span>Drag or click to upload a file</span>
                <input 
                    className={s.fileInput} 
                    type="file" 
                    onChange={(e) => this.props.onFileInputChange(e.target.files!)}
                    ref={(ref) => this.fileInputRef = ref!}
                />
            </div>
        );
    }
}

export default SendFile;
