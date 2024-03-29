import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import {parseVextAmount} from "../../Utils";
import Web3 from "web3";
import {useCryptoPrices} from "react-realtime-crypto-prices";

const Pack = ({ className, item, account, isETH, isListing, curProfilePhoto, isHotBid}, props) => {
  const [visible, setVisible] = useState(false);
  const prices = useCryptoPrices(["eth"]);

  //srcSet={`${item.image2x} 2x`} Put this back in img when ready

  //useEffect(async () => {alert(JSON.stringify(item))}, []);
  return (
    <div className={cn(styles.card, className)} style={{maxHeight: '35ex'}}>
      <Link className={styles.link} to={{ pathname: `/item/pack/${item.id}`, state: { curProfilePhoto: curProfilePhoto, isVNFT: item.isVNFT, listingId: item.listingId , price: item.price, uri: item.uri, id: item.id, nftOwner: item.owner, account: account, isListing: (isListing && item.price), isPack: true, isETH: item.isETH } }}>
      {/*{JSON.stringify(item.isETH)}*/}
      <div className={styles.preview}>
        {item.uri.image ? <video autoPlay loop muted playsInline style={{maxWidth: '32ex'}}>
          <source src={item.uri.image} type="video/mp4"/>
        </video> : <img src="/images/content/gradient-2.png" alt='card' style={{opacity: '0.2'}}/>}
        <div className={styles.control}>
          <div
            className={cn(
              { "status-green": item.category === "green" },
              styles.category
            )}
          >
            {item.categoryText}
          </div>
          {/*<button className={cn("button-small", styles.button)}>*/}
          {/*  <span>Place a bid</span>*/}
          {/*  <Icon name="scatter-up" size="16" />*/}
          {/*</button>*/}
          {/*{JSON.stringify(item)}*/}
        </div>
      </div>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{item.uri.name}</div>
            {/*{isListing && <div className={styles.price}>{parseVextAmount(item.price)} VEXT</div>}*/}
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
        <div className={styles.foot}>
          {/*<div className={styles.status}>*/}
          {/*  <Icon name="candlesticks-up" size="20" />*/}
          {/*  Highest bid <span>{item.highestBid}</span>*/}
          {/*</div>*/}
          {(isListing && item.price) &&
          <div style={{minWidth: '20ex'}}>{item.isETH ? [<div className={styles.price}>
                <img style={{width: '3ex', marginTop: '-.7ex', marginLeft: '-1ex', marginBottom: '.4ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />

                {!isHotBid ? <div style={{marginTop: '-3.7ex', marginLeft: '2ex'}}>
                  {Web3.utils.fromWei(item.price)}</div> :  <div style={{marginLeft: '2ex', marginBottom: '-2ex', marginTop: '-3.6ex'}}>
                  {Web3.utils.fromWei(item.price)} </div>}
              </div>,
                <>{prices.eth && <>{!isHotBid ? <div style={{fontSize: '14.5px', float: 'right', marginLeft: '4ex', marginTop: '-3ex'}}>${Math.round((prices.eth * Web3.utils.fromWei(item.price)) * 100) / 100}</div> :
                    <div style={{fontSize: '14.5px', float: 'right', marginLeft: '4ex', marginTop: '-1.5ex'}}>${Math.round((prices.eth * Web3.utils.fromWei(item.price)) * 100) / 100}</div>}</>}</>]
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

export default Pack;
