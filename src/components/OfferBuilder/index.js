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
import vnftJSON from "../../abis/ViridianNFT.json"
import vpJSON from "../../abis/ViridianPack.json"
import vNFTJSON from "../../abis/ViridianNFT.json";

const royaltiesOptions = ["10%", "20%", "30%"];

let web3 = new Web3( new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");

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

  const [otherPacks, setOtherPacks] = useState([]);
  const [otherNFTs, setOtherNFTs] = useState([]);

  useEffect(async () => {

    //alert("EVENT DATA" + JSON.stringify(eventData));
    //alert("PROPS: " + JSON.stringify(props))

    if (eventData[0]) {
      setOffered(true);
      setLoading(false);
    }

    if (props.toNFTsPreSel) {
      //alert("ONFT: " + JSON.stringify(props.from));
      setGiveSelectedIds(props.toNFTsPreSel);
    }
    if (props.toPacksPreSel) {
      setGiveSelectedPackIds(props.toPacksPreSel);
    }
    if (props.fromNFTsPreSel) {
      setRecSelectedIds(props.fromNFTsPreSel);
    }
    if (props.fromPacksPreSel) {
      setRecSelectedPackIds(props.fromPacksPreSel);
    }

    if (props.counterOffer) {
      alert("TAMT: " + props.from);
      setGiveAmount(props.toAmount);
      setRecAmount(props.fromAmount);

      const vpContractAddress = config.mumbai_contract_addresses.vp_contract;
      let vpABI = new web3.eth.Contract(vpJSON['abi'], vpContractAddress);
      const vnftContractAddress = config.mumbai_contract_addresses.vnft_contract;
      let vnftABI = new web3.eth.Contract(vnftJSON['abi'], vnftContractAddress);

      let nftIds = await vnftABI.methods.getOwnedNFTs().call({from: props.from});
      let packIds = await vpABI.methods.getOwnedNFTs().call({from: props.from});
      let nfts = [];
      let packs = [];
      let nftc = [];
      let packc = [];
      //alert(JSON.stringify(vnftABI.methods));

      // await //console.log(JSON.stringify(vNFTJSON['abi']));
      //console.log(vpContractAddress);
      //console.log("test");

      if (nftIds) {
        //alert(JSON.stringify(nftIds));
        for (let i = 0; i < nftIds.length; i++) {
          let nftId = nftIds[i];
          let uri = await vnftABI.methods.tokenURI(nftId).call();
          //console.log("XXX: " + uri);
          nfts.push({id: nftId, uri: uri});
        }

        alert(JSON.stringify(nfts));
      }

      if (packIds) {
        //alert(JSON.stringify(nftIds));
        for (let i = 0; i < packIds.length; i++) {
          let nftId = packIds[i];
          let uri = await vpABI.methods.tokenURI(nftId).call();
          ////console.log("XXX: " + uri);
          packs.push({id: nftId, uri: uri});
        }

        alert(JSON.stringify(packs));
      }

      if (nfts.length > 0) {
        for (let i = 0; i < nfts.length; i++) {
          //alert(JSON.stringify(props.ownedNFTs));
          await extractMetadata(nftc, nfts[i], i, false);
        }

        if (nftc[0]) {
          if (nftc[0].uri.image) {
            alert("NFTC " + JSON.stringify(nftc))
            // if (!props.ownedNFTs[0].owner) {
            //alert("hi")
            await setOtherNFTs(nftc);

            //alert("NFTS: " + JSON.stringify(props.fromNFTsPreSel))
            for (let i = 0; i < nftc.length; i++) {
              for (let j = 0; j < props.fromNFTsPreSel.length; j++) {
                //alert(JSON.stringify(props.fromNFTsPreSel[j]) + ' === ' + JSON.stringify(nftc[i].id));
                if (props.fromNFTsPreSel[j] === nftc[i].id && props.fromNFTsPreSel.includes(nftc[i].id)) {
                  setRecSelectedNFTs([].concat(selectedGiveNFTs).concat([nftc[i]]));
                }
              }
            }
            // if NFT.value > 2 {
            // SEND TO LIAM }
            //}
          }
        }
      }

      if (packs.length > 0) {
        for (let i = 0; i < packs.length; i++) {
          //alert(JSON.stringify(props.ownedNFTs));
          await extractMetadata(packc, packs[i], i, true);
        }

        if (packc[0]) {
          if (packc[0].uri.image) {
            alert("packs " + JSON.stringify(packc));
            // if (!props.ownedNFTs[0].owner) {
            //alert("hi")
            await setOtherPacks(packc);

            for (let i = 0; i < packc.length; i++) {
              for (let j = 0; j < props.fromPacksPreSel.length; j++) {
                //alert(JSON.stringify(props.fromNFTsPreSel[j]) + ' === ' + JSON.stringify(nftc[i].id));
                if (props.fromPacksPreSel[j] === packc[i].id && props.fromPacksPreSel.includes(packc[i].id)) {
                  setRecSelectedNFTs([].concat(selectedRecNFTs).concat([packc[i]]));
                }
              }
            }

            // if NFT.value > 2 {
            // SEND TO LIAM }
            //}
          }
        }
      }

      // setOtherPacks(packs);
      // setOtherNFTs(nfts);

      for (let i = 0; i < props.nfts.length; i++) {
        for (let j = 0; j < props.toNFTsPreSel.length; j++) {
          //alert(JSON.stringify(props.fromNFTsPreSel[j]) + ' === ' + JSON.stringify(nftc[i].id));
          if (props.toNFTsPreSel[j] === props.nfts[i].id && props.toNFTsPreSel.includes(props.nfts[i].id)) {
            setGiveSelectedNFTs([].concat(selectedGiveNFTs).concat([props.nfts[i]]));
          }
        }
      }

      for (let i = 0; i < props.packs.length; i++) {
        for (let j = 0; j < props.toPacksPreSel.length; j++) {
          //alert(JSON.stringify(props.fromNFTsPreSel[j]) + ' === ' + JSON.stringify(nftc[i].id));
          if (props.toNFTsPreSel[j] === props.packs[i].id && props.toPacksPreSel.includes(props.packs[i].id)) {
            setGiveSelectedNFTs([].concat(selectedGiveNFTs).concat([props.packs[i]]));
          }
        }
      }

    }

  }, [eventData]);

  const [isETH, setIsETH] = useState(true);

  async function extractMetadata(nftc, nft, i, isPack) {
    //console.log('Fetching from uri: ' + nft.uri);
    //const extractedObject =
    await fetch(nft.uri, {
      mode: "cors",
      method: "GET"
    }).then(async res => {
      //console.log(res);
      //console.log(res.status);
      await ownerOf(nft.id, isPack).then(async (owner) => {
        if (res.ok) {
          //alert("Owner OF: " + owner);
          const resJson = await res.json();
          //console.log(JSON.stringify(resJson));
          //alert(JSON.stringify(resJson));
          const newNFT = {id: nft.id, uri: resJson, owner: owner}
          //console.log(newNFT);

          await nftc.push(newNFT);
        }
      });
    });
    ////console.log("JSON: " + JSON.stringify(extractedObject));
    // nft['uri'] = await extractedObject;
    // nftCopy[i] = nft;
  }

  async function ownerOf(tokenId, isPack) {
    const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
    const vpContractAddress = config.mumbai_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    let vpABI = new web3.eth.Contract(vpJSON['abi'], vpContractAddress);
    //console.log("ABIMETHODSPROF: " + tokenId);
    let owner
    if (!isPack) {
      owner = vNFTABI.methods.ownerOf(tokenId).call();
    }
    else {
      owner = vpABI.methods.ownerOf(tokenId).call();
    }

    //alert(nft);

    return owner;
  }

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
          <div>
        {option === options[0] && <Items selectedGiveIds={selectedGiveIds} selectedRecIds={selectedRecIds} setGiveSelectedIds={setGiveSelectedIds} setRecSelectedIds={setRecSelectedIds} giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                                         recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs} give={true} selected={false} class={props.class} nfts={[].concat(props.nfts).concat(props.packs)} isListing={false} account={props.account} selectedRecPackIds={selectedRecPackIds}
                                         setRecSelectedPackIds={setRecSelectedPackIds} selectedGivePackIds={selectedGivePackIds} setGiveSelectedPackIds={setGiveSelectedPackIds}
                                         style={{marginTop: "20ex", marginBottom: "2ex"}}/>}
        {option === options[1] &&
        <>{props.counterOffer ? <Items selectedGiveIds={selectedGiveIds} selectedRecIds={selectedRecIds} setGiveSelectedIds={setGiveSelectedIds} setRecSelectedIds={setRecSelectedIds} setRec giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                                         recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs} give={false} selected={false} class={props.class} nfts={[].concat(otherNFTs).concat(otherPacks)} isListing={false} account={props.account} selectedRecPackIds={selectedRecPackIds}
                                         setRecSelectedPackIds={setRecSelectedPackIds} selectedGivePackIds={selectedGivePackIds} setGiveSelectedPackIds={setGiveSelectedPackIds}
                                         style={{marginTop: "20ex", marginBottom: "2ex"}} /> :
              <Items selectedGiveIds={selectedGiveIds} selectedRecIds={selectedRecIds} setGiveSelectedIds={setGiveSelectedIds} setRecSelectedIds={setRecSelectedIds} setRec giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                     recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs} give={false} selected={false} class={props.class} nfts={[].concat(props.otherNFTs).concat(props.otherPacks)} isListing={false} account={props.account} selectedRecPackIds={selectedRecPackIds}
                     setRecSelectedPackIds={setRecSelectedPackIds} selectedGivePackIds={selectedGivePackIds} setGiveSelectedPackIds={setGiveSelectedPackIds}
                     style={{marginTop: "20ex", marginBottom: "2ex"}}/>
        }</> }
          </div>
        </Flexbox>
        <Flexbox flexDirection="column" style={{marginLeft: '5ex', marginTop: '3ex', minWidth: '50ex', maxHeight: '50ex'}}>
          <Switch className={styles.switch} value={isETH} setValue={setIsETH} />
          {isETH ? <TextInput
              style={{marginBottom: '2ex'}}
              onChange={(e) => {setGiveAmount(e.target.value);}}
              value={props.toAmount}
              className={styles.field}
              label="They Receive"
              name="Twitter"
              type="text"
              placeholder="ETH Amount"
              required
          /> : <TextInput
              style={{marginBottom: '2ex'}}
              onChange={(e) => {setGiveAmount(e.target.value);}}
              value={props.toAmount}
              className={styles.field}
              label="They Receive"
              name="Twitter"
              type="text"
              placeholder="USDT Amount"
              required
          />}
          {JSON.stringify(selectedGiveIds)}
          {JSON.stringify(selectedGivePackIds)}
          <div className={styles.list} style={{marginBottom: '1ex'}}>
          <Items selectedGiveIds={selectedGiveIds} selectedRecIds={selectedRecIds} setGiveSelectedIds={setGiveSelectedIds} setRecSelectedIds={setRecSelectedIds} class={props.class} nfts={selectedGiveNFTs} giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                 recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs} give={true} selected={true} isListing={false} account={props.curAccount} selectedRecPackIds={selectedRecPackIds}
                 setRecSelectedPackIds={setRecSelectedPackIds} selectedGivePackIds={selectedGivePackIds} setGiveSelectedPackIds={setGiveSelectedPackIds} />
          </div>
          {isETH ? <TextInput
              style={{marginBottom: '2ex'}}
              value={props.fromAmount}
              onChange={(e) => setRecAmount(e.target.value)}
              className={styles.field}
              label="You Receive"
              name="Twitter"
              type="text"
              placeholder="ETH Amount"
              required
          /> : <TextInput
              style={{marginBottom: '2ex'}}
              value={props.fromAmount}
              onChange={(e) => setRecAmount(e.target.value)}
              className={styles.field}
              label="You Receive"
              name="Twitter"
              type="text"
              placeholder="USDT Amount"
              required
          />}
          {JSON.stringify(selectedRecIds)}
          {JSON.stringify(selectedRecPackIds)}
          <div className={styles.list}>
            <Items selectedGiveIds={selectedGiveIds} selectedRecIds={selectedRecIds} setGiveSelectedIds={setGiveSelectedIds} setRecSelectedIds={setRecSelectedIds} class={props.class} giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                   recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs}
                   nfts={selectedRecNFTs} give={false} isListing={false} selected={true} account={props.curAccount} selectedRecPackIds={selectedRecPackIds}
                   setRecSelectedPackIds={setRecSelectedPackIds} selectedGivePackIds={selectedGivePackIds} setGiveSelectedPackIds={setGiveSelectedPackIds} />
          </div>
        </Flexbox>
      </Flexbox>
      <div className={styles.btns}>
        {!offered && !loading && <button className={cn("button", styles.button)} onClick={async () => {
          const web3Socket = await getWeb3Socket(web3);
          const voContractAddress = config.mumbai_contract_addresses.vo_contract;
          let voABI = new web3Socket.eth.Contract(voJSON['abi'], voContractAddress);

          await voABI.events.CreatedOffer({filter: {to: props.account}}).on('data', async function(event) {
            setEventData(event.returnValues);
            // Do something here
          }).on('err', console.error);
          //alert(price);
          await setLoading(true);

            if (isETH) {
                await makeOffer(props.account, props.to, selectedGiveIds, selectedGivePackIds, giveAmount.toString(), selectedRecIds, selectedRecPackIds, recAmount.toString(), config.mumbai_contract_addresses.vt_contract, 7);
            }
            else {
                await makeOffer(props.account, props.to, selectedGiveIds, selectedGivePackIds, parseAmountToVext(giveAmount), selectedRecIds, selectedRecPackIds, parseAmountToVext(recAmount), config.mumbai_contract_addresses.vt_contract, 7);
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
