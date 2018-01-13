import * as React from "react";
import { inject, observer } from "mobx-react";

/**
 * Components
 */

import FileBox from "../../components/FileBox/";

/** 
 * Style
 */

const s = require("./style.scss");

@inject("roomStore")
@observer
export default class Files extends React.Component<any, {}> {
    render() {
        return (
            <div className={s.files}>               
                <FileBox/>
                <FileBox />
                <FileBox />
            </div>
        );
    }
};