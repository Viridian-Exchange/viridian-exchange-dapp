import React, { useState, useEffect } from "react";
import Web3 from "web3";
import styles from "./PutSale.module.sass";
import Image from "../../../../components/Image";
import ReactFloaterJs from 'react-floaterjs';
import Particles from 'react-particles-js';
import Loader from "../../../../components/Loader";
import cn from "classnames";
import {Link} from "react-router-dom";
import Reveal from 'react-reveal/Reveal';
import {openPack} from "../../../../smartContracts/ViridianPackMethods";
import config from "../../../../local-dev-config";
import vNFTJSON from "../../../../abis/ViridianPack.json";

let web3 = new Web3( new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/c2ccaf282d324e8983bcb0c6ffaa05a6") || "HTTP://127.0.0.1:7545");

const OpenPack = (props, { className }) => {
    const [opened, setOpened] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);
    const [revealing, setRevealing] = useState(false);
    const [cards, setCards] = useState([]);
    const [images, setImages] = useState([]);
    const [getEvents, setGetEvents] = useState(false);
    let imgCopy = [];

    //const cards = ["https://viridian-images.s3.us-east-2.amazonaws.com/CD013.png", "https://viridian-images.s3.us-east-2.amazonaws.com/CD111.png", "https://viridian-images.s3.us-east-2.amazonaws.com/CD12.png"]

    useEffect(async () => {
        if (images !== []) {
            if (getEvents && openLoading) {
                const vpContractAddress = config.ropsten_contract_addresses.vp_contract;
                let vpABI = new web3.eth.Contract(vNFTJSON['abi'], vpContractAddress);

                await vpABI.events.Open({filter: {to: props.account}}).on('data', async function (event) {
                    if (event) {
                        if (event) {
                            //alert("RETVALS: ")
                            //alert(JSON.stringify(events[0].returnValues["0"]));
                            //alert(JSON.stringify(events[0]));
                            //alert(events[0].returnValues["0"]);

                            let cardCopy = []

                            for (let i = 0; i < 3; i++) {
                                cardCopy.push(await event.returnValues["0"][i]);
                            }

                            //alert(cardCopy);

                            setCards(cardCopy);

                            // if (event.returnValues["0"]) {
                            //     //setRevealing(true);
                            //     setGetEvents(false);
                            // }
                        }
                    }
                    //else {
                    //setGetEvents(true);
                    //}
                });

                if (cards !== []) {
                    //console.log(cards);
                    //alert("HI")
                    //alert("CARDS: " + JSON.stringify(cards));
                    if (imgCopy.length !== 3) {
                        await cards.map(async (card, index) => {
                            await fetch(card, {
                                mode: "cors",
                                method: "GET"
                            }).then(async res => {
                                const resJson = await res.json();

                                //alert("THING BEING PUSHED: " + resJson.image);

                                imgCopy.push(await resJson.image);

                                //alert("IMGCOPY: " + JSON.stringify(imgCopy))

                                if (imgCopy.length === 3) {
                                    await setImages(imgCopy)
                                }

                                //alert("Image copy: " + JSON.stringify(imgCopy));
                                //alert("Images: " + JSON.stringify(images));
                            });
                        })
                    }

                    //alert("Image copy: " + JSON.stringify(imgCopy));

                    //setImages(imgCopy);

                    //alert("Images: " + JSON.stringify(images));

                    //setGetEvents(true);
                }
            }
        }
    }, [getEvents, revealing, cards]);

    if (revealing) {
        // setTimeout(() => {
        //   setFade(true);
        // }, 1500);
        //
        // if (fade) {
        if (images) {
            return (
                <Reveal>
                    {/*{"IMGS: " + JSON.stringify(images)}*/}
                    <div className={styles.list} style={{marginTop: '5ex', marginLeft: '10%'}}>
                        {images.map((image, index) => {
                            return (
                                <div className={styles.card} style={{marginLeft: '5ex', marginRight: '5ex'}}>
                                    <img src={image} alt='NFT' style={{maxWidth: '40ex'}}/>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>
            );
        }
        else {
            return ( <div style={{transform: 'translateX(50%)'}}>
                NO IMAGES
                {/*{JSON.stringify(images)}*/}
            </div>);
        }
        // }
        // else {
        //     return (<div/>);
        // }

    }
    else if (!opened) {
        return (
            <div>
                <ReactFloaterJs>
                    <div onClick={async () => {
                        //setOpened(true);
                        // setOpenLoading(true);
                        // setGetEvents(true);
                        await openPack(props.packId, props.account, setRevealing, setCards).then(async () =>
                        {setOpened(true);
                            setOpenLoading(true);
                            setGetEvents(true);}).then(async () => {
                            setTimeout(() => {
                                //alert("revealing");
                                setRevealing(true);
                            }, 10000);

                                //await setRevealing(true);
                        }
                        );



                        //setOpenLoading(true);
                        //setCards(await openPack(props.packId, props.account, setRevealing, setCards));
                        //setGetEvents(true);
                        //setRevealing(true);
                        //setOpenLoading(true);
                    }} style={{cursor: 'pointer'}} style={{maxWidth: '30%',
                        marginLeft: '35%'}}>
                        <img src="/images/gift.svg" alt="open pack"/>
                        <h1 className={cn("h3", styles.title)}> Open Pack</h1>
                    </div>
                </ReactFloaterJs>
                {/*<Particles params={{*/}
                {/*    particles: {*/}
                {/*        number: {*/}
                {/*            value: 50,*/}
                {/*        },*/}
                {/*    },*/}
                {/*}}/>*/}
            </div>
        )
    }
    // else if (opened && openLoading) {
    //     setOpenLoading(false);
    //     setTimeout(() => {
    //         setOpenLoading(false);
    //     }, 1000);
    //
    //     return (
    //         <div style={{transform: 'translateX(50%)'}}>
    //             <Loader/>
    //         </div>
    //     );
    // }
    else if (opened && !revealing) {
        return (
            <video autoPlay muted style={{maxWidth: '50ex', cursor: 'pointer', marginLeft: '35%'}}>
                <source src='https://viridian-images.s3.us-east-2.amazonaws.com/OPEN+BAG+GOLD.mp4' type="video/mp4"/>
            </video>
        );
    }

}

export default OpenPack;
