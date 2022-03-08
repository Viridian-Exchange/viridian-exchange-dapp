import React from "react";
import cn from "classnames";
import styles from "./SignupPrompt.module.sass";
import {Link} from "react-router-dom";
import {HandleAddUserSimple} from "../../apis/UserAPI"

//TODO: PASS IN USERINFO AND UPDATE THIS WHEN PUSHED TO DYNAMO
// SET FETCHED PROP SO WHEN THAT CHANGES, FETCHES THE USER AND SETS IT TO USERINFO
const InstallMetamaskPrompt = ({ className, account, setPromptSetup, setUserInfo}) => {
    // async function HandleAddressLink() {
    //      await HandleAddUserSimple(setUserInfo, account);
    // }

  return (
    <div className={cn(className, styles.transfer)} style={{textAlign: 'center'}}>
      <div className={cn("h4", styles.title)}>Metamask Not Installed</div>
        <div>
            <img src='/images/content/metamask-fox.svg' style={{maxWidth: '50ex'}}/>
        </div>
        <div>
      <a className={styles.text} target="_blank" rel="noopener noreferrer" href='https://metamask.io'>
        What is a Metamask Wallet?
      </a>
        </div>
      <div className={styles.btns}>
        {/*<Link className={cn("button", styles.button)} onClick={async () => {*/}
        {/*    await HandleAddUserSimple(setUserInfo, account, setPromptSetup).then(() => {*/}
        {/*        setPromptSetup(false);});*/}
        {/*}} to="/profile">Go to Profile</Link>*/}
        <a className={cn("button-stroke", styles.button)} target="_blank" rel="noopener noreferrer" href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>Install Chrome Extension</a>
      </div>
    </div>
  );
};

export default InstallMetamaskPrompt;
