import * as React from "react";
import * as ReactTooltip from "react-tooltip";

interface ITooltipProps {
    text: string;
};

interface ITooltipState { };

class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
    public render(): JSX.Element {
        return (
            <>  
                <ReactTooltip />
                <div data-tip={this.props.text}>
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default Tooltip;
