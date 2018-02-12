import * as React from "react";
import { inject, observer } from "mobx-react";
import { RoomStore } from "../../stores";
import * as copy from 'copy-to-clipboard';

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

    private onCopyRoomUrl(roomUrl: string) {
        copy(roomUrl);
    }

    public render(): JSX.Element {
        return (
            <header className={s.header}>
                <Logo/>
                <div className={s.helperBars}>                    
                    <StatusBar
                        room={this.props.roomStore!.room!}
                        roomUrl={this.props.roomStore!.roomUrl}
                        onNewRoom={this.onNewRoom}
                        onCopyRoomUrl={this.onCopyRoomUrl}
                    />                   
                </div>
            </header>
        );
    }
}

export default Header;
