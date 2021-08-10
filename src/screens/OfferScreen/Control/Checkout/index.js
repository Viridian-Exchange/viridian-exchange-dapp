import {React, useState} from "react";
import cn from "classnames";
import styles from "./Checkout.module.sass";
import Icon from "../../../../components/Icon";
import LoaderCircle from "../../../../components/LoaderCircle";
import {buyNFTWithVEXT} from "../../../../smartContracts/ViridianExchangeMethods";


const Checkout = (props, { className }) => {
    const [purchasing, setPurchasing] = useState(false);

    const items = [
        {
            title: props.price,
            value: "VEXT",
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
        You are about to purchase a <strong>Viridian NFT</strong> from{" "}
        <strong>UI8</strong>
      </div>
      <div className={styles.table}>
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
            Sending transaction with your wallet
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
      <div className={styles.btns}>
          {/*{JSON.stringify(props)}*/}
        <button className={cn("button", styles.button)} onClick={async () => await buyNFTWithVEXT(props.account, props.tokenId, props.price)}>
          I understand, continue
        </button>
        <button className={cn("button-stroke", styles.button)}>Cancel</button>
      </div>
    </div>
  );
};

export default Checkout;
