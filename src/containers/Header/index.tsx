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
    private onNewRoom() {
        this.props.roomStore!.getNewRoom();
    }

    public render(): JSX.Element {
        return (
            <header className={s.header}>
                <Logo/>
                <div className={s.helperBars}>                    
                    <StatusBar
                        room={this.props.roomStore!.room!}
                        onNewRoom={() => this.onNewRoom()}
                    />                   
                </div>
            </header>
        );
    }
}

export default Header;
