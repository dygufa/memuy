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
                <div className={`${s.file} ${s[uploadingClass]}`}>
                    <div className={s.avatar}>
                        {file.fileType === "image" ? (
                            <div className={s.avatarImg} style={{backgroundImage: `url(${file.location})`}}></div>
                        ) : (
                            <div className={s.avatarIcon}><span className="icon-file-o"></span></div>
                        )}
                    </div>
                    <div className="info">
                        <a href={file.location} target="_blank">{file.name}</a>
                        <span>{fileSize(file.size).human()}</span>
                    </div>
                    <div className={s.uploadStatus}>{file.status} <span>{file.uploadProgress}</span></div>
                </div>
            </div>
        );
    }
}

export default File;
