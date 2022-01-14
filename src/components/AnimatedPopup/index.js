import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Notification,
    NotificationGroup,
} from "@progress/kendo-react-notification";
import { Slide } from "@progress/kendo-react-animation";

const AnimatedPopup = ({success, setSuccess, error, setError}) => {
    // const [state, setState] = React.useState({
    //     success: false,
    //     error: true,
    //     warning: false,
    //     info: false,
    //     none: false,
    // });
    //
    // const onToggle = (flag) => setState({ ...state, [flag]: !state[flag] });

    //const { success, error, warning, info, none } = state;
    return (
        <React.Fragment>
            {/*<button className="k-button" onClick={() => onToggle("success")}>*/}
            {/*    {(success ? "hide " : "show ") + "Success"}*/}
            {/*</button>*/}
            {/*&nbsp;*/}
            {/*<button className="k-button" onClick={() => onToggle("error")}>*/}
            {/*    {(error ? "hide " : "show ") + "Error"}*/}
            {/*</button>*/}
            {/*&nbsp;*/}
            {/*<button className="k-button" onClick={() => onToggle("warning")}>*/}
            {/*    {(warning ? "hide " : "show ") + "Warning"}*/}
            {/*</button>*/}
            {/*&nbsp;*/}
            {/*<button className="k-button" onClick={() => onToggle("info")}>*/}
            {/*    {(info ? "hide " : "show ") + "Info"}*/}
            {/*</button>*/}
            {/*<button className="k-button" onClick={() => onToggle("none")}>*/}
            {/*    {(none ? "hide " : "show ") + "Unstyled"}*/}
            {/*</button>*/}
            <NotificationGroup
                style={{
                    right: 0,
                    bottom: 0,
                    alignItems: "flex-start",
                    flexWrap: "wrap-reverse",
                }}
            >
                {/*{JSON.stringify(success)}*/}
                <Slide direction={success ? "up" : "down"}>
                    {success && (
                        <Notification
                            type={{
                                style: "success",
                                icon: true
                            }}
                            closable={true}
                            onClose={() => setSuccess(false)}
                        >
                            <span>Transaction has succeeded!</span>
                        </Notification>
                    )}
                </Slide>
                <Slide direction={error ? "up" : "down"}>
                    {error && (
                        <Notification
                            type={{
                                style: "error",
                                icon: true,
                            }}
                            closable={true}
                            onClose={() => setError(false)}
                        >
                            <span style={{fontSize: 14}}>Transaction has errored, please retry.</span>
                        </Notification>
                    )}
                </Slide>
            </NotificationGroup>
        </React.Fragment>
    );
};

export default AnimatedPopup;