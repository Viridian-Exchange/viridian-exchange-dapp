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
import {HandleAddFollowing, HandleUpdateUser, HandleAddFollower} from "../../../apis/UserAPI";


import ReactTooltip from "react-tooltip";



let web3 = new Web3( new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/c2ccaf282d324e8983bcb0c6ffaa05a6") || "HTTP://127.0.0.1:7545");

//TODO: check in useeffect if it is the current user (is accounts[0] the same as the account passed in as props?)
// Get current user OBJ from using abi.getUserFromAddress, and set this to userInfo const
//

const User = ({ className, item, curUser, account, userInfo, curUserInfo, isCurrentUser, otherUserInfo, setUserInfo, setOtherUserInfo, followed, setFollowed}) => {
  const [visible, setVisible] = useState(false);
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  const shareUrlFacebook = "viridian.exchange/profile/" + account;
  const shareUrlTwitter = "viridian.exchange/profile/" + account;

  const shortenAccount = () => {
    if (account) {
      return account.toString().substring(0, 6) + "..." + account.toString().substring(38);
    }
  }

  function checkFollowing() {
    if (!isCurrentUser) {
      if (curUserInfo) {
        if (curUserInfo.following) {
          if (curUserInfo.following.includes(account)) {
            setVisible(true);
            return true;
          }
          else {
            //alert("set visible false");
            setVisible(false);
            return false;
          }

        }
      }
    }
  }

  useEffect(async() => {
    checkFollowing();
    if (!isCurrentUser) {
      //alert(JSON.stringify(otherUserInfo));
    }


    if (following.includes(account)) {
      //alert("this should be sending patch with added user")
      let res = await HandleAddFollowing(setUserInfo, curUserInfo, following);
    }

    if (followers.includes(curUser)) {
      //alert("followers: " + followers);
      let res = await HandleAddFollower(otherUserInfo, followers);
      //alert(JSON.stringify("res"+ JSON.stringify(res)));
    }


    // if (curUserInfo) {
    //   if (curUserInfo.following && curUserInfo.followers) {
    //     if (curUserInfo.following.length > following.length) {
    //       if (curUserInfo.followers.length > followers.length) {
    //         alert('should be unfollowing here?')
    //         await HandleAddFollowing(setUserInfo, curUserInfo, following);
    //         await HandleAddFollower(otherUserInfo, followers);
    //       }
    //     }
    //   }
    // }
  }, [curUserInfo, followers])
  //followers, curUserInfo

  async function handleFollowers() {
    if (!followers.includes(curUserInfo.username)) {
      let followercopy = [...otherUserInfo.followers];
      await followercopy.push(curUserInfo.username);
      await setFollowers(followercopy);
    }
    //TODO handle case when followers removed
  }

  async function handleFollowing() {
    // THIS WILL ONLY WORK IF IT RUNS ONLY WHEN ON SOMEONE ELSES PAGE
    if (!curUserInfo.following.includes(account)) {

      let followcopy = [...curUserInfo.following];
      await followcopy.push(account);
      await setFollowing(followcopy);
      await handleFollowers();

      // let followers = otherUserInfo.followers;
      // followers.push(curUserInfo.username)
      // otherUserInfo.followers = followers


      // let res = await HandleAddFollowing(setUserInfo, curUserInfo, following);
      // alert(JSON.stringify(res));
      //     .then(async () => {
      //   await HandleAddFollower(otherUserInfo, followers)
      // })

      // HandleAddFollowing(setUserInfo, curUserInfo)

      //TODO: add profile 0x address to current user's following list
      //then also add the current user's address to the person's following list

      //the current page users follower/following should be a state variable set by filtering eh?
    }
    else {
      // let followcopy = [...curUserInfo.following];
      // followcopy = followcopy.filter(function( obj ) {
      //   return obj !== account;
      // });
      // await setFollowing(followcopy);

      let followCopy = [...following];
      const index = followCopy.indexOf(account);
      if (index > -1) {
        followCopy.splice(index, 1);
      }

      let followerCopy = [...followers];
      const indexe = followerCopy.indexOf(curUser);
      if (indexe > -1) {
        followerCopy.splice(indexe, 1);
      }
      await HandleAddFollowing(setUserInfo, userInfo, followCopy);
      await HandleAddFollower(otherUserInfo, followerCopy);


      // let followerscopy = followcopy.filter(function( obj ) {
      //   return obj.username !== curUser;
      // });
      // await setFollowers(followerscopy);
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
  if (!isCurrentUser) {
    return (
        <>
          <div className={cn(styles.user, className)}>
            {/*{JSON.stringify(userInfo)}*/}
            <div className={styles.avatar}>
              {otherUserInfo.profilePhotoURL && <img src={otherUserInfo.profilePhotoURL + "?" + new Date().getTime()} alt="Avatar"/>}
            </div>
            <div className={styles.name}>{otherUserInfo.displayName}</div>
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
              {otherUserInfo.bio}
            </div>
            <a
                className={styles.site}
                href = {otherUserInfo.website}
                target="_blank"
                rel="noopener noreferrer"
            >
              <Icon name="globe" size="16"/>
              <span >{otherUserInfo.website}</span>
            </a>
            <div className={styles.control}>
              <div className={styles.btns}>
                <button
                    className={cn(
                        "button button-small",
                        {[styles.active]: visible},
                        styles.button
                    )}
                    onClick={async () => {
                      {await handleFollowing().then(setVisible(!visible)); setFollowed(!followed);}
                    }}
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
                {/*<button*/}
                {/*    className={cn("button-circle-stroke button-small", styles.button)}*/}
                {/*    onClick={() => setVisibleModalReport(true)}*/}
                {/*>*/}
                {/*  <Icon name="report" size="20"/>*/}
                {/*</button>*/}
              </div>
              <div className={cn(styles.box, {[styles.active]: visibleShare})}>
                <div className={styles.stage}>Share or copy profile link</div>
                <div className={styles.share}>
                  <TwitterShareButton
                      className={styles.direction}
                      url={shareUrlTwitter}
                  >
              <span>
                <Icon name="twitter" size="20"/>
              </span>
                  </TwitterShareButton>
                  <CopyToClipboard text={shareUrlTwitter} style={{marginTop: "25px"}}
                      // onCopy={() => this.setState({copied: true})}
                  >
                    <div className={styles.code}>
                      <button className={styles.copy}>
                        <Icon name="copy" size="20"/>
                      </button>
                    </div>
                  </CopyToClipboard>
              {/*    <FacebookShareButton*/}
              {/*        className={styles.direction}*/}
              {/*        url={shareUrlFacebook}*/}
              {/*    >*/}
              {/*<span>*/}
              {/*  <Icon name="copy" size="20"/>*/}
              {/*</span>*/}
              {/*    </FacebookShareButton>*/}
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
  }
  else {
    return (
        <>
          <div className={cn(styles.user, className)}>
            {/*{JSON.stringify(userInfo)}*/}
            <div className={styles.avatar}>
              {userInfo.profilePhotoURL && <img src={userInfo.profilePhotoURL + "?" + new Date().getTime()} alt="Avatar"/>}
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
                href = {userInfo.website}
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
                        "button-circle-stroke button-small",
                        {[styles.active]: visibleShare},
                        styles.button
                    )}
                    onClick={() => setVisibleShare(!visibleShare)}
                >
                  <Icon name="share" size="20"/>
                </button>
                {/*<button*/}
                {/*    className={cn("button-circle-stroke button-small", styles.button)}*/}
                {/*    onClick={() => setVisibleModalReport(true)}*/}
                {/*>*/}
                {/*  <Icon name="report" size="20"/>*/}
                {/*</button>*/}
              </div>
              <div className={cn(styles.box, {[styles.active]: visibleShare})}>
                <div className={styles.stage}>Share or copy profile link</div>
                <div className={styles.share}>
                  <TwitterShareButton
                      className={styles.direction}
                      url={shareUrlTwitter}
                  >
              <span>
                <Icon name="twitter" size="20"/>
              </span>
                  </TwitterShareButton>
                  <CopyToClipboard text={shareUrlTwitter} style={{marginTop: "25px"}}
                      // onCopy={() => this.setState({copied: true})}
                  >
                    <div className={styles.code}>
                      <button className={styles.copy}>
                        <Icon name="copy" size="20"/>
                      </button>
                    </div>
                  </CopyToClipboard>
              {/*    <FacebookShareButton*/}
              {/*        className={styles.direction}*/}
              {/*        url={shareUrlFacebook}*/}
              {/*    >*/}
              {/*<span>*/}
              {/*  <Icon name="copy" size="20"/>*/}
              {/*</span>*/}
              {/*    </FacebookShareButton>*/}
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
  }
};

export default User;
