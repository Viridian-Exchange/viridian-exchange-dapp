import React from "react";
import cn from "classnames";
import styles from "./SignupPrompt.module.sass";
import {Link} from "react-router-dom";
import {HandleAddUserSimple} from "../../apis/UserAPI"

//TODO: PASS IN USERINFO AND UPDATE THIS WHEN PUSHED TO DYNAMO
// SET FETCHED PROP SO WHEN THAT CHANGES, FETCHES THE USER AND SETS IT TO USERINFO
const SignupPrompt = ({ className, account, setPromptSetup, setUserInfo}) => {
    // async function HandleAddressLink() {
    //      await HandleAddUserSimple(setUserInfo, account);
    // }

  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn("h4", styles.title)}>Welcome to the Viridian Exchange TestNet!</div>
      <div className={styles.text}>
        Experience the future of physical collectibles trade, powered by Ethereum and ImmutableX.
          The NFTs and Ether utilized in this beta are not real assets and hence don't hold any value -- they are used for the sole purpose of testing the functionality on our platform.
      </div>
      <div className={styles.btns}>
        {/*<Link className={cn("button", styles.button)} onClick={async () => {*/}
        {/*    await HandleAddUserSimple(setUserInfo, account, setPromptSetup).then(() => {*/}
        {/*        setPromptSetup(false);});*/}
        {/*}} to="/profile">Go to Profile</Link>*/}
        <button className={cn("button-stroke", styles.button)} onClick={async () => {
            await HandleAddUserSimple(setUserInfo, account, setPromptSetup).then(() => {
            setPromptSetup(false);});
        }}>I Understand, Continue</button>
      </div>
    </div>
  );
};

export default SignupPrompt;
