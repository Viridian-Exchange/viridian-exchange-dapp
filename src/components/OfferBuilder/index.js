import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./UploadDetails.module.sass";
import styles1 from "../../screens/Item/Control/Checkout/Checkout.module.sass";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import Switch from "../../components/Switch";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import Preview from "./Preview";
import Cards from "./Cards";
import FolowSteps from "./FolowSteps";
import Items from "./SelectItems";
import Dropdown from "../Dropdown";
import Flexbox from 'flexbox-react';
import {makeOffer} from "../../smartContracts/ViridianExchangeMethods";
import {getWeb3Socket, parseAmountToVext} from "../../Utils";
import config from "../../local-dev-config";
import voJSON from "../../abis/ViridianExchangeOffers.json";
import Web3 from "web3";
import LoaderCircle from "../LoaderCircle";

const royaltiesOptions = ["10%", "20%", "30%"];

let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/c2ccaf282d324e8983bcb0c6ffaa05a6") || "HTTP://127.0.0.1:7545");

const items = [
  {
    title: "Create collection",
    color: "#4BC9F0",
  },
  {
    title: "Crypto Legend - Professor",
    color: "#45B26B",
  },
  {
    title: "Crypto Legend - Professor",
    color: "#EF466F",
  },
  {
    title: "Legend Photography",
    color: "#9757D7",
  },
];

const options = ["Your Inventory", "Their Inventory"];

const OfferBuilder = (props) => {
  //const [currentUserItemsVisible, setCurrentUserItemsVisible] = useState(true);
  const [option, setOption] = useState(options[0]);
  const [selectedRecNFTs, setRecSelectedNFTs] = useState([]);
  const [selectedGiveNFTs, setGiveSelectedNFTs] = useState([]);
  const [selectedRecIds, setRecSelectedIds] = useState([]);
  const [selectedGiveIds, setGiveSelectedIds] = useState([]);
  const [selectedRecPackIds, setRecSelectedPackIds] = useState([]);
  const [selectedGivePackIds, setGiveSelectedPackIds] = useState([]);
  const [giveAmount, setGiveAmount] = useState(0);
  const [recAmount, setRecAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({});
  const [offered, setOffered] = useState(false);

  useEffect(async () => {

    //alert("EVENT DATA" + JSON.stringify(eventData));

    if (eventData[0]) {
      setOffered(true);
      setLoading(false);
    }



  }, [eventData])

  const [isETH, setIsETH] = useState(true);



  return (
    <div>
      {/*{JSON.stringify(props)}*/}
      <Flexbox flexDirection="row">
        <Flexbox flexDirection="column">
          <div style={{marginBottom: "2ex"}}>
            <Dropdown
                className={styles.dropdown}
                value={option}
                setValue={setOption}
                options={options}
            />
          </div>
          <div className={styles.list}>
        {option === options[0] && <Items selectedGiveIds={selectedGiveIds} selectedRecIds={selectedRecIds} setGiveSelectedIds={setGiveSelectedIds} setRecSelectedIds={setRecSelectedIds} giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                                         recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs} give={true} selected={false} class={props.class} nfts={[].concat(props.nfts).concat(props.packs)} isListing={false} account={props.account} selectedRecPackIds={selectedRecPackIds}
                                         setRecSelectedPackIds={setRecSelectedPackIds} selectedGivePackIds={selectedGivePackIds} setGiveSelectedPackIds={setGiveSelectedPackIds}
                                         style={{marginTop: "20ex", marginBottom: "2ex"}}/>}
        {option === options[1] && <Items selectedGiveIds={selectedGiveIds} selectedRecIds={selectedRecIds} setGiveSelectedIds={setGiveSelectedIds} setRecSelectedIds={setRecSelectedIds} setRec giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                                         recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs} give={false} selected={false} class={props.class} nfts={[].concat(props.otherNFTs).concat(props.otherPacks)} isListing={false} account={props.account} selectedRecPackIds={selectedRecPackIds}
                                         setRecSelectedPackIds={setRecSelectedPackIds} selectedGivePackIds={selectedGivePackIds} setGiveSelectedPackIds={setGiveSelectedPackIds}
                                         style={{marginTop: "20ex", marginBottom: "2ex"}}/>}
          </div>
        </Flexbox>
        <Flexbox flexDirection="column" style={{marginLeft: '5ex', marginTop: '3ex'}}>
          <Switch className={styles.switch} value={isETH} setValue={setIsETH} />
          {isETH ? <TextInput
              style={{marginBottom: '2ex'}}
              onChange={(e) => {setGiveAmount(e.target.value);}}
              className={styles.field}
              label="They Receive"
              name="Twitter"
              type="text"
              placeholder="ETH Amount"
              required
          /> : <TextInput
              style={{marginBottom: '2ex'}}
              onChange={(e) => {setGiveAmount(e.target.value);}}
              className={styles.field}
              label="They Receive"
              name="Twitter"
              type="text"
              placeholder="USDT Amount"
              required
          />}
          {/*{JSON.stringify(selectedGiveIds)}*/}
          {/*{JSON.stringify(selectedGivePackIds)}*/}
          <Items selectedGiveIds={selectedGiveIds} selectedRecIds={selectedRecIds} setGiveSelectedIds={setGiveSelectedIds} setRecSelectedIds={setRecSelectedIds} class={props.class} nfts={selectedGiveNFTs} giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                 recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs} give={true} selected={true} isListing={false} account={props.curAccount} selectedRecPackIds={selectedRecPackIds}
                 setRecSelectedPackIds={setRecSelectedPackIds} selectedGivePackIds={selectedGivePackIds} setGiveSelectedPackIds={setGiveSelectedPackIds} />
          {isETH ? <TextInput
              style={{marginBottom: '2ex'}}
              onChange={(e) => setRecAmount(e.target.value)}
              className={styles.field}
              label="You Receive"
              name="Twitter"
              type="text"
              placeholder="ETH Amount"
              required
          /> : <TextInput
              style={{marginBottom: '2ex'}}
              onChange={(e) => setRecAmount(e.target.value)}
              className={styles.field}
              label="You Receive"
              name="Twitter"
              type="text"
              placeholder="USDT Amount"
              required
          />}
          {/*{JSON.stringify(selectedRecIds)}*/}
          {/*{JSON.stringify(selectedRecPackIds)}*/}
          <Items selectedGiveIds={selectedGiveIds} selectedRecIds={selectedRecIds} setGiveSelectedIds={setGiveSelectedIds} setRecSelectedIds={setRecSelectedIds} class={props.class} giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                 recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs}
                 nfts={selectedRecNFTs} give={false} isListing={false} selected={true} account={props.curAccount} selectedRecPackIds={selectedRecPackIds}
                 setRecSelectedPackIds={setRecSelectedPackIds} selectedGivePackIds={selectedGivePackIds} setGiveSelectedPackIds={setGiveSelectedPackIds} />
        </Flexbox>
      </Flexbox>
      <div className={styles.btns}>
        {!offered && !loading && <button className={cn("button", styles.button)} onClick={async () => {
          const web3Socket = await getWeb3Socket(web3);
          const voContractAddress = config.ropsten_contract_addresses.vo_contract;
          let voABI = new web3Socket.eth.Contract(voJSON['abi'], voContractAddress);

          await voABI.events.CreatedOffer({}).on('data', async function(event) {
            setEventData(event.returnValues);
            // Do something here
          }).on('err', console.error);
          //alert(price);
          await setLoading(true);

            if (isETH) {
                await makeOffer(props.account, props.to, selectedGiveIds, selectedGivePackIds, giveAmount.toString(), selectedRecIds, selectedRecPackIds, recAmount.toString(), false, 7);
            }
            else {
                await makeOffer(props.account, props.to, selectedGiveIds, selectedGivePackIds, parseAmountToVext(giveAmount), selectedRecIds, selectedRecPackIds, parseAmountToVext(recAmount), true, 7);
            }
        }
        }> Send Offer </button>}

        {loading &&
        <div className={styles1.line}>
          <div className={styles1.icon}>
            <LoaderCircle className={styles1.loader} />
          </div>
          <div className={styles1.details}>
            <div className={styles1.subtitle}>Sending Offer</div>
            <div className={styles1.text}>
              Please confirm the necessary transactions through MetaMask
            </div>
          </div>
        </div> }

        {offered &&
        <div className={styles1.line}>
          {/*<div className={styles.icon}>*/}
          {/*    <LoaderCircle className={styles.loader} />*/}
          {/*</div>*/}
          <div className={styles1.details}>
            <Icon name="check" size="18" fill={"#BF9A36"} />
            <div className={styles1.subtitle}>Offer Sent!</div>
            <div className={styles1.text}>
            </div>
          </div>
        </div> }
      </div>
      </div>
  );
};

export default OfferBuilder;
