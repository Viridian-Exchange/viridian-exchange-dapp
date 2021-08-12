import React from "react";
import cn from "classnames";
import styles from "./Items.module.sass";
import Card from "../../../components/Card";
import NFT from "../../../components/unselectableNFT";
import Loader from "../../../components/Loader";
import Offer from "../../../components/Offer";

const Items = ({ className, items, nfts, isListing, account, offers, give, selected, setGiveSelectedNFTs, setRecSelectedNFTs,
                   giveSelectedNFTs, recSelectedNFTs}, props) => {

    return (
        <div className={cn(styles.items, className)}>
            {/*{JSON.stringify("GIVE: " + giveSelectedNFTs)}*/}
            {/*{JSON.stringify("REC: " + recSelectedNFTs)}*/}
            <div className={styles.list}>
                {nfts.map((x, index) => {
                    // <div>{x.uri.image}</div>,
                    if (selected) {
                        if (give) {
                            return (<button onClick={() => {setGiveSelectedNFTs(giveSelectedNFTs.splice(index, 1));}}>
                                <NFT className={styles.card} item={x} key={index} isListing={isListing} account={account}/>
                            </button>);
                        }
                        else {
                            return (<button onClick={() => {setRecSelectedNFTs(recSelectedNFTs.splice(index, 1));}}>
                                <NFT className={styles.card} item={x} key={index} isListing={isListing} account={account}/>
                            </button>);
                        }
                    }
                    else {
                        if (give) {
                            return (<button onClick={() => {
                                setGiveSelectedNFTs(giveSelectedNFTs.concat(x));
                            }}>
                                <NFT className={styles.card} item={x} key={index} isListing={isListing}
                                     account={account}/>
                            </button>);
                        } else {
                            return (<button onClick={() => {
                                setRecSelectedNFTs(recSelectedNFTs.concat(x));
                            }}>
                                <NFT className={styles.card} item={x} key={index} isListing={isListing}
                                     account={account}/>
                            </button>);
                        }
                    }
                })}
            </div>
            {!giveSelectedNFTs && !recSelectedNFTs && <Loader className={styles.loader} />}
        </div>
    );
};

export default Items;
