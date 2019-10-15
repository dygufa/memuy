import * as React from "react";
import { RoomModel } from "../../models";
import { inject, observer } from "mobx-react";
const fileSize = require("file-size");
const Countdown = require("react-countdown-now").default;
import prettyMs from "pretty-ms";
import { selectText } from "../../helpers/utils";
import copy from 'copy-to-clipboard';

/**
 * Components
 */

import NewRoomButton from "../NewRoomButton/";
import Tooltip from "../Tooltip";

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

interface IStatusBarState { };

@observer
class StatusBar extends React.Component<IStatusBarProps, IStatusBarState> {

    private onCopyRoomUrl = (e: React.MouseEvent<HTMLSpanElement>) => {
        selectText(e.currentTarget);
        copy(this.props.room.roomUrl);
    }

    public render(): JSX.Element {
        const room = this.props.room;

        return (
            <div className={s.statusBar}>
                {this.props.room ? (
                    <>
                        <div className={s.infoBar}>
                            Store limit: {fileSize(room.usedSpace).human()}/{fileSize(room.maxSpace).human()}
                            <br />
                            Remaining room time:
                            <Countdown
                                date={room.expiresOn}
                                renderer={(total: any) => {
                                    return " " + prettyMs(total.total);
                                }}
                            />
                        </div>

                        <div className={s.roomUrl}>
                            <Tooltip text="Click to copy to clipboard">
                                <span onClick={this.onCopyRoomUrl}>{room.roomUrl}</span>
                            </Tooltip>
                        </div>
                    </>
                ) : null}

                <div className={s.buttonWrapper}>
                    <NewRoomButton onClick={this.props.onNewRoom} />
                </div>
            </div>
        );
    }
}

export default StatusBar;
