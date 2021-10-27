import React, { useEffect, useState } from "react";
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
import Web3 from "web3";
import config from "../../../local-dev-config";
import voJSON from "../../../abis/ViridianExchangeOffers.json";
import styles1 from "../../Item/Control/Checkout/Checkout.module.sass";
import LoaderCircle from "../../../components/LoaderCircle";
import Icon from "../../../components/Icon";
import {getWeb3Socket, parseVextAmount} from "../../../Utils";

const Control = (props, { className }) => {
  const [visibleModalPurchase, setVisibleModalPurchase] = useState(false);
  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [visibleModalAccept, setVisibleModalAccept] = useState(false);
  const [visibleModalSale, setVisibleModalSale] = useState(false);
  //const [currentUser, setCurrentUser] = useState(false);
  const [isListing, setIsListing] = useState(false);
  const [offers, setOffers] = useState([]);
  const [purchased, setPurchased] = useState(false);

  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [eventData, setEventData] = useState({});

  let web3 = new Web3( new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/c2ccaf282d324e8983bcb0c6ffaa05a6") || "HTTP://127.0.0.1:7545");

  useEffect(async () => {

        //alert("EVENT DATA" + JSON.stringify(eventData));

        if (eventData[0]) {
            setAccepted(true);
            setLoading(false);
        }



    }, [eventData])

  // function offerButtons() {
  //   //if ((props.owner.toLowerCase() === props.account.toLowerCase()) {
  //     return (
  //
  //         {!accepted && !loading && <div className={styles.btns}>
  //             {/*<button className={cn("button-stroke", styles.button)}>*/}
  //             {/*    View all*/}
  //             {/*</button>*/}
  //             <button
  //                 className={cn("button", styles.button)}
  //                 onClick={async () => {//setVisibleModalAccept(true)
  //                     if (props.isETH) {
  //                         //alert(props.toVEXT)
  //                         if (props.toAccepted && !props.fromAccepted) {
  //                             await finalApprovalWithETH(props.account, props.offerId, props.fromVEXT);
  //                         }
  //                         else {
  //                             await acceptOfferWithETH(props.account, props.offerId, props.toVEXT);
  //                         }
  //                     }
  //                     else {
  //                         await acceptOfferWithVEXT(props.account, props.offerId, props.toVEXT);
  //                     }
  //                 }}
  //             >
  //                 Accept
  //             </button>
  //         </div>}
  //
  //         );
  //   //}
  // }


    // NOT USED
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

    // NOT USED
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
              <div className={styles.price}>{web3.utils.fromWei(props.toVEXT)} ETH</div>] : [<div className={styles.price}>{parseVextAmount(props.fromVEXT)} USDT</div>,
                        <div className={styles.price}>{parseVextAmount(props.toVEXT)} USDT</div>]}
            </div>
              <div className={styles.cost}>
              <div className={styles.price}>{props.fromNFTs.length} NFTS</div>
              <div className={styles.price}>{props.toNFTs.length} NFTS</div>
              </div>
          </div>
        </div>
          {/*{"OID: " + JSON.stringify(props.offerId)}*/}
          {!accepted && !loading && <div className={styles.btns}>
              {/*<button className={cn("button-stroke", styles.button)}>*/}
              {/*    View all*/}
              {/*</button>*/}
              <button
                  className={cn("button", styles.button)}
                  onClick={async () => {//setVisibleModalAccept(true)
                      const web3Socket = await getWeb3Socket(web3);
                      const voContractAddress = config.ropsten_contract_addresses.vo_contract;
                      let voABI = new web3Socket.eth.Contract(voJSON['abi'], voContractAddress);

                      await voABI.events.AcceptedOffer({filter: {to: props.account}}).on('data', async function(event) {
                          setEventData(event.returnValues);
                          // Do something here
                      }).on('err', console.error);
                      //alert(price);
                      await setLoading(true);


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
          </div>}

          {loading &&
          <div className={styles1.line}>
              <div className={styles1.icon}>
                  <LoaderCircle className={styles1.loader} />
              </div>
              <div className={styles1.details}>
                  <div className={styles1.subtitle}>Accepting Offer</div>
                  <div className={styles1.text}>
                      Please confirm the necessary transactions through MetaMask
                  </div>
              </div>
          </div> }

          {accepted &&
          <div className={styles1.line}>
              {/*<div className={styles.icon}>*/}
              {/*    <LoaderCircle className={styles.loader} />*/}
              {/*</div>*/}
              <div className={styles1.details}>
                  <Icon name="check" size="18" fill={"#BF9A36"} />
                  <div className={styles1.subtitle}>Offer Accepted!</div>
                  <div className={styles1.text}>
                      Please wait while the other user confirms this offer.
                  </div>
              </div>
          </div> }


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
