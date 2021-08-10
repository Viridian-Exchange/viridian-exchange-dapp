import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import Users from "./Users"

const NFT = ({ className, item, account, isListing }, props) => {
  const [visible, setVisible] = useState(false);

    const users = [
        {
            name: "Raquel Will",
            position: "You Receive",
            avatar: "/images/content/avatar-2.jpg",
        },
        {
            name: "Selina Mayert",
            position: "They Receive",
            avatar: "/images/content/avatar-1.jpg",
        },
    ];

  //srcSet={`${item.image2x} 2x`} Put this back in img when ready

  //useEffect(async () => {alert(JSON.stringify(item))}, []);
  return (
      <Link className={styles.link} to={{ pathname: `/offer/${1}`, state: { } }}>
    <div className={cn(styles.card, className)}>
        <Users items={users}/>
      <div className={styles.preview}>
        {/*{uri.image}*/}
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
      {/*<Link className={styles.link} to={{ pathname: `/item/${item.id}`, state: { listingId: item.listingId , price: item.price, uri: item.uri, id: item.id, nftOwner: item.owner, account: account, isListing: isListing } }}>*/}
      {/*</Link>*/}
    </div>
</Link>
  );
};

export default NFT;
