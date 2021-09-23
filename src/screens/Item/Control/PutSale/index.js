import React, { useState } from "react";
import cn from "classnames";
import styles from "./PutSale.module.sass";
import Icon from "../../../../components/Icon";
import Switch from "../../../../components/Switch";
import veJSON from "../../../../abis/ViridianExchange.json";
import TextInput from "../../../../components/TextInput";
import Web3 from "web3";
import config from "../../../../local-dev-config";
import {putUpForSale, putPackUpForSale} from "../../../../smartContracts/ViridianExchangeMethods";
import Loader from "../../../../components/Loader";
import {parseAmountToVext} from "../../../../Utils";

let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

const items = [
  {
    title: "Enter your price",
    value: "VEXT",
  },
  {
    title: "Service fee",
    value: "1.5%",
  },
  {
    title: "Total bid amount",
    value: "0 ETH",
  },
];

const PutSale = (props, { className }) => {
  const [price, setPrice] = useState(false);
  const [saleLoading, setSaleLoading] = useState(false);

  function handlePriceChance(event) {
      setPrice(event.target.value);
  }

  return (
    <div className={cn(className, styles.sale)}>
        {/*{parseAmountToVext(price)}*/}
      <div className={cn("h4", styles.title)}>Put on sale</div>
      <div className={styles.line}>
        <div className={styles.icon}>
          <Icon name="coin" size="24" />
        </div>
        <div className={styles.details}>
          <div className={styles.info}>Instant sale price</div>
          <div className={styles.text}>
            Enter the price for which the item will be instanly sold
          </div>
        </div>
        <Switch className={styles.switch} value={price} setValue={setPrice} />
      </div>
      <div className={styles.table}>
        {items.map((x, index) => {
            if (index === 0 && price) {
                return (
                    <div className={styles.row} key={index}>
                        <div className={styles.col}>{x.title}</div>
                        <TextInput placeholder={"VEXT"} onChange={handlePriceChance} className={styles.col}/>
                    </div>
                );
            }
            else {
                return (
                    <div className={styles.row} key={index}>
                        <div className={styles.col}>{x.title}</div>
                        <div className={styles.col}>{x.value}</div>
                    </div>
                );
            }
        })}
      </div>
      <div className={styles.btns}>
          {props.account}
          {JSON.stringify(props.state)}
        <button className={cn("button", styles.button)} onClick = {async () => {
            //alert(price);
            await setSaleLoading(true);

            if (!props.isPack) {
                await putUpForSale(props.account, props.state.id, parseAmountToVext(price), 0, 0).then((e) => {
                    alert("E: " + JSON.stringify(e));
                    setSaleLoading(false);
                });
            }
            else {
                await putPackUpForSale(props.account, props.state.id, parseAmountToVext(price), 0, 0).then((e) => {
                    alert("E: " + JSON.stringify(e));
                    setSaleLoading(false);
                });
            }
            }}>
            {!saleLoading && "Continue"} {saleLoading &&
            <Loader className={styles.loader} />} </button>
        <button className={cn("button-stroke", styles.button)}>Cancel</button>
      </div>
    </div>
  );
};

export default PutSale;
