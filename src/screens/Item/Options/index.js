import React from "react";
import cn from "classnames";
import styles from "./Options.module.sass";
import Icon from "../../../components/Icon";
import Actions from "../../../components/Actions";
// import React, { useState, useEffect } from "react";
import {HandleAddLikes} from "../../../apis/UserAPI";





const Options = ({ className, items, tokenId, id, account, owner, isListing, userInfo }) => {

    // const [likes, setLikes] = useState([]);
    //
    // function HandleLikes() {
    //     let likesCopy = [...userInfo.likes];
    //     likesCopy.push(tokenId);
    //     setLikes(likesCopy);
    //
    // }
    //
    //
    // useEffect(async() => {
    //     if (likes.length > 0) {
    //         await HandleAddLikes(setUserInfo, userInfo, likes);
    //     }
    // })
  return (
    <div className={cn(styles.options, className)}>
      <button className={cn("button-circle-stroke", styles.button)}>
        <Icon name="share" size="24" />
      </button>
      <button className={cn("button-circle-stroke", styles.button, styles.favorite)}>
        <Icon name="heart-fill" size="24" />
      </button>
        {/*{tokenId + 'breh'}*/}
      <Actions className={styles.actions} tokenId={tokenId} id={id} account={account} owner={owner} isListing={isListing} />
    </div>
  );
};

export default Options;
