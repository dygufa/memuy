import * as React from "react";

const s = require("./style.scss");

interface IFileBoxProps {};

interface IFileBoxState {};

class FileBox extends React.Component<IFileBoxProps, IFileBoxState> {
    public render(): JSX.Element {
        return (
            <div className={s.filebox}>
            a
            </div>
        );
    }
}

export default FileBox;
