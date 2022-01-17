import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import Users from "./Users"
import Web3 from "web3";
import oStyles from "./Card.module.sass";
import {FetchUserRet} from "../../apis/UserAPI";


const Offer = ({ className, item, account, isListing, curProfilePhoto, otherProfilePhoto, otherUser, sent, rec,
                   nfts, packs, otherNFTs, otherPacks}, props) => {
  const [visible, setVisible] = useState(false);
  const [toUser, setToUser] = useState({});
  const [fromUser, setFromUser] = useState({});

    let users = [];
    if (fromUser.displayName) {
        users = [
            {
                name: "Raquel Will",
                position: fromUser.displayName + " Receives",
                avatar: fromUser.profilePhotoURL,
            },
            {
                name: "Selina Mayert",
                position: toUser.displayName + " Receives",
                avatar: toUser.profilePhotoURL,
            },
        ];
    }

    useEffect(async () => {
        let resTo = await FetchUserRet(item.to.toLowerCase());
        setToUser(resTo);

        let resFrom = await FetchUserRet(item.from.toLowerCase());
        setFromUser(resFrom);
        //alert(JSON.stringify(resFrom) + JSON.stringify(resTo));
    }, [item.to, item.from])

  //srcSet={`${item.image2x} 2x`} Put this back in img when ready

  //useEffect(async () => {alert(JSON.stringify(item))}, []);
    //TODO: Will likely have to flip how the to and from NFTs and VEXT are displayed as the
  return (
      // TODO: REMINDER THIS IS FLIPPED, MAKE SURE PEOPLE KNOW THIS MIGHT HAVE TO REFACTOR BECAUSE IT IS CONFUSING
      <Link className={styles.link} to={{ pathname: `/offer/${1}`, state: {send: sent, offerId: item.offerId, toVEXT: item.fromAmt, toNFTs: item.fromNftIds, toPacks: item.fromPackIds,
              fromVEXT: item.toAmt, fromNFTs: item.toNftIds, fromPacks: item.toPackIds, otherUser: otherUser, isETH: !item.isVEXT, toAccepted: item.toAccepted, fromAccepted: item.fromAccepted, rec: rec,
              nfts: nfts, packs: packs, otherNFTs: otherNFTs, otherPacks: otherPacks}}}>
    <div className={cn(styles.card, className)}>
        {/*{"ITM: " + JSON.stringify(otherUser.profilePhotoURL)}*/}
        {JSON.stringify(nfts) + " " + JSON.stringify(packs)}
        {/*{JSON.stringify(item)}*/}
        <Users items={users} toVEXT={item.toAmt} toNFTs={item.toNftIds} toPacks={item.toPackIds} fromVEXT={item.fromAmt} fromNFTs={item.fromNftIds} fromPacks={item.fromPackIds} curProfilePhoto={fromUser.profilePhotoURL} isETH={!item.isVEXT}
                                                                                          otherProfilePhoto={toUser.profilePhotoURL} account={account}/>
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
        {(item.to.toLowerCase() === account.toLowerCase()) && <div className={styles.priceRec}>Received</div>}
        {(item.from.toLowerCase() === account.toLowerCase()) && <div className={styles.priceSent}>Sent</div>}
        {(item.toAccepted && !item.fromAccepted) && <div className={styles.priceAccept}>Accepted</div>}
      {/*{JSON.stringify(item.listingId)}*/}
      {/*<Link className={styles.link} to={{ pathname: `/item/${item.id}`, state: { listingId: item.listingId , price: item.price, uri: item.uri, id: item.id, nftOwner: item.owner, account: account, isListing: isListing } }}>*/}
      {/*</Link>*/}
    </div>
          {/*{JSON.stringify(item)}*/}
</Link>
  );
};

export default Offer;
