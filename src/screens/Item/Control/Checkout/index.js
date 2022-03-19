import React, {useState, useEffect} from "react";
import cn from "classnames";
import styles from "./Checkout.module.sass";
import Icon from "../../../../components/Icon";
import web3 from 'web3';
import LoaderCircle from "../../../../components/LoaderCircle";
import {buyNFTWithERC20, buyNFTWithETH} from "../../../../smartContracts/ViridianExchangeMethods";
import {approve, allowance} from "../../../../smartContracts/ViridianTokenMethods";
import Web3 from "web3";
import config from "../../../../local-dev-config";
import veJSON from "../../../../abis/ViridianExchange.json";
import vtJSON from "../../../../abis/MetaTransactionTokenABI.json";
import {getWeb3Socket, parseAmountToVext, parseVextAmount} from "../../../../Utils";


const Checkout = (props, { className }) => {
    const [purchasing, setPurchasing] = useState(false);
    const [purchased, setPurchased] = useState(false);
    const [approving, setApproving] = useState(false);
    const [tokenApproved, setTokenApproved] = useState(false);
    const [eventData, setEventData] = useState({});

    let web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");

    useEffect(async () => {

        //alert("EVENT DATA" + JSON.stringify(eventData));

        if (eventData[0]) {
            setPurchased(true);
            setPurchasing(false);
        }

        if (await allowance(props.account, '0xE88F4ae472687ce2026eb2d587C5C0c42a5F2047') > 0) {
            setTokenApproved(true);
        }

    }, [eventData])

    const items = [
        // {
        //     title: "SDTPrice",
        //     value: parseVextAmount(props.price) + " ETH",
        // },
        // {
        //     title: "Your balance",
        //     value: "0 ETH",
        // },
        {
            title: "Service fee",
            value: "5%"
            //value: parseVextAmount(props.price) * 0.05 + " ETH",
        },
        {
            title: "You will pay",
            value:  parseFloat(parseVextAmount(props.price)) + " ETH",
        },
    ];


    return (
        <div className={cn(className, styles.checkout)}>
            <div className={cn("h4", styles.title)}>Checkout</div>
            <div className={styles.info}>
                You are about to purchase a <strong>Viridian NFT</strong>
            </div>
            <div className={styles.table} style={{marginBottom: '2ex'}}>
                {items.map((x, index) => (
                    <div className={styles.row} key={index}>
                        <div className={styles.col}>{x.title}</div>
                        <div className={styles.col}>{x.value}</div>
                    </div>
                ))}
            </div>
            {/*<div className={styles.attention}>*/}
            {/*  <div className={styles.preview}>*/}
            {/*    <Icon name="info-circle" size="32" />*/}
            {/*  </div>*/}
            {/*  <div className={styles.details}>*/}
            {/*    <div className={styles.subtitle}>Make sure you have enough crypto to pay gas</div>*/}
            {/*    <div className={styles.text}></div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className={cn("h4", styles.title)}>Follow steps</div>*/}
            {approving && !purchasing && !purchased && !tokenApproved &&
            <div className={styles.line}>
                <div className={styles.icon}>
                    <LoaderCircle className={styles.loader}/>
                </div>
                <div className={styles.details}>
                    <div className={styles.subtitle}>Approving</div>
                    <div className={styles.text}>
                        Please confirm the necessary transactions through MetaMask
                    </div>
                </div>
            </div>}

            {purchasing &&
            <div className={styles.line}>
                <div className={styles.icon}>
                    <LoaderCircle className={styles.loader}/>
                </div>
                <div className={styles.details}>
                    <div className={styles.subtitle}>Purchasing</div>
                    <div className={styles.text}>
                        Please confirm the necessary transactions through MetaMask
                    </div>
                </div>
            </div>}

            {purchased &&
            <div className={styles.line}>
                {/*<div className={styles.icon}>*/}
                {/*    <LoaderCircle className={styles.loader} />*/}
                {/*</div>*/}
                <div className={styles.details}>
                    <Icon name="check" size="18" fill={"#BF9A36"}/>
                    <div className={styles.subtitle}>Purchase Successful!</div>
                    <div className={styles.text}>
                        Refresh your inventory to view your new items
                    </div>
                </div>
            </div>}


            {!purchased && !purchasing && <div className={styles.btns}>
                {/*{JSON.stringify(props)}*/}
                {tokenApproved && <button disabled className={cn("buttonFaded", styles.buttonFaded)}>
                    Approve Currency
                </button>}

                {!tokenApproved && <button className={cn("button-stroke", styles.button)} onClick={async () => {
                    const web3Socket = await getWeb3Socket(web3);
                    const veContractAddress = config.mumbai_contract_addresses.ve_contract;
                    let veABI = new web3Socket.eth.Contract(veJSON['abi'], veContractAddress);
                    let vtABI = new web3Socket.eth.Contract(vtJSON, config.mumbai_contract_addresses.ve_contract);

                    await vtABI.events.Approval({filter: {from: props.account}}).on('data', async function (event) {
                        setTokenApproved(true);
                        // Do something here
                    }).on('err', console.error);
                    setApproving(true);

                    // if (props.isETH) {
                    //     //alert("buying nft with eth")
                    //     await buyNFTWithETH(props.account, props.tokenId, props.price).then((e) => {
                    //         //alert("E: " + JSON.stringify(e));
                    //     });
                    // }
                    // else {
                    if (!tokenApproved) {
                        //TODO change the exchangeaddress BACK to config.mumbai_contract_addresses.ve_contract
                        await approve(props.account, '0xE88F4ae472687ce2026eb2d587C5C0c42a5F2047', props.price)
                            .then(() =>
                                setTokenApproved(true));
                    }
                    // }
                }}>
                    Approve Currency
                </button>}


                {!tokenApproved && <button disabled className={cn("buttonFaded", styles.buttonFaded)}>
                    Sign Final Purchase
                </button>}
                {tokenApproved && <button className={cn("button", styles.button)} onClick={async () => {
                    const web3Socket = await getWeb3Socket(web3);
                    const veContractAddress = config.mumbai_contract_addresses.ve_contract;
                    let veABI = new web3Socket.eth.Contract(veJSON['abi'], veContractAddress);

                    await veABI.events.PurchasedListing({filter: {to: props.account}}).on('data', async function (event) {
                        setEventData(event.returnValues);
                        // Do something here
                    }).on('err', console.error);
                    setPurchasing(true);

                    // if (props.isETH) {
                    //     //alert("buying nft with eth")
                    //     await buyNFTWithETH(props.account, props.tokenId, props.price).then((e) => {
                    //         //alert("E: " + JSON.stringify(e));
                    //     });
                    // }
                    // else {
                    if (tokenApproved && !purchased) {
                        await buyNFTWithERC20(props.account, props.tokenId, props.price).then((e) => {
                            //alert("E: " + JSON.stringify(e));
                        });
                    }
                    // }
                }}>
                    Sign Final Purchase
                </button>}
                {/*<button className={cn("button-stroke", styles.button)}>Cancel</button>*/}
            </div>}
        </div>
    );
}

export default Checkout;
