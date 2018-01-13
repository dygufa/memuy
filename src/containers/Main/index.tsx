import * as React from "react";
import { inject, observer } from "mobx-react";

/**
 * Components
 */

import Loading from "../../components/Loading/";
import SendFile from "../../components/SendFile/";
import Files from "../Files/";

/** 
 * Style
 */

const s = require("./style.scss");

@inject("roomStore")
@observer
export default class Main extends React.Component<any, {}> {
    render() {
        return (
            <div>
                <Loading/>
                <SendFile color="white"/>
                <Files/>
                
            </div>
        );
     }
};