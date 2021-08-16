import React from "react";
import cn from "classnames";
import styles from "./Items.module.sass";
import Card from "../../../components/Card";
import NFT from "../../../components/NFT";
import Loader from "../../../components/Loader";
import Offer from "../../../components/Offer";

const Items = ({ className, items, nfts, isListing, account, offers }, props) => {
    if (nfts) {
        return (
            <div className={cn(styles.items, className)}>
                {/*{JSON.stringify(nfts)}*/}
                <div className={styles.list}>
                    {nfts.map((x, index) => [
                        // <div>{x.uri.image}</div>,
                        <NFT className={styles.card} item={x} key={index} isListing={isListing} account={account}/>
                    ])}
                </div>
                <Loader className={styles.loader}/>
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
                <Loader className={styles.loader}/>
            </div>
        );
    }
    else if (offers) {
        return (
            <div className={cn(styles.items, className)}>
                <div className={styles.list}>
                    {offers.map((x, index) => (
                        <Offer className={styles.card} item={x} key={index}/>
                    ))}
                </div>
                <Loader className={styles.loader}/>
            </div>
        );
    }
    else {
        return null;
    }

};

export default Items;
