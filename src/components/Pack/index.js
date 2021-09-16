import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";

const Pack = ({ className, item, account, isListing, curProfilePhoto }, props) => {
  const [visible, setVisible] = useState(false);

  //srcSet={`${item.image2x} 2x`} Put this back in img when ready

  //useEffect(async () => {alert(JSON.stringify(item))}, []);
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        {/*{item.uri.image}*/}
        <video autoPlay loop muted style={{maxWidth: '30ex'}}>
          <source src={item.uri.image} type="video/mp4"/>
        </video>
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
          <button className={cn("button-small", styles.button)}>
            <span>Place a bid</span>
            <Icon name="scatter-up" size="16" />
          </button>
        </div>
      </div>
      {/*{JSON.stringify(item.listingId)}*/}
      <Link className={styles.link} to={{ pathname: `/item/${item.id}`, state: { curProfilePhoto: curProfilePhoto, listingId: item.listingId , price: item.price, uri: item.uri, id: item.id, nftOwner: item.owner, account: account, isListing: isListing, isPack: true } }}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{item.uri.name}</div>
            <div className={styles.price}>{item.price} VEXT</div>
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
          <div className={styles.status}>
            <Icon name="candlesticks-up" size="20" />
            Highest bid <span>{item.highestBid}</span>
          </div>
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