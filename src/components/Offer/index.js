import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import Users from "./Users"
import Web3 from "web3";


const Offer = ({ className, item, account, isListing, curProfilePhoto, otherProfilePhoto, otherUser }, props) => {
  const [visible, setVisible] = useState(false);

    const users = [
        {
            name: "Raquel Will",
            position: "You Receive",
            avatar: {curProfilePhoto},
        },
        {
            name: "Selina Mayert",
            position: "They Receive",
            avatar: {otherProfilePhoto},
        },
    ];

  //srcSet={`${item.image2x} 2x`} Put this back in img when ready

  //useEffect(async () => {alert(JSON.stringify(item))}, []);
    //TODO: Will likely have to flip how the to and from NFTs and VEXT are displayed as the
  return (
      // TODO: REMINDER THIS IS FLIPPED, MAKE SURE PEOPLE KNOW THIS MIGHT HAVE TO REFACTOR BECAUSE IT IS CONFUSING
      <Link className={styles.link} to={{ pathname: `/offer/${1}`, state: {offerId: item.offerId, toVEXT: item.fromAmt, toNFTs: item.fromNftIds, toPacks: item.fromPackIds,
              fromVEXT: item.toAmt, fromNFTs: item.toNftIds, fromPacks: item.toPackIds, otherUser: otherUser, isETH: !item.isVEXT, toAccepted: item.toAccepted, fromAccepted: item.fromAccepted}}}>
    <div className={cn(styles.card, className)}>
        {/*{"ITM: " + JSON.stringify(otherUser.profilePhotoURL)}*/}
        <Users items={users} toVEXT={item.fromAmt} toNFTs={item.fromNftIds} fromVEXT={item.toAmt} fromNFTs={item.toNftIds} curProfilePhoto={curProfilePhoto} isETH={!item.isVEXT}
               otherProfilePhoto={otherUser.profilePhotoURL}/>
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
          {JSON.stringify(item)}
</Link>
  );
};

export default Offer;
