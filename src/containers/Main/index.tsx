import * as React from "react";
import { inject, observer } from "mobx-react";

/**
 * Components
 */

import Button from "../../components/Button/";
import Loading from "../../components/Loading/";
import SendFile from "../../components/SendFile/";

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

                <div id="file-container">
                    <div id="files" className="dropzone-previews">
                        <div id="file-send-file" className="file">
                            <div className="cloud send-file"></div>
                            <div className="clooud-label send-file">Arraste ou clique aqui para fazer upload</div>
                        </div>

                        
                    </div>
                </div>
            </div>
        );
     }

     onReset = () => {
         this.props.roomStore.resetTimer();
     }
};