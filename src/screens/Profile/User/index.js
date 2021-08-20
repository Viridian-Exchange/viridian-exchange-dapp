import React, {useEffect, useState} from "react";
import cn from "classnames";
import styles from "./User.module.sass";
import Icon from "../../../components/Icon";
import Report from "../../../components/Report";
import Modal from "../../../components/Modal";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import config from "../../../local-dev-config";
import vNFTJSON from "../../../abis/ViridianNFT.json";
import Web3 from "web3";
// import { isStepDivisible } from "react-range/lib/utils";
import veJSON from '../../../abis/ViridianExchange.json';

const shareUrlFacebook = "https://ui8.net";
const shareUrlTwitter = "https://ui8.net";

let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

//TODO: check in useeffect if it is the current user (is accounts[0] the same as the account passed in as props?)
// Get current user OBJ from using abi.getUserFromAddress, and set this to userInfo const
//

const User = ({ className, item, curUser, account, userInfo }) => {
  const [visible, setVisible] = useState(false);
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);
  // const [userInfo, setUserInfo] = useState({});
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const shortenAccount = () => {
    if (account) {
      return account.toString().substring(0, 6) + "..." + account.toString().substring(38);
    }
  }



  //TODO: setUserInfo here with getUserInfo()
  // then also check if current address is the same as the address pulled.


  // TODO: prompt for user info setting, or have them edit it manually (set default values)
  //  once wallet connected, check if fields are empty, if certain empty, prompt
  //  would you like to set up your profile now? (links to "edit profile" screen) or "skip for now"




  // useEffect(async () => {
  //   let current_address = web3.eth.accounts[0];
  //   if (account == current_address) {
  //     setUserInfo(getUserInfo());
  //   }
  // }, );
  return (
      <>
        <div className={cn(styles.user, className)}>
          {/*{JSON.stringify(userInfo)}*/}
          <div className={styles.avatar}>
            <img src={userInfo.profilePhotoURL} alt="Avatar"/>
          </div>
          <div className={styles.name}>{userInfo.displayName}</div>
          <CopyToClipboard text={account}
                           // onCopy={() => this.setState({copied: true})}
              >
          <div className={styles.code}>
            <div className={styles.number}>{shortenAccount()}</div>
            <button className={styles.copy}>
              <Icon name="copy" size="16"/>
            </button>
          </div>
          </CopyToClipboard>
          <div className={styles.info}>
            {userInfo.bio}
          </div>
          <a
              className={styles.site}
              href="https://ui8.net"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Icon name="globe" size="16"/>
            <span>{userInfo.website}</span>
          </a>
          <div className={styles.control}>
            <div className={styles.btns}>
              <button
                  className={cn(
                      "button button-small",
                      {[styles.active]: visible},
                      styles.button
                  )}
                  onClick={() => setVisible(!visible)}
              >
                <span>Follow</span>
                <span>Unfollow</span>
              </button>
              <button
                  className={cn(
                      "button-circle-stroke button-small",
                      {[styles.active]: visibleShare},
                      styles.button
                  )}
                  onClick={() => setVisibleShare(!visibleShare)}
              >
                <Icon name="share" size="20"/>
              </button>
              <button
                  className={cn("button-circle-stroke button-small", styles.button)}
                  onClick={() => setVisibleModalReport(true)}
              >
                <Icon name="report" size="20"/>
              </button>
            </div>
            <div className={cn(styles.box, {[styles.active]: visibleShare})}>
              <div className={styles.stage}>Share link to this page</div>
              <div className={styles.share}>
                <TwitterShareButton
                    className={styles.direction}
                    url={shareUrlTwitter}
                >
              <span>
                <Icon name="twitter" size="20"/>
              </span>
                </TwitterShareButton>
                <FacebookShareButton
                    className={styles.direction}
                    url={shareUrlFacebook}
                >
              <span>
                <Icon name="facebook" size="20"/>
              </span>
                </FacebookShareButton>
              </div>
            </div>
          </div>
          <div className={styles.socials}>
            {item.map((x, index) => (
                <a
                    className={styles.social}
                    href={x.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                >
                  <Icon name={x.title} size="20"/>
                </a>
            ))}
          </div>
          <div className={styles.note}>Member since Mar 15, 2021</div>
        </div>
        <Modal
            visible={visibleModalReport}
            onClose={() => setVisibleModalReport(false)}
        >
          <Report/>
        </Modal>
      </>
  );
};

export default User;
