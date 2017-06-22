import * as React from "react";

/**
 * Style
 */

const s = require("./style.scss");

interface ILogoProps {};

interface ILogoState {};

class Logo extends React.Component<ILogoProps, ILogoState> {
    public render(): JSX.Element {
        return (
            <div className={s.logo}></div>
        );
    }
}

export default Logo;
