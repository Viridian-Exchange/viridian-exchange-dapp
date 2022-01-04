import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Items.module.sass";
import Card from "../../../components/Card";
import NFT from "../../../components/NFT";
import Pack from "../../../components/Pack";
import Loader from "../../../components/Loader";
import Offer from "../../../components/Offer";

const Items = ({ className, items, nfts, packs, isListing, account, offers, curProfilePhoto, users, dropDownOption }, props) => {

    if (nfts) {
        return (
            <div className={cn(styles.items, className)}>
                {/*{JSON.stringify(curProfilePhoto)}*/}
                <div className={styles.list}>
                    {nfts.map((x, index) => {
                        if (x.isVNFT) {
                        // <div>{x.uri.image}</div>,
                            return (<NFT className={styles.card} item={x} key={index} isListing={isListing} account={account}
                                 curProfilePhoto={curProfilePhoto} userInfo = {props.userInfo}/>);
                        }
                        else if (x.isVNFT === false) {
                            return (<Pack className={styles.card} item={x} key={index} isListing={isListing} account={account}
                                         curProfilePhoto={curProfilePhoto} userInfo = {props.userInfo}/>);
                        }
                        else {
                            return (<NFT className={styles.card} item={x} key={index} isListing={isListing} account={account}
                                         curProfilePhoto={curProfilePhoto} userInfo = {props.userInfo}/>);
                        }
                    })}
                </div>
            </div>
        );
    }
    else if (packs) {
        return (
            <div className={cn(styles.items, className)}>
                {/*{JSON.stringify(packs)}*/}
                <div className={styles.list}>
                    {packs.map((x, index) => [
                        // <div>{x.uri.image}</div>,
                        <Pack className={styles.card} item={x} key={index} isListing={isListing} account={account}
                              curProfilePhoto = {curProfilePhoto}/>
                    ])}
                </div>
            </div>
        );
    }
    else if (items) {
        return (
            <div className={cn(styles.items, className)}>
                <div className={styles.list}>
                    {items.map((x, index) => (
                        <Card className={styles.card} item={x} key={index}/>
                    ))}
                </div>
            </div>
        );
    }
    else if (offers) {
        return (
            <div className={cn(styles.items, className)}>
                {/*{"XXX" + JSON.stringify(offers[0].from)}*/}
                <div className={styles.list}>
                    {offers.map((x, index) => {

                        return users.map((user) => {
                            //return ("BRUH");
                            if (user.username.toLowerCase() === x.to.toLowerCase() && x.from.toLowerCase() === account.toLowerCase()) {
                                if (x.pending) {
                                    if (dropDownOption === "Sent Offers" && account.toLowerCase() === x.from.toLowerCase()) {
                                        return (<Offer className={styles.card} item={x} otherUser={user} key={index}
                                                       account={account} curProfilePhoto={curProfilePhoto} sent={true} />);
                                    }
                                    else if (dropDownOption === "Received Offers" && account.toLowerCase() === x.to.toLowerCase()) {
                                        return (<Offer className={styles.card} item={x} otherUser={user} key={index}
                                                       account={account} curProfilePhoto={curProfilePhoto} sent={false}/>);
                                    }
                                }
                            }
                            else if (user.username.toLowerCase() === x.from.toLowerCase() && x.from.toLowerCase() !== account.toLowerCase()) {
                                // //console.log(user.username.toLowerCase() === x.from.toLowerCase());
                                if (x.pending) {
                                    if (dropDownOption === "Sent Offers" && account.toLowerCase() === x.from.toLowerCase()) {
                                        return (<Offer className={styles.card} item={x} otherUser={user} key={index}
                                                       account={account} curProfilePhoto={curProfilePhoto} sent={true} />);
                                    }
                                    else if (dropDownOption === "Received Offers" && account.toLowerCase() === x.to.toLowerCase()) {
                                        return (<Offer className={styles.card} item={x} otherUser={user} key={index}
                                                       account={account} curProfilePhoto={curProfilePhoto} sent={false}/>);
                                    }
                                }
                            }
                        });
                    })}
                </div>
            </div>
        );
    }
    else {
        return <Loader className={styles.loader}/>;
    }

}

export default Items;
