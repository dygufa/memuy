import * as React from "react";

const s = require("./style.scss");

interface ILoadingProps {};

interface ILoadingState {};

class Loading extends React.Component<ILoadingProps, ILoadingState> {
    public render(): JSX.Element {
        return (
            <div className={s.loading}></div>
        );
    }
}

export default Loading;
