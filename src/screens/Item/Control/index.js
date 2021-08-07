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

const Control = (props, { className }) => {
  const [visibleModalPurchase, setVisibleModalPurchase] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [visibleModalAccept, setVisibleModalAccept] = useState(false);
  const [visibleModalSale, setVisibleModalSale] = useState(false);
  //const [currentUser, setCurrentUser] = useState(false);
  const [isListing, setIsListing] = useState(false);
  const [offers, setOffers] = useState([]);

  function offerButtons() {
    if ((props.owner.toLowerCase() === props.account.toLowerCase()) && props.isListing) {
      return (
          <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)}>
                  View all
              </button>
              <button
                  className={cn("button", styles.button)}
                  onClick={() => setVisibleModalAccept(true)}
              >
                  Accept
              </button>
          </div>);
    }
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
          <div className={styles.avatar}>
            <img src="/images/content/avatar-4.jpg" alt="Avatar" />
          </div>
          <div className={styles.details}>
            <div className={styles.info}>
              Highest bid by <span>Kohaku Tora</span>
            </div>
            <div className={styles.cost}>
              <div className={styles.price}>1.46 ETH</div>
              <div className={styles.price}>$2,764.89</div>
            </div>
          </div>
        </div>
          {/*{JSON.stringify(props.isListing)}*/}
          {buyButtons()}
          {offerButtons()}
        <div className={styles.text}>
          Service fee <span className={styles.percent}>1.5%</span>{" "}
          <span>2.563 ETH</span> <span>$4,540.62</span>
        </div>
          {putOnSaleButton()}
        <div className={styles.note}>
          You can sell this token on Viridian Exchange
        </div>
      </div>
      <Modal
        visible={visibleModalPurchase}
        onClose={() => setVisibleModalPurchase(false)}
      >
        <Checkout />
        <SuccessfullyPurchased />
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
        <PutSale state={props.state} />
      </Modal>
    </>
  );
};

export default Control;
