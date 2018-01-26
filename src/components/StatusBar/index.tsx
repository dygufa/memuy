import * as React from "react";
import { RoomModel } from "../../models";
import { inject, observer } from "mobx-react";
const fileSize = require("file-size");
const Countdown = require("react-countdown-now").default;
import * as prettyMs from "pretty-ms";

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
    room: RoomModel;
    onNewRoom: () => void;
};

interface IStatusBarState {};

@observer
class StatusBar extends React.Component<IStatusBarProps, IStatusBarState> {
    public render(): JSX.Element {
        const room = this.props.room;

        return (
            <div className={s.statusBar}>
                {this.props.room ? (
                    <>
                        <div className={s.infoBar}>
                            Store limit: {fileSize(room.usedSpace).human()}/{fileSize(room.maxSpace).human()}
                            <br/>
                            Remaining room time: 
                            <Countdown 
                                date={room.expiresOn}
                                renderer={(total: any) => {
                                    return " " + prettyMs(total.total);
                                }}
                            />
                        </div>

                        <div className={s.roomUrl}>
                            <span>memuy.com/</span>{room.name}                    
                        </div>
                    </>
                ) : null}

                <div className={s.buttonWrapper}>
                    <NewRoomButton onClick={this.props.onNewRoom}/>
                </div>
            </div>
        );
    }
}

export default StatusBar;
