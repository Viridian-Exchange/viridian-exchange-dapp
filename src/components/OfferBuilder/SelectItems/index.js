import React from "react";
import cn from "classnames";
import styles from "./Items.module.sass";
import Card from "../../../components/Card";
import NFT from "../../../components/unselectableNFT";
import Loader from "../../../components/Loader";
import Offer from "../../../components/Offer";
import Pack from "../../UnselectablePack";

const Items = ({ className, items, nfts, isListing, account, offers, give, selected, setGiveSelectedNFTs, setRecSelectedNFTs,
                   giveSelectedNFTs, recSelectedNFTs, selectedGivePackIds, selectedGiveIds, setGiveSelectedPackIds, setGiveSelectedIds, selectedRecPackIds, selectedRecIds, setRecSelectedPackIds, setRecSelectedIds}, props) => {
    // TODO: Don't just map "nfts" everytime, map selected nfts if they are selected
    return (
        <div className={cn(styles.items, className)}>
            {/*{JSON.stringify("GIVE: " + giveSelectedNFTs)}*/}
            {/*{JSON.stringify("REC: " + recSelectedNFTs)}*/}
            {/*{JSON.stringify(nfts)}*/}
            <div className={styles.list}>
                {nfts.map((x, index) => {
                    //("XI" + JSON.stringify(nfts))
                    if (x) {
                        if (selected) {
                            if (give) {
                                return (<button onClick={() => {
                                    let giveNFTCopy = [...giveSelectedNFTs];
                                    giveNFTCopy.splice(index, 1)
                                    setGiveSelectedNFTs(giveNFTCopy);
                                    if (x.uri) {
                                        if (x.uri.grade) {
                                            let giveIdCopy = [...selectedGiveIds];
                                            giveIdCopy.splice(index, 1)
                                            setGiveSelectedIds(giveIdCopy);
                                        } else {
                                            let giveIdCopy = [...selectedGivePackIds];
                                            giveIdCopy.splice(index, 1)
                                            setGiveSelectedPackIds(giveIdCopy);
                                        }
                                    }
                                }}>
                                    {x.uri.grade ?
                                        <NFT className={styles.card} item={x} key={index} isListing={isListing}
                                             account={account} userInfo={props.userInfo}/> :
                                        <Pack className={styles.card} item={x} key={index} isListing={isListing}
                                              account={account} userInfo={props.userInfo}/>}
                                </button>);
                            } else {
                                return (<button onClick={() => {
                                    let recNFTCopy = [...recSelectedNFTs];
                                    recNFTCopy.splice(index, 1)
                                    setRecSelectedNFTs(recNFTCopy);

                                    if (x.uri) {
                                        if (x.uri.grade) {
                                            let recIdCopy = [...selectedRecIds];
                                            recIdCopy.splice(index, 1)
                                            setRecSelectedIds(recIdCopy);
                                        } else {
                                            let recIdCopy = [...selectedRecPackIds];
                                            recIdCopy.splice(index, 1)
                                            setRecSelectedPackIds(recIdCopy);
                                        }
                                    }
                                }}>
                                    {x.uri.grade ?
                                        <NFT className={styles.card} item={x} key={index} isListing={isListing}
                                             account={account} userInfo={props.userInfo}/> :
                                        <Pack className={styles.card} item={x} key={index} isListing={isListing}
                                              account={account} userInfo={props.userInfo}/>}
                                </button>);
                            }
                        } else {
                            if (give) {
                                return (<button onClick={() => {
                                    alert("XX: " + JSON.stringify(x))
                                    if (!giveSelectedNFTs.includes(x)) {
                                        setGiveSelectedNFTs([...giveSelectedNFTs].concat(x));
                                    }
                                    if (x.uri) {
                                        if (!selectedGiveIds.includes(x.id) && x.uri.grade) {
                                            setGiveSelectedIds([...selectedGiveIds].concat(x.id));
                                        }
                                        if (!selectedGivePackIds.includes(x.id) && !x.uri.grade) {
                                            setGiveSelectedPackIds([...selectedGivePackIds].concat(x.id));
                                        }
                                    }
                                }}>
                                    {/*<div style={{color: 'white'}}>{giveSelectedNFTs.includes(x) + "III"}</div>*/}
                                    {x.uri.grade ?
                                        <NFT className={styles.card} item={x} key={index} isListing={isListing}
                                             account={account} userInfo={props.userInfo}/> :
                                        <Pack className={styles.card} item={x} key={index} isListing={isListing}
                                              account={account} userInfo={props.userInfo}/>}
                                </button>);
                            } else {
                                return (<button onClick={() => {
                                    if (!recSelectedNFTs.includes(x)) {
                                        setRecSelectedNFTs([...recSelectedNFTs].concat(x));
                                    }
                                    if (x.uri) {
                                        if (!selectedRecIds.includes(x.id) && x.uri.grade) {
                                            setRecSelectedIds([...selectedRecIds].concat(x.id));
                                        }
                                        if (!selectedRecPackIds.includes(x.id) && !x.uri.grade) {
                                            setRecSelectedPackIds([...selectedRecPackIds].concat(x.id));
                                        }
                                    }
                                }}>
                                    {/*<div style={{color: 'white'}}>{recSelectedNFTs.includes(x) + "III"}</div>*/}
                                    {/*<div style={{color: 'white'}}>{JSON.stringify(recSelectedNFTs)}</div>*/}
                                    {/*<div style={{color: 'white'}}>{JSON.stringify()}</div>*/}
                                    {x.uri.grade ?
                                        <NFT className={styles.card} item={x} key={index} isListing={isListing}
                                             account={account} userInfo={props.userInfo}/> :
                                        <Pack className={styles.card} item={x} key={index} isListing={isListing}
                                              account={account} userInfo={props.userInfo}/>}
                                </button>);
                            }
                        }
                    }
                })}
            </div>
            {!giveSelectedNFTs && !recSelectedNFTs && <Loader className={styles.loader} />}
        </div>
    );
};

export default Items;
