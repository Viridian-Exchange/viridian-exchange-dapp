import React from "react";
import cn from "classnames";
import styles from "./SignupPrompt.module.sass";
import {Link} from "react-router-dom";
import {HandleAddUserSimple} from "../../apis/UserAPI"

//TODO: PASS IN USERINFO AND UPDATE THIS WHEN PUSHED TO DYNAMO
// SET FETCHED PROP SO WHEN THAT CHANGES, FETCHES THE USER AND SETS IT TO USERINFO
const InstallMetamaskPrompt = ({ className, network, history, setVisibleModalWrongNetwork}) => {
    // async function HandleAddressLink() {
    //      await HandleAddUserSimple(setUserInfo, account);
    // }

  return (
    <div className={cn(className, styles.transfer)} style={{textAlign: 'center'}}>
      <div className={cn("h4", styles.title)}>Wrong Network Selected</div>
        Please switch from network {network} to ropsten
        <div>
            <video autoPlay loop muted style={{maxWidth: '40ex', marginBottom: '3ex', marginTop: '2ex'}}>
                <source src='https://viridian-images.s3.us-east-2.amazonaws.com/RopstenSwitchMiniTutorial.mov' type="video/mp4"/>
            </video>
        </div>
        <div>
      <a className={styles.text} style={{marginBottom: '5ex'}} href='https://metamask.zendesk.com/hc/en-us/articles/360056196151-Using-custom-networks-with-MetaMask'>
        What is a Network?
      </a>
            <button className={cn("button-stroke", styles.button)} style={{marginTop: '2ex'}} onClick={() => {
                setVisibleModalWrongNetwork(false);
                history.push("/");
            }}>I've switched networks</button>
        </div>
    </div>
  );
};

export default InstallMetamaskPrompt;
