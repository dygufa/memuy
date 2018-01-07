import * as React from "react";
import { Room } from "../../vendor/api";
import { inject, observer } from "mobx-react";

/**
 * Components
 */

import NewRoomButton from "../NewRoomButton/";

/**
 * Style
 */

const s = require("./style.scss");

/**
 * StatusBar
 */

interface IStatusBarProps {
    room: Room;
    onNewRoom: () => void;
};

interface IStatusBarState {};

@observer
class StatusBar extends React.Component<IStatusBarProps, IStatusBarState> {
    public render(): JSX.Element {
        const room = this.props.room;
        console.log(JSON.stringify(room));
        console.log(room);

        return (
            <div className={s.statusBar}>
                <div className={s.infoBar}>
                    Store limit: <span id="spaceStats"></span>
                    <br/>
                    Remaining room time: <span id="timeLeft"></span>
                </div>

                <div className={s.roomUrl}>
                    <span>memuy.com/</span>{room ? room.name : "aa"}                    
                </div>

                <div className={s.buttonWrapper}>
                    <NewRoomButton onClick={this.props.onNewRoom}/>
                </div>
            </div>
        );
    }
}

export default StatusBar;
