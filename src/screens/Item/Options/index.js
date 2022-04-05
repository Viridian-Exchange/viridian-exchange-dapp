import React, {useState, useEffect} from "react";
import cn from "classnames";
import styles from "./Options.module.sass";
import Icon from "../../../components/Icon";
import Actions from "../../../components/Actions";
// import React, { useState, useEffect } from "react";
import {HandleAddLikes} from "../../../apis/UserAPI";
import {HandleAddNFTLike, FetchCards} from "../../../apis/CardsAPI";





const Options = ({ className, items, tokenId, id, account, owner, isListing, userInfo, setUserInfo, price, isPack, isETH, setSuccess, setError }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([]);

    // useEffect(async () => {
    //     let nfts = await FetchCards(setNFTLikes);
    //     alert(JSON.stringify(nftlikes));
    //
    // },[])
    // const [liked, setLiked] = useState(false);

    async function handleLike() {
        let likescopy = [...userInfo.likes];
        likescopy.push(tokenId);

        await HandleAddLikes(setUserInfo, userInfo, likescopy);
        await HandleAddNFTLike(tokenId);
        //todo: one api function to add like to the user,
        // one api function to add a like to the count of likes on the NFT item co
        // edit handleaddlikes api funnction to make sure to call to the card table
        // edit updatecard function to be able to just add a like to the card

        // post +1 to NFT id likes

    }


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
        <button
            className={cn("button-circle-stroke", styles.button, styles.favorite, { [styles.active]: liked })}
            onClick={async () => setLiked(!liked).then(handleLike())}
        >
            {liked ? <Icon name="heart-fill" size="24" /> : <Icon name="heart" size="24" />}
        </button>
        {/*{tokenId + 'breh'}*/}
      <Actions setSuccess={setSuccess} setError={setError} isETH={isETH} price={price} className={styles.actions} tokenId={tokenId} id={id} account={account} owner={owner} isListing={isListing} isPack={isPack} />
    </div>
  );
};

export default Options;
