import * as React from "react";
import { inject, observer } from "mobx-react";
import { RoomStore } from "../../stores";

/**
 * Components
 */

import Logo from "../../components/Logo/";
import StatusBar from "../../components/StatusBar/";


/** 
 * Style
 */

const s = require("./style.scss");

/**
 * Header
 */

interface IHeaderProps {
    roomStore?: RoomStore;
};

interface IHeaderState {};

@inject("roomStore")
@observer
class Header extends React.Component<IHeaderProps, IHeaderState> {
    public render(): JSX.Element {
        return (
            <header className={s.header}>
                <Logo/>
                <div className={s.helperBars}>
                    <StatusBar room={this.props.roomStore.room}/>
                </div>
            </header>
        );
    }
}

export default Header;
