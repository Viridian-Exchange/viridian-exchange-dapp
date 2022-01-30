import React, { useState, useEffect } from "react";
import cn from "classnames";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./Discover/Discover.module.sass";
import {getTrackBackground, Range} from "react-range";
import Viridian1EPassJSON from "../../abis/Viridian1EPass.json"
import {getNumNFTs, mint} from "../../smartContracts/Viridian1EPassMethods"
import {useCryptoPrices} from "react-realtime-crypto-prices";

const Drops = (props) => {
    const [initialLoaded, setInitialLoaded] = useState(false);
    const [values, setValues] = useState([1]);
    const [minted, setMinted] = useState(0);
    const prices = useCryptoPrices(["eth"]);

    const STEP = 1;
    const MIN = 1;
    const MAX = 10;

    useEffect(async () => {
        setMinted(await getNumNFTs());
    }, []);

  return (
    <>
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container)}>
                <p2 style={{color: 'grey'}}>Recieve a card-backed nft from the 1st edition Pokemon booster box break, along with platform perks!</p2>
                <h3 className={cn("h3", styles.title)}>Mint Viridian 1st Edition Pass</h3>
                <div style={{textAlign: 'center'}}>
                    <video autoPlay loop muted playsInline style={{maxWidth: '75ex', borderRadius: '25px'}}>
                        <source src='https://d4xub33rt3s5u.cloudfront.net/passVidGoodLoop.mp4' type="video/mp4"/>
                    </video>
                </div>
                <h2 style={{marginTop: '2ex', textAlign: 'center'}}>
                    Number to Mint
                </h2>
                <Range
                    values={values}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={(values) => {setValues(values);}}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "36px",
                                display: "flex",
                                width: "100%",
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "8px",
                                    width: "100%",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                        values,
                                        colors: ["#3772FF", "#E6E8EC"],
                                        min: MIN,
                                        max: MAX,
                                    }),
                                    alignSelf: "center",
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "24px",
                                width: "24px",
                                borderRadius: "50%",
                                backgroundColor: "#3772FF",
                                border: "4px solid #FCFCFD",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: "-33px",
                                    color: "#fff",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    lineHeight: "18px",
                                    fontFamily: "Poppins",
                                    padding: "4px 8px",
                                    borderRadius: "8px",
                                    backgroundColor: "#141416",
                                }}
                            >
                                {values[0]}
                            </div>
                        </div>
                    )}
                />
                <h3 style={{marginBottom: '2ex', textAlign: 'center'}}>
                    <div className={styles.wallet}>
                        <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />
                        {values[0]}
                    </div>
                    {prices.eth && <p2 style={{color: 'grey'}}>
                        ${((values[0] * prices.eth) * 100) / 100}
                    </p2>}
                </h3>
                <div style={{textAlign: 'center', marginTop: '4ex'}}>
                    {/*{JSON.stringify(props)}*/}
                    <button
                        className={cn(styles.link, {
                            [styles.active]: true,
                        })}
                        onClick={async () => {await mint(props.account, values[0])}}
                    >
                        MINT 💎
                    </button>
                </div>
                <div style={{textAlign: 'center', marginTop: '3ex'}}>
                    <ProgressBar barContainerClassName="barContainer"
                                 completedClassName="barCompleted"
                                 labelClassName="barLabel"
                                 completed={40} customLabel={minted + "/396"} />
                </div>
            </div>
        </div>
    </>
  );
}

export default Drops;
