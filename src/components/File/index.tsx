import * as React from "react";
import { FileModel } from "../../models/"; 
import { observer } from "mobx-react";
const fileSize = require("file-size");
import { capitalizeFirstLetter } from "../../helpers/utils";

const s = require("./style.scss");

interface IFileProps {
    file: FileModel;
};


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
                            <div className={s.avatarIcon}>
                                <i className="fa fa-file-o" aria-hidden="true"></i>
                            </div>
                        )}
                    </div>
                    <div className={s.info}>
                        <a href={file.location} target="_blank">{file.name}</a>
                        <span>{fileSize(file.size).human()}</span>
                    </div>

                    {file.status === "uploading" || file.status === "processing" ? (
                        <div className={s.uploadStatus}>
                            {capitalizeFirstLetter(file.status)}... <span>{file.uploadProgress}</span>
                        </div>
                    ) : null}                    
                </div>
            </div>
        );
    }
}

export default File;
