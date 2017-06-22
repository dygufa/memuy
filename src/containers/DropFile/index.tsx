import * as React from "react";
import { inject, observer } from "mobx-react";

/**
 * Components
 */

import Button from "../../components/Button/";

/** 
 * Style
 */

const s = require("./style.scss");

@inject("roomStore")
@observer
export default class DropFile extends React.Component<any, {}> {
    render() {
        return (
            <div className={s.timerView}>
                <div>
                    Timer: {this.props.roomStore.timer}
                </div>
                <Button onClick={this.onReset}>
                    Resetar timer
                </Button>
            </div>
        );
     }

     onReset = () => {
         this.props.roomStore.resetTimer();
     }
};