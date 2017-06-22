import * as React from "react";

/**
 * Components
 */

import Button from "../Button/";

/**
 * Style
 */

const s = require("./style.scss");

/**
 * Component
 */

interface INewRoomButtonProps {
    onClick?: () => any;
};

interface INewRoomButtonState {};

class NewRoomButton extends React.Component<INewRoomButtonProps, INewRoomButtonState> {
    public render(): JSX.Element {
        return (
            <Button color="secondary" onClick={this.props.onClick}>
                New Room
            </Button>
        );
    }
}

export default NewRoomButton;
