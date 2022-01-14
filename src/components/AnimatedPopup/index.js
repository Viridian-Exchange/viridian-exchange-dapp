import React, { useState, useEffect } from "react";
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

    useEffect(async () => {
        if (success) {
            let delayInMilliseconds = 5000; //1 second

            setTimeout(function() {
                setSuccess(false);
            }, delayInMilliseconds);
        }

        if (error) {
            let delayInMilliseconds = 5000; //1 second

            setTimeout(function() {
                setError(false);
            }, delayInMilliseconds);
        }
    }, [success, error]);

    //const { success, error, warning, info, none } = state;
    return (
        <React.Fragment>
            {/*<button className="k-button" onClick={() => setSuccess(true)}>*/}
            {/*    {(success ? "hide " : "show ") + "Success"}*/}
            {/*</button>*/}
            {/*&nbsp;*/}
            {/*<button className="k-button" onClick={() => setError(true)}>*/}
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
                    right: 10,
                    top: 100,
                    alignItems: "flex-start",
                    flexWrap: "wrap-reverse",
                }}
            >
                {/*{JSON.stringify(success)}*/}
                <Slide direction={success ? "down" : "up"}>
                    {success && (
                        <Notification
                            type={{
                                style: "success",
                                icon: true
                            }}
                            closable={true}
                            onClose={() => setSuccess(false)}
                        >
                            <span style={{fontSize: 18}}>Transaction has succeeded!</span>
                        </Notification>
                    )}
                </Slide>
                <Slide direction={error ? "down" : "up"}>
                    {error && (
                        <Notification
                            type={{
                                style: "error",
                                icon: true,
                            }}
                            closable={true}
                            onClose={() => setError(false)}
                        >
                            <span style={{fontSize: 18}}>Transaction has failed, please retry.</span>
                        </Notification>
                    )}
                </Slide>
            </NotificationGroup>
        </React.Fragment>
    );
};

export default AnimatedPopup;