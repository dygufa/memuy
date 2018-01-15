import * as React from "react";

const s = require("./style.scss");

interface IFileBoxProps {};

interface IFileBoxState {};

class FileBox extends React.Component<IFileBoxProps, IFileBoxState> {
    public render(): JSX.Element {
        return (
            <div className={s.filebox}>
                {this.props.children}
            </div>
        );
    }
}

export default FileBox;
