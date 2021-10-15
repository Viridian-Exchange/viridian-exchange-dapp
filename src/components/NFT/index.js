import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import VideoLooper from 'react-video-looper'
import {parseVextAmount} from '../../Utils';
import Web3 from 'web3';

const NFT = ({ className, item, account, isListing, isETH, curProfilePhoto, isHotBid }, props) => {
  const [visible, setVisible] = useState(false);

  //srcSet={`${item.image2x} 2x`} Put this back in img when ready

  //useEffect(async () => {alert(JSON.stringify(item))}, []);
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        {item.uri.image ? <img src={item.uri.image} alt='card' /> : <img src="/images/content/gradient-2.png" alt='card' style={{opacity: '0.2'}}/>}


        {/*<video autoPlay loop muted style={{maxWidth: '30ex'}}>*/}
        {/*  <source src={item.uri.image} type="video/mp4"/>*/}
        {/*</video>*/}
        <div className={styles.control}>
          <div
            className={cn(
              { "status-green": item.category === "green" },
              styles.category
            )}
          >
            {item.categoryText}
          </div>
          <button
            className={cn(styles.favorite, { [styles.active]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <Icon name="heart" size="20" />
          </button>
          {/*<button className={cn("button-small", styles.button)}>*/}
          {/*  <span>Place a bid</span>*/}
          {/*  <Icon name="scatter-up" size="16" />*/}
          {/*</button>*/}
        </div>
      </div>
      {/*{JSON.stringify(item.isListing)}*/}
      {/*{curProfilePhoto}*/}
      <Link className={styles.link} to={{ pathname: `/item/vnft/${item.id}`, state: { userInfo: props.userInfo, curProfilePhoto: curProfilePhoto, listingId: item.listingId, isVNFT: item.isVNFT, price: item.price, uri: item.uri, id: item.id, nftOwner: item.owner, account: account, isListing: (isListing && item.price), isPack: false, isETH: item.isETH } }}>
        <div className={styles.body}>
          <div className={styles.line}>
            {/*{JSON.stringify(isETH)}*/}
            <div className={styles.title}>{item.uri.name}</div>
          </div>
          <div className={styles.line}>
            <div className={styles.users}>
              {/*item.users.map((x, index) => (
                <div className={styles.avatar} key={index}>
                  <img src={x.avatar} alt="Avatar" />
                </div>
              ))*/}
            </div>
            <div className={styles.counter}>{item.counter}</div>
          </div>
        </div>
        {/*TODO: Figure out how to handle bids on specific items*/}
        <div className={styles.foot}>
          {/*<div className={styles.status}>*/}
          {/*  <Icon name="candlesticks-up" size="20" />*/}
          {/*  Highest bid <span>{item.highestBid}</span>*/}
          {/*</div>*/}
          {(isListing && item.price) &&
          <div>{item.isETH ? <div className={styles.price}>
                <img style={{width: '3ex', marginTop: '-.2ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />

            {!isHotBid ? <div style={{marginTop: '-3.7ex', marginLeft: '2ex'}}>
              {Web3.utils.fromWei(item.price)}</div> :  <div style={{marginTop: '-3.2ex', marginLeft: '2ex'}}>
              {Web3.utils.fromWei(item.price)} </div>}
              </div>
              : <div className={styles.price}>{parseVextAmount(item.price)} USDT</div>}</div>
          }
          <div
            className={styles.bid}
            dangerouslySetInnerHTML={{ __html: item.bid }}
          />
        </div>
      </Link>
    </div>
  );
};

export default NFT;
