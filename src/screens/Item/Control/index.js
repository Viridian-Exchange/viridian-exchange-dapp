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
import OpenPack from "./OpenPack"
import {parseVextAmount} from "../../../Utils";
import { useLocation, useHistory } from "react-router-dom";

const Control = (props, { className }) => {
  const [visibleModalPurchase, setVisibleModalPurchase] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [visibleModalAccept, setVisibleModalAccept] = useState(false);
  const [visibleModalSale, setVisibleModalSale] = useState(false);
    const [visibleModalPackOpen, setVisibleModalPackOpen] = useState(false);
  //const [currentUser, setCurrentUser] = useState(false);
  const [isListing, setIsListing] = useState(false);
  const [offers, setOffers] = useState([]);
  const [purchased, setPurchased] = useState(false);

  const history = useHistory();

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
        else {
            return <div>{JSON.stringify(props.isListing)}</div>
        }
    }

    function putOnSaleButton() {
        if ((props.owner.toLowerCase() === props.account.toLowerCase()) && !props.isListing) {
            if (props.isPack) {
                return (
                    <div className={styles.btns}>
                        <button
                            className={cn("button", styles.button)}
                            onClick={() => setVisibleModalSale(true)}
                        >
                            Put on sale
                        </button>


                        <button
                            className={cn("button", styles.button)}
                            onClick={() => setVisibleModalPackOpen(true)}
                        >
                            Open pack
                        </button>
                    </div>
                );
            }
        else {
                return (
                    <div className={styles.btns}>
                        <button
                            className={cn("button", styles.button)}
                            onClick={() => setVisibleModalSale(true)}
                            style={{minWidth: '100%'}}
                        >
                            Put on sale
                        </button>
                    </div>
                );
        }
        }
    }

  return (
    <>
        {!((props.owner.toLowerCase() === props.account.toLowerCase()) && props.isListing) && <div style={{marginTop: '2ex'}} className={cn(styles.control, className)}>
        <div className={styles.head}>
          {/*<div className={styles.avatar}>*/}
          {/*  <img src="/images/content/avatar-4.jpg" alt="Avatar" />*/}
          {/*</div>*/}
          {/*<div className={styles.details}>*/}
          {/*  <div className={styles.info}>*/}
          {/*    Highest bid by <span>Kohaku Tora</span>*/}
          {/*  </div>*/}
          {/*    {JSON.stringify(props.isVNFT)}*/}
          {/*  <div className={styles.cost}>*/}
          {/*    <div className={styles.price}>1.46 ETH</div>*/}
          {/*    <div className={styles.price}>$2,764.89</div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
          {/*{JSON.stringify(props.isListing)}*/}
          {buyButtons()}
          {/*{offerButtons()}*/}
          {props.price && <div className={styles.text}>
          {/*Service fee <span className={styles.percent}>1.5%</span>{" "}*/}
          {/*<span>{parseVextAmount(props.price) * .015} VEXT</span> <span>${Number.parseInt(parseVextAmount(props.price)) * .2 * .015}</span>*/}
        </div>}
          {putOnSaleButton()}
        <div className={styles.note}>
          You can sell this token on Viridian Exchange
        </div>
      </div>}
      <Modal
        visible={visibleModalPurchase}
        onClose={() => setVisibleModalPurchase(false)}
      >
        <Checkout setSuccess={props.setSuccess} setError={props.setError} price={props.price} account={props.account} tokenId={props.state.listingId} isETH={props.isETH} />
          {purchased &&
              <SuccessfullyPurchased/>
          }
      </Modal>
        <Modal
            visible={visibleModalPackOpen}
            onClose={() => {
                setVisibleModalPackOpen(false);
                history.push('/profile/' + props.account);
            }
            }
        >
            <OpenPack setSuccess={props.setSuccess} setError={props.setError} account={props.account} packId={props.state.id} />
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
        <PutSale setSuccess={props.setSuccess} setError={props.setError} account={props.account} state={props.state} price={props.price} isPack={props.isPack} isVNFT={props.isVNFT} />
      </Modal>
    </>
  );
}

export default Control;
