import React, { useState, useEffect } from "react";
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
import vNFTJSON from "../../../../abis/ViridianPack.json";
import {getWeb3Socket} from "../../../../Utils";

let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/c2ccaf282d324e8983bcb0c6ffaa05a6") || "HTTP://127.0.0.1:7545");

const items = [
  {
    title: "Enter your price",
    value: "USDT",
  },
  {
    title: "Service fee",
    value: "1.5%",
  },
];

const PutSale = (props, { className }) => {
  const [price, setPrice] = useState("0");
  const [isETH, setIsETH] = useState(true);
  const [saleLoading, setSaleLoading] = useState(false);
  const [listed, setListed] = useState(false);
  const [getEvents, setGetEvents] = useState(false);
  const [eventData, setEventData] = useState({});

  function handlePriceChance(event) {
      setPrice(event.target.value);
  }

  function buttonOutput() {
      if (!saleLoading && !listed) {
          return "Card Listed Successfully!"
      }
      else if (!saleLoading && !listed) {
          return "Continue"

      }
      else {
          return <Loader className={styles.loader} />


      }
  }

    useEffect(async () => {

        //alert("EVENT DATA" + JSON.stringify(eventData));

        if (eventData[0]) {
            setListed(true);
            setSaleLoading(false);
        }



    }, [eventData])

  return (
    <div className={cn(className, styles.sale)}>
        {/*{parseAmountToVext(price)}*/}
      <div className={cn("h4", styles.title)}>Put on sale</div>
      <div className={styles.line}>
        <div className={styles.icon}>
          <Icon name="coin" size="24" />
        </div>
        <div className={styles.details}>
          <div className={styles.info}>Pick Crypto</div>
          <div className={styles.text}>
            Toggle whether you'd like the listing in ETH or USDT
          </div>
        </div>
        <Switch className={styles.switch} value={isETH} setValue={setIsETH} />
      </div>
      <div className={styles.table}>
        {items.map((x, index) => {
            if (index === 0) {
                if (isETH) {
                    return (
                        <div className={styles.row} key={index}>
                            <div className={styles.col}>{x.title}</div>
                            <TextInput placeholder={"ETH"} onChange={handlePriceChance} className={styles.col}/>
                        </div>
                    );
                }
                else {
                    return (
                        <div className={styles.row} key={index}>
                            <div className={styles.col}>{x.title}</div>
                            <TextInput placeholder={"USDT"} onChange={handlePriceChance} className={styles.col}/>
                        </div>
                    );
                }
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
          {/*{props.account}*/}
          {/*{JSON.stringify(props)}*/}
        <button className={cn("button", styles.button)} onClick = {async () => {
            const veContractAddress = config.ropsten_contract_addresses.ve_contract;
            const web3Socket = await getWeb3Socket(web3);
            let veABI = new web3Socket.eth.Contract(veJSON['abi'], veContractAddress);

            //console.log(veABI.events);
            await veABI.events.ItemListed({}).on('data', async function(event) {
                //alert("event fired 1");
                setEventData(event.returnValues);
                // Do something here
                //console.log("event fired");
            }).on('err', console.error);

            //let veABIw3 = new web3.eth.Contract(veJSON['abi'], veContractAddress);

            // await veABIw3.getPastEvents("allEvents", { fromBlock: 0, toBlock: 'latest'}).then(console.log);
            // await veABI.getPastEvents("allEvents", { fromBlock: 0, toBlock: 'latest'}).then(console.log);

            // await veABI.events.ItemListed({
            //     fromBlock: 0,
            // })
            //     .on("connected", function (x) {
            //         // do somethinng
            //         //alert("conn")
            //         console.log(JSON.stringify(x));
            //     })
            //     .on('data', function (x) {
            //         // do somethinng
            //         alert(JSON.stringify(x));
            //     })
            //     .on('error', function (x) {
            //         // do somethinng
            //         alert(JSON.stringify(x));
            //     });

            // //alert(price);
            await setSaleLoading(true);


            if (!props.isPack) {
                //alert("NFT Sale: " + props.state.id);
                if (isETH) {
                    await putUpForSale(props.account, props.state.id, price.toString(), 0, 0, false);
                    setSaleLoading(true);

                }
                else {
                    await putUpForSale(props.account, props.state.id, parseAmountToVext(price), 0, 0, true);
                    await setSaleLoading(true);
                }
            }
            else {
                //alert("Pack Sale: " + props.state.id);
                if (isETH) {
                    await putPackUpForSale(props.account, props.state.id, price.toString(), 0, 0, false).then((e) => {
                        //alert("E: " + JSON.stringify(e));
                        setSaleLoading(false);
                    });
                }
                else {
                    await putPackUpForSale(props.account, props.state.id, parseAmountToVext(price), 0, 0, true).then((e) => {
                        //alert("E: " + JSON.stringify(e));
                        setSaleLoading(false);
                    });
                }
            }
            }}>
            {!saleLoading && !listed && "Continue"} {saleLoading &&
            <Loader className={styles.loader} />} {listed &&
        "Listing Successful!" && <Icon name="check" size="18" fill={"#BF9A36"} />}</button>
          {!listed && <button className={cn("button-stroke", styles.button)}>Cancel</button>}
      </div>
    </div>
  );
};

export default PutSale;
