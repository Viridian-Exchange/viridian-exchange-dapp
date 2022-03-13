import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import veJSON from "../../../abis/ViridianExchange.json";
import config from "../../../local-dev-config"
import styles from "./NotificationBell.module.sass";
import Icon from "../../Icon";
import {getWeb3Socket} from "../../../Utils";
import Web3 from "web3";
import Loader from "../../Loader";

const items = [
  {
    title: "ETH received",
    price: "0.08 ETH recived",
    date: "2 days ago",
    color: "#3772FF",
    image: "/images/content/notification-pic-1.jpg",
    url: "/activity",
  },
  {
    title: "C O I N Z",
    price: "New bid 0.2 ETH",
    date: "3 days ago",
    color: "#3772FF",
    image: "/images/content/notification-pic-2.jpg",
    url: "/activity",
  },
  {
    title: "ETH received",
    price: "0.08 ETH recived",
    date: "4 days ago",
    color: "#3772FF",
    image: "/images/content/notification-pic-3.jpg",
    url: "/activity",
  },
  {
    title: "ETH received",
    price: "0.08 ETH recived",
    date: "5 days ago",
    color: "#3772FF",
    image: "/images/content/notification-pic-4.jpg",
    url: "/activity",
  },
];

let web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");

const NotificationBell = ({ className, account}) => {
  const [visible, setVisible] = useState(false);
  const [eventsRaw, setEventsRaw] = useState([]);

  useEffect(async () => {

    //alert(account.substring(2))

    //let web3S = getWeb3Socket(web3);


    if (account && visible) {
      let veABI = new web3.eth.Contract(veJSON['abi'], config.mumbai_contract_addresses.ve_contract);

      await veABI.getPastEvents("allEvents", {fromBlock: 0, topics: []},
          async (errors, events) => {
            //console.log("getting past events")
            if (!errors) {
              //console.log(events);
              //console.log(JSON.stringify(events[1].returnValues.uri));
              //alert(events[0].returnValues["0"]);

              let eventsParsedRaw = [];

              await events.map(async (e, i) => {

                if (e.returnValues.uri) {
                  //console.log(e.returnValues.uri)

                  //alert(JSON.stringify(e));
                  await fetch(e.returnValues.uri, {
                    mode: "cors",
                    method: "GET"
                  }).then(async res => {
                    //alert(res.ok)
                    const resJson = await res.json();
                    //alert(JSON.stringify(res))
                    if (res.ok) {
                      await console.log(resJson);
                      eventsParsedRaw[i] = {...e};
                      eventsParsedRaw[i].returnValues.uri = resJson;
                    }
                  });
                }


              });

              if (eventsRaw.length === 0) {
                await setEventsRaw(eventsParsedRaw);
              }
            }
            else {
              //alert(JSON.stringify(errors));
            }
          })
    }

    if (!account) {
      let acct = account;
      account = acct;
    }

    // try {
    //   // check if the chain to connect to is installed
    //   let result = await window.ethereum.request({
    //     method: 'eth_getLogs',
    //     params: [
    //       {
    //         //"fromBlock": '21638735',
    //         //"toBlock": "latest",
    //         "address": "0x438adaD3D3894CE1f6Bb4896FB88e42c3B71eDDe",
    //         "topics": [
    //             "0x000000000000000000000000" + account.substring(2)
    //         ]
    //       }
    //     ], // chainId must be in hexadecimal numbers
    //   });
    //
    //   alert("RES: " + JSON.stringify(result));
    // } catch (error) {
    //   alert(JSON.stringify(error));
    //
    // }

  }, [account, visible]);

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.notification, className)}>
        <button
          className={cn(styles.head, styles.active)}
          onClick={() => {
            setVisible(!visible)

          }}
        >
          <Icon name="notification" size="24" />
        </button>
        {visible && (
          <div className={styles.body}>
            <div className={cn("h4", styles.title)}>Notification</div>
            {(eventsRaw.length === 0) && <div style={{textAlign: 'center', marginLeft: '1ex'}}>
              <Loader />
            </div>}
            <div className={styles.list}>
              {eventsRaw.map((x, index) => (
                <a
                  className={styles.item}
                  href={"https://mumbai.polygonscan.com/tx/" + x.transactionHash} //TODO: Remove the mumbai at the start once production site is launched
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setVisible(!visible)}
                  key={index}
                >
                  <div className={styles.preview}>
                    <img src={x.returnValues.uri.image} alt="Notification" />
                  </div>
                  <div className={styles.details}>
                    {x.event.toString() === 'ItemListed' &&<div style={{color: '#3772FF'}}>Listed</div>}
                    {x.event.toString() === 'ItemListed' && <div className={styles.subtitle}>{x.returnValues.uri.name}</div>}
                    {x.event.toString() === 'PurchasedListing' &&<div style={{color: '#3772FF'}}>Purchased</div>}
                    {x.event.toString() === 'PurchasedListing' && <div className={styles.subtitle}>{x.returnValues.uri.name}</div>}
                    <div className={styles.price}>{x.returnValues.listingId}</div>
                    <div className={styles.date}>{x.date}</div>
                  </div>
                  <div
                    className={styles.status}
                    style={{ backgroundColor: x.color }}
                  ></div>
                </a>
              ))}
            </div>
            {/*<Link*/}
            {/*  className={cn("button-small", styles.button)}*/}
            {/*  to="/activity"*/}
            {/*  onClick={() => setVisible(!visible)}*/}
            {/*>*/}
            {/*  See all*/}
            {/*</Link>*/}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default NotificationBell;
