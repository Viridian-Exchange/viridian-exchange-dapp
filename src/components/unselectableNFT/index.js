import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";


const NFT = ({ className, item, account, isListing }, props) => {
  const [visible, setVisible] = useState(false);

  //srcSet={`${item.image2x} 2x`} Put this back in img when ready

  //useEffect(async () => {alert(JSON.stringify(item))}, []);
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        {/*{uri.image}*/}
        <img src={item.uri.image} alt="Card" />
        <div className={styles.control}>
          <div
            className={cn(
              { "status-green": item.category === "green" },
              styles.category
            )}
          >
            {item.categoryText}
          </div>
        </div>
      </div>
      {/*{JSON.stringify(item.listingId)}*/}
      <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title} style={{color: 'white'}}>{item.uri.name}</div>
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
    </div>
  );
};

export default NFT;
