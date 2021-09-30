import React from "react";
import cn from "classnames";
import styles from "./Items.module.sass";
import Card from "../../../components/Card";
import NFT from "../../../components/unselectableNFT";
import Loader from "../../../components/Loader";
import Offer from "../../../components/Offer";

const Items = ({ className, items, nfts, isListing, account, offers, give, selected, setGiveSelectedNFTs, setRecSelectedNFTs,
                   giveSelectedNFTs, recSelectedNFTs, selectedGiveIds, setGiveSelectedIds, selectedRecIds, setRecSelectedIds}, props) => {
    // TODO: Don't just map "nfts" everytime, map selected nfts if they are selected
    return (
        <div className={cn(styles.items, className)}>
            {/*{JSON.stringify("GIVE: " + giveSelectedNFTs)}*/}
            {/*{JSON.stringify("REC: " + recSelectedNFTs)}*/}
            <div className={styles.list}>
                {nfts.map((x, index) => {
                    if (selected) {
                        if (give) {
                            return (<button onClick={() => {
                                let giveNFTCopy = [...giveSelectedNFTs];
                                giveNFTCopy.splice(index, 1)
                                setGiveSelectedNFTs(giveNFTCopy);

                                let giveIdCopy = [...selectedGiveIds];
                                giveIdCopy.splice(index, 1)
                                setGiveSelectedIds(giveIdCopy);
                                }}>
                                <NFT className={styles.card} item={x} key={index} isListing={isListing} account={account} userInfo = {props.userInfo}/>
                            </button>);
                        }
                        else {
                            return (<button onClick={() => {
                                let recNFTCopy = [...recSelectedNFTs];
                                recNFTCopy.splice(index, 1)
                                setRecSelectedNFTs(recNFTCopy);

                                let recIdCopy = [...selectedRecIds];
                                recIdCopy.splice(index, 1)
                                setRecSelectedIds(recIdCopy);
                                }}>
                                <NFT className={styles.card} item={x} key={index} isListing={isListing} account={account} userInfo = {props.userInfo}/>
                            </button>);
                        }
                    }
                    else {
                        if (give) {
                            return (<button onClick={() => {
                                if (!giveSelectedNFTs.includes(x)) {
                                    setGiveSelectedNFTs([...giveSelectedNFTs].concat(x));
                                }
                                if (!selectedGiveIds.includes(x.id)) {
                                    setGiveSelectedIds([...selectedGiveIds].concat(x.id));
                                }
                            }}>
                                {/*<div style={{color: 'white'}}>{giveSelectedNFTs.includes(x) + "III"}</div>*/}
                                <NFT className={styles.card} item={x} key={index} isListing={isListing}
                                     account={account} userInfo = {props.userInfo}/>
                            </button>);
                        } else {
                            return (<button onClick={() => {
                                if (!recSelectedNFTs.includes(x)) {
                                    setRecSelectedNFTs([...recSelectedNFTs].concat(x));
                                }
                                if (!selectedRecIds.includes(x.id)) {
                                    setRecSelectedIds([...selectedRecIds].concat(x.id));
                                }
                            }}>
                                {/*<div style={{color: 'white'}}>{recSelectedNFTs.includes(x) + "III"}</div>*/}
                                {/*<div style={{color: 'white'}}>{JSON.stringify(recSelectedNFTs)}</div>*/}
                                {/*<div style={{color: 'white'}}>{JSON.stringify(x === recSelectedNFTs[0])}</div>*/}
                                <NFT className={styles.card} item={x} key={index} isListing={isListing}
                                     account={account} userInfo = {props.userInfo}/>
                            </button>);
                        }
                }})}
            </div>
            {!giveSelectedNFTs && !recSelectedNFTs && <Loader className={styles.loader} />}
        </div>
    );
};

export default Items;
