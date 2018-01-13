import * as React from "react";

const s = require("./style.scss");

interface ISendFileProps {
    color: "white" | "blue";
};

interface ISendFileState {};

class SendFile extends React.Component<ISendFileProps, ISendFileState> {
    public render(): JSX.Element {
        return (
            <div className={`${s.cloud} ${s[this.props.color]}`}>
                <span>Arraste ou clique para fazer upload</span>
            </div>
        );
    }
}

export default SendFile;
