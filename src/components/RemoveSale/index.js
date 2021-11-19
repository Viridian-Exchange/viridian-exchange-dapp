import React, {useState, useEffect} from "react";
import cn from "classnames";
import styles from "./RemoveSale.module.sass";
import {pullFromSale} from "../../smartContracts/ViridianExchangeMethods";
import config from "../../local-dev-config";
import veJSON from "../../abis/ViridianExchange.json";
import Web3 from "web3";
import styles1 from "../../screens/Item/Control/Checkout/Checkout.module.sass";
import LoaderCircle from "../LoaderCircle";
import Icon from "../Icon";
import {getWeb3Socket} from "../../Utils";

let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/c2ccaf282d324e8983bcb0c6ffaa05a6") || "HTTP://127.0.0.1:7545");

const RemoveSale = ({ className, id, account, price, isETH }) => {

    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [eventData, setEventData] = useState({});

    useEffect(async () => {

        //alert("EVENT DATA" + JSON.stringify(eventData));

        if (eventData[0]) {
            setCancelled(true);
            setLoading(false);
        }



    }, [eventData])

  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn("h4", styles.title)}>Remove from sale</div>
      <div className={styles.text}>
        Do you really want to remove your item from sale? You can re-list it at anytime.
      </div>



          {/*{account}*/}
          {/*{"   " + id}*/}
          {/*{"   " + isETH}*/}
          {!cancelled && !loading && <div className={styles.btns}><button className={cn("button", styles.button)} onClick={async () => {
            const veContractAddress = config.mumbai_contract_addresses.ve_contract;
            const web3Socket = await getWeb3Socket(web3);
            let veABI = new web3Socket.eth.Contract(veJSON['abi'], veContractAddress);

              //let veABIw3 = new web3.eth.Contract(veJSON['abi'], veContractAddress);

            // await veABIw3.getPastEvents("allEvents", { fromBlock: 0, toBlock: 'latest'}).then(console.log);
            //   await veABI.getPastEvents("allEvents", { fromBlock: 0, toBlock: 'latest'}).then(console.log);

            await veABI.events.ItemUnlisted({filter: {to: account}}).on('data', async function(event) {
                setEventData(event.returnValues);
                // Do something here
                console.log("ITEM UNLISTED")
            }).on('err', console.error);

            //   await veABI.events.ItemUnlisted({
            //       fromBlock: 0,
            //   })
            //       .on("connected", function (x) {
            //           // do somethinng
            //           alert("conn")
            //           alert(JSON.stringify(x));
            //       })
            //       .on('data', function (x) {
            //           // do somethinng
            //           alert(JSON.stringify(x));
            //       })
            //       .on('error', function (x) {
            //           // do somethinng
            //           alert(JSON.stringify(x));
            //       });

            //   await veABI.getPastEvents('ItemUnlisted', {
            //       filter: {},
            //       fromBlock: 'latest',
            //       toBlock: 'latest'
            //   })
            //       .then(function(events){
            //           console.log(events);
            //           //setEventData(events[0].returnValues);
            //       })
            //       .catch(function(e) { throw new Error(e) })
            //alert(price);
            await setLoading(true);

            await pullFromSale(account, id, price, isETH)}}>Remove now</button>

        <button className={cn("button-stroke", styles.button)}>Cancel</button> </div>}
        {loading &&
        <div className={styles1.line}>
            <div className={styles1.icon}>
                <LoaderCircle className={styles1.loader} />
            </div>
            <div className={styles1.details}>
                <div className={styles1.subtitle}>Removing listing</div>
                <div className={styles1.text}>
                    Please confirm the necessary transactions through MetaMask
                </div>
            </div>
        </div> }

        {cancelled &&
        <div className={styles1.line}>
            {/*<div className={styles.icon}>*/}
            {/*    <LoaderCircle className={styles.loader} />*/}
            {/*</div>*/}
            <div className={styles1.details}>
                <Icon name="check" size="18" fill={"#BF9A36"} />
                <div className={styles1.subtitle}>Listing Removed Successfully!</div>
                <div className={styles1.text}>
                </div>
            </div>
        </div> }

    </div>
  );
};

export default RemoveSale;
