import React, {useState, useEffect} from "react";
import cn from "classnames";
import styles from "./Checkout.module.sass";
import Icon from "../../../../components/Icon";
import web3 from 'web3';
import LoaderCircle from "../../../../components/LoaderCircle";
import {buyNFTWithVEXT, buyNFTWithETH} from "../../../../smartContracts/ViridianExchangeMethods";
import Web3 from "web3";
import config from "../../../../local-dev-config";
import veJSON from "../../../../abis/ViridianExchange.json";


const Checkout = (props, { className }) => {
    const [purchasing, setPurchasing] = useState(false);
    const [purchased, setPurchased] = useState(false);
    const [eventData, setEventData] = useState({});

    let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/c2ccaf282d324e8983bcb0c6ffaa05a6") || "HTTP://127.0.0.1:7545");

    useEffect(async () => {

        //alert("EVENT DATA" + JSON.stringify(eventData));

        if (eventData[0]) {
            setPurchased(true);
            setPurchasing(false);
        }



    }, [eventData])

    const items = [
        {
            title: props.price,
            value: "USDT",
        },
        {
            title: "Your balance",
            value: "8.498 VEXT",
        },
        {
            title: "Service fee",
            value: "0 VEXT",
        },
        {
            title: "You will pay",
            value: props.price + " VEXT",
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
        {purchasing &&
      <div className={styles.line}>
        <div className={styles.icon}>
          <LoaderCircle className={styles.loader} />
        </div>
        <div className={styles.details}>
          <div className={styles.subtitle}>Purchasing</div>
          <div className={styles.text}>
            Please confirm the necessary transactions through MetaMask
          </div>
        </div>
      </div> }

        {purchased &&
        <div className={styles.line}>
            {/*<div className={styles.icon}>*/}
            {/*    <LoaderCircle className={styles.loader} />*/}
            {/*</div>*/}
            <div className={styles.details}>
                <Icon name="check" size="18" fill={"#BF9A36"} />
                <div className={styles.subtitle}>Purchase Successful!</div>
                <div className={styles.text}>
                    Refresh your inventory to view your new items
                </div>
            </div>
        </div> }
      {/*<div className={styles.attention}>*/}
      {/*  <div className={styles.preview}>*/}
      {/*    <Icon name="info-circle" size="32" />*/}
      {/*  </div>*/}
      {/*  <div className={styles.details}>*/}
      {/*    <div className={styles.subtitle}>This creator is not verified</div>*/}
      {/*    <div className={styles.text}>Purchase this item at your own risk</div>*/}
      {/*  </div>*/}
      {/*  <div className={styles.avatar}>*/}
      {/*    <img src="/images/content/avatar-3.jpg" alt="Avatar" />*/}
      {/*  </div>*/}
      {/*</div>*/}
        {!purchased && !purchasing && <div className={styles.btns}>
          {/*{JSON.stringify(props)}*/}
           <button className={cn("button", styles.button)} onClick={async () => {
               const veContractAddress = config.ropsten_contract_addresses.ve_contract;
               let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);

               await veABI.events.PurchasedListing({}).on('data', async function(event) {
                   setEventData(event.returnValues);
                   // Do something here
               }).on('err', console.error);
            setPurchasing(true);

            if (props.isETH) {
                //alert("buying nft with eth")
                await buyNFTWithETH(props.account, props.tokenId, props.price).then((e) => {
                    //alert("E: " + JSON.stringify(e));
                });
            }
            else {
                await buyNFTWithVEXT(props.account, props.tokenId, props.price).then((e) => {
                    //alert("E: " + JSON.stringify(e));
                });
            }
        }}>
          I understand, continue
        </button>
        <button className={cn("button-stroke", styles.button)}>Cancel</button>
      </div>}
    </div>
  );
};

export default Checkout;
