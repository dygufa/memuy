import * as React from "react";
import { FileModel } from "../../models/"; 
import { observer } from "mobx-react";
const fileSize = require("file-size");

const s = require("./style.scss");

interface IFileProps {
    file: FileModel;
};

// { JSON.stringify(this.props.file) }


interface IFileState {};

@observer
class File extends React.Component<IFileProps, IFileState> {
    public render(): JSX.Element {
        const file = this.props.file;
        const uploadingClass = file.status === "uploading" ? "uploading" : "";

        return (
            <div>
                <div className={`file ${s[uploadingClass]}`}>
                    <div className="avatar">
                        {file.location ? (
                            <div className="avatar-img" style={{backgroundImage: `url(${file.location}")`}}></div>
                        ) : (
                            <div className="avatar-icon"><span className="icon-file-o"></span></div>
                        )}
                    </div>
                    <div className="info">
                        <a href={file.location} target="_blank" className="file-link">{file.name}</a>
                        <span>{fileSize(file.size).human()}</span>
                    </div>
                    <div className="upload-status">{file.status} <span className="progress">{file.uploadProgress}</span></div>
                </div>
            </div>
        );
    }
}

export default File;
