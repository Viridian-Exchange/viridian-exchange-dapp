import React from "react";
import cn from "classnames";
import styles from "./Items.module.sass";
import Card from "../../../components/Card";
import NFT from "../../../components/unselectableNFT";
import Loader from "../../../components/Loader";
import Offer from "../../../components/Offer";

const Items = ({ className, items, nfts, isListing, account, offers, give, selected, setGiveSelectedNFTs, setRecSelectedNFTs,
                   giveSelectedNFTs, recSelectedNFTs}, props) => {
    // TODO: Don't just map "nfts" everytime, map selected nfts if they are selected
    return (
        <div className={cn(styles.items, className)}>
            {/*{JSON.stringify("GIVE: " + giveSelectedNFTs)}*/}
            {/*{JSON.stringify("REC: " + recSelectedNFTs)}*/}
            <div className={styles.list}>
                {/*{giveSelectedNFTs.map((x, index) => {*/}
                {/*    if (give) {*/}
                {/*        return (<button onClick={() => {*/}
                {/*                        setGiveSelectedNFTs(giveSelectedNFTs.splice(index, 1));*/}
                {/*                        }}>*/}
                {/*                        {index}*/}
                {/*                        {}*/}
                {/*                        <NFT className={styles.card} item={x} key={index} isListing={isListing} account={account}/>*/}
                {/*                    </button>);*/}
                {/*    }*/}
                {/*})*/}
                {/*}*/}
                {/*{recSelectedNFTs.map((x, index) => {*/}
                {/*    if (!give) {*/}
                {/*        return (<button onClick={() => {*/}
                {/*                        setRecSelectedNFTs(recSelectedNFTs.splice(index, 1));*/}
                {/*                        }}>*/}
                {/*                        {index}*/}
                {/*                        <NFT className={styles.card} item={x} key={index} isListing={isListing} account={account}/>*/}
                {/*                    </button>);*/}
                {/*    }*/}
                {/*})*/}
                {/*}*/}
                {nfts.map((x, index) => {
                    // <div>{x.uri.image}</div>,
                    if (selected) {
                        if (give) {
                            return (<button onClick={() => {
                                setGiveSelectedNFTs([...giveSelectedNFTs].splice(giveSelectedNFTs.indexOf(x), 1));
                                }}>
                                {index}
                                {}
                                <NFT className={styles.card} item={x} key={index} isListing={isListing} account={account}/>
                            </button>);
                        }
                        else {
                            return (<button onClick={() => {
                                setRecSelectedNFTs([...recSelectedNFTs].splice(recSelectedNFTs.indexOf(x), 1));
                                }}>
                                {index}
                                <NFT className={styles.card} item={x} key={index} isListing={isListing} account={account}/>
                            </button>);
                        }
                    }
                    else {
                        if (give) {
                            return (<button onClick={() => {
                                if (!giveSelectedNFTs.includes(x)) {
                                    setGiveSelectedNFTs([...giveSelectedNFTs].concat(x));
                                }
                            }}>
                                {index}
                                <NFT className={styles.card} item={x} key={index} isListing={isListing}
                                     account={account}/>
                            </button>);
                        } else {
                            return (<button onClick={() => {
                                if (!giveSelectedNFTs.includes(x)) {
                                    setRecSelectedNFTs([...recSelectedNFTs].concat(x));
                                }
                            }}>
                                {index}
                                <NFT className={styles.card} item={x} key={index} isListing={isListing}
                                     account={account}/>
                            </button>);
                        }
                }})}
            </div>
            {!giveSelectedNFTs && !recSelectedNFTs && <Loader className={styles.loader} />}
        </div>
    );
};

export default Items;
