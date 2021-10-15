import React, { useState } from "react";
import cn from "classnames";
import styles from "./Control.module.sass";
import Checkout from "./Checkout";
import Connect from "../../../components/Connect";
import Bid from "../../../components/Bid";
import Accept from "./Accept";
import PutSale from "./PutSale";
import SuccessfullyPurchased from "./SuccessfullyPurchased";
import Modal from "../../../components/Modal";
import { acceptOfferWithVEXT, acceptOfferWithETH, finalApprovalWithETH } from "../../../smartContracts/ViridianExchangeMethods";
import web3 from 'web3';

const Control = (props, { className }) => {
  const [visibleModalPurchase, setVisibleModalPurchase] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [visibleModalAccept, setVisibleModalAccept] = useState(false);
  const [visibleModalSale, setVisibleModalSale] = useState(false);
  //const [currentUser, setCurrentUser] = useState(false);
  const [isListing, setIsListing] = useState(false);
  const [offers, setOffers] = useState([]);
  const [purchased, setPurchased] = useState(false);

  function offerButtons() {
    //if ((props.owner.toLowerCase() === props.account.toLowerCase()) {
      return (
          <div className={styles.btns}>
              {/*<button className={cn("button-stroke", styles.button)}>*/}
              {/*    View all*/}
              {/*</button>*/}
              <button
                  className={cn("button", styles.button)}
                  onClick={async () => {//setVisibleModalAccept(true)
                      if (props.isETH) {
                          //alert(props.toVEXT)
                          if (props.toAccepted && !props.fromAccepted) {
                              await finalApprovalWithETH(props.account, props.offerId, props.fromVEXT);
                          }
                          else {
                              await acceptOfferWithETH(props.account, props.offerId, props.toVEXT);
                          }
                      }
                      else {
                          await acceptOfferWithVEXT(props.account, props.offerId, props.toVEXT);
                      }
                  }}
              >
                  Accept
              </button>
          </div>);
    //}
  }

    function buyButtons() {
        if ((props.owner.toLowerCase() !== props.account.toLowerCase()) && props.isListing) {
            return (
                <div className={styles.btns}>
                    <button
                        className={cn("button", styles.button)}
                        onClick={() => setVisibleModalPurchase(true)}
                    >
                        Purchase now
                    </button>
                    <button
                        className={cn("button-stroke", styles.button)}
                        onClick={() => setVisibleModalBid(true)}
                    >
                        Place a bid
                    </button>
                </div>);
        }
    }

    function putOnSaleButton() {
        if ((props.owner.toLowerCase() === props.account.toLowerCase()) && !props.isListing) {
            return (
                <div className={styles.foot}>
                    <button
                        className={cn("button", styles.button)}
                        onClick={() => setVisibleModalSale(true)}
                    >
                        Put on sale
                    </button>
                </div>
            );
        }
    }

  return (
    <>
      <div className={cn(styles.control, className)}>
        <div className={styles.head}>
          {/*<div className={styles.avatar}>*/}
          {/*  <img src="/images/content/avatar-4.jpg" alt="Avatar" />*/}
          {/*</div>*/}
          <div className={styles.details}>
              {/*{JSON.stringify(props)}*/}
              {(props.isETH && props.toAccepted && !props.fromAccepted) ? <div className={styles.info}>
              Approve accepted offer
            </div> : <div className={styles.info}>
                  Accept offer
              </div>}
            <div className={styles.cost}>
                {props.isETH ? [<div className={styles.price}>{web3.utils.fromWei(props.fromVEXT)} ETH</div>,
              <div className={styles.price}>{web3.utils.fromWei(props.toVEXT)} ETH</div>] : [<div className={styles.price}>{props.fromVEXT} USDT</div>,
                        <div className={styles.price}>{props.toVEXT} USDT</div>]}
            </div>
              <div className={styles.cost}>
              <div className={styles.price}>{props.fromNFTs.length} NFTS</div>
              <div className={styles.price}>{props.toNFTs.length} NFTS</div>
              </div>
          </div>
        </div>
          {/*{"OID: " + JSON.stringify(props.offerId)}*/}
          {offerButtons()}
        {/*<div className={styles.text}>*/}
        {/*  Service fee <span className={styles.percent}>1.5%</span>{" "}*/}
        {/*  <span>2.563 ETH</span> <span>$4,540.62</span>*/}
        {/*</div>*/}
        {/*<div className={styles.note}>*/}
        {/*  You can sell this token on Viridian Exchange*/}
        {/*</div>*/}
      </div>
      <Modal
        visible={visibleModalPurchase}
        onClose={() => setVisibleModalPurchase(false)}
      >
        <Checkout price={props.price} account={props.account} />
          {purchased &&
              <SuccessfullyPurchased/>
          }
      </Modal>
      <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
      >
        <Connect />
        <Bid />
      </Modal>
      <Modal
        visible={visibleModalAccept}
        onClose={() => setVisibleModalAccept(false)}
      >
        <Accept />
      </Modal>
      <Modal
        visible={visibleModalSale}
        onClose={() => setVisibleModalSale(false)}
      >
        <PutSale account={props.account} state={props.state} price={props.price} />
      </Modal>
    </>
  );
};

export default Control;
