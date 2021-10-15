import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Slider from "react-slick";
import Users from "./Users";
import Items from "./Items";
import Control from "./Control";
import Options from "./Options";
//import {ownerOf} from "../../smartContracts/ViridianNFTMethods"
import { useLocation } from "react-router-dom";
import config from "../../local-dev-config";
import vNFTJSON from "../../abis/ViridianNFT.json";
import vpJSON from "../../abis/ViridianPack.json";
import {getOffersFromUser} from "../../smartContracts/ViridianExchangeMethods";
import Web3 from "web3";
import Followers from "../Profile/Followers";
import oStyles from "../../components/Offer/Card.module.sass";
import {parseVextAmount} from "../../Utils";

let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

const navLinks = ["Info", "Owners", "History", "Bids"];

const categories = [
  {
    category: "black",
    content: "Pokemon",
  },
  {
    category: "purple",
    content: "Graded",
  },
];

const users = [
  {
    name: "Raquel Will",
    position: "Owner",
    avatar: "/images/content/avatar-2.jpg",
    reward: "/images/content/reward-1.svg",
  },
  {
    name: "Selina Mayert",
    position: "Creator",
    avatar: "/images/content/avatar-1.jpg",
  },
];

const OfferScreen = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fromNFTsC, setFromNFTsC] = useState([]);
  const [toNFTsC, setToNFTsC] = useState([]);
  const [fromPacksC, setFromPacksC] = useState([]);
  const [toPacksC, setToPacksC] = useState([]);

  const [fromNFTs, setFromNFTs] = useState([]);
  const [toNFTs, setToNFTs] = useState([]);

  const [startParse, setStartParse] = useState(false);
  //const {passedState} = props.location.state
  const location = useLocation();


  let [toNFTsCopy, setToNFTsCopy] = useState([]);
  let [fromNFTsCopy, setFromNFTsCopy] = useState([]);

  async function getToNFTs() {
    let nftC = [];

    setToNFTsC(location.state.toNFTs);
    setToPacksC(location.state.toPacks);

    const vnftContractAddress = config.ropsten_contract_addresses.vnft_contract;
    let vnftABI = new web3.eth.Contract(vNFTJSON['abi'], vnftContractAddress);

    const vpContractAddress = config.ropsten_contract_addresses.vp_contract;
    let vpABI = new web3.eth.Contract(vpJSON['abi'], vpContractAddress);

    if (toNFTsC) {
      //alert(JSON.stringify(nftIds));
      for (let i = 0; i < toNFTsC.length; i++) {
        let nftId = toNFTsC[i]
        let uri = await vnftABI.methods.tokenURI(nftId).call();

        nftC.push({id: nftId, uri: uri});
      }
    }

    if (toPacksC) {
      //alert(JSON.stringify(nftIds));
      for (let i = 0; i < toPacksC.length; i++) {
        let nftId = toPacksC[i]
        let uri = await vpABI.methods.tokenURI(nftId).call();

        nftC.push({id: nftId, uri: uri, isVNFT: true});
      }
    }

        //alert("TNC: " + JSON.stringify(nftC))

      return nftC;
  }

  async function getFromNFTs() {

    let nftC = [];

    setFromNFTsC(location.state.fromNFTs);
    setFromPacksC(location.state.fromPacks);

    const vnftContractAddress = config.ropsten_contract_addresses.vnft_contract;
    let vnftABI = new web3.eth.Contract(vNFTJSON['abi'], vnftContractAddress);

    const vpContractAddress = config.ropsten_contract_addresses.vp_contract;
    let vpABI = new web3.eth.Contract(vpJSON['abi'], vpContractAddress);

    if (fromNFTsC) {
      //alert(JSON.stringify(nftIds));
      for (let i = 0; i < fromNFTsC.length; i++) {
        let nftId = fromNFTsC[i]
        let uri = await vnftABI.methods.tokenURI(nftId).call();

        nftC.push({id: nftId, uri: uri, isVNFT: true});
      }
    }

    if (fromPacksC) {
      //alert(JSON.stringify(nftIds));
      for (let i = 0; i < fromPacksC.length; i++) {
        let nftId = fromPacksC[i]
        let uri = await vpABI.methods.tokenURI(nftId).call();

        nftC.push({id: nftId, uri: uri, isVNFT: true});
      }
    }

        //alert("FNC: " + JSON.stringify(nftC))

    return nftC;
  }

  async function ownerOf(tokenId, isPack) {
    const vNFTContractAddress = config.ropsten_contract_addresses.vnft_contract;
    const vpContractAddress = config.ropsten_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    let vpABI = new web3.eth.Contract(vNFTJSON['abi'], vpContractAddress);
    await console.log("ABIMETHODSPROF: " + tokenId);
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

  async function extractMetadata(nftc, nft, i, isPack, to) {
    //alert('Fetching from uri: ' + nft.uri);
    //const extractedObject =
    if (nft.uri) {
      await fetch(nft.uri, {
        mode: "cors",
        method: "GET"
      }).then(async res => {
        console.log(res);
        console.log(res.status);
        await ownerOf(nft.id, isPack).then(async (owner) => {
          if (res.ok) {
            //alert("Owner OF: " + owner);
            const resJson = await res.json();
            console.log(JSON.stringify(resJson));
            //alert(JSON.stringify(resJson));
            const newNFT = {id: nft.id, uri: resJson, owner: owner}
            //alert("NNFT: " + JSON.stringify(newNFT));
            await nftc.push(newNFT);
          }
        });

      });

      if (to) {
        if (nftc[0]) {
          if (nftc[0].uri.image) {
            setToNFTs(nftc);
          }
        }
      }
      else {
        if (nftc[0]) {
          if (nftc[0].uri.image) {
            setFromNFTs(nftc);
          }
        }
      }
    }
    //console.log("JSON: " + JSON.stringify(extractedObject));
    // nft['uri'] = await extractedObject;
    // nftCopy[i] = nft;
  }

  const navLinks = [
    "You Recieve",
    location.state.otherUser.displayName + " Recieves",
  ];

  useEffect(async () => {
    //alert(JSON.stringify(toNFTs) === JSON.stringify([]));
    //alert(JSON.stringify(fromNFTs));

    if (JSON.stringify(toNFTsC) === JSON.stringify([]) && JSON.stringify(fromNFTsC) === JSON.stringify([])) {
      setToNFTsCopy(location.state.toNFTs);
      setFromNFTsCopy(location.state.fromNFTs);
      //alert("ST")
      setStartParse(true);
    }

    if (JSON.stringify(toNFTsCopy) === JSON.stringify([]) && JSON.stringify(fromNFTsCopy) === JSON.stringify([])) {
      //alert("GET")
      setToNFTsCopy(await getToNFTs());
      setFromNFTsCopy(await getFromNFTs());
      setStartParse(false);
    }

    if ((JSON.stringify(toNFTsCopy) !== JSON.stringify([])) ||
        (JSON.stringify(fromNFTsCopy) !== JSON.stringify([]))) {

      if (!setStartParse) {
        //alert("GO")
        setStartParse(true);
      }

      let tnc = [];

      //alert("MAPT: " + JSON.stringify(toNFTsCopy));
      //alert("MAPF: " + JSON.stringify(fromNFTsCopy));

      toNFTsCopy.map(async (nft, i) => await extractMetadata(tnc, nft, i, false, true));

      // alert("FETCHED: " + JSON.stringify(tnc));

      let fnc = [];

      fromNFTsCopy.map(async (nft, i) => await extractMetadata(fnc, nft, i, false, false));

      // alert("FETCHED: " + JSON.stringify(fnc));

      // if (fnc[0]) {
      //   if (fnc[0].uri) {
      //     if (fnc[0].uri.image) {
      //       setFromNFTs(fnc);
      //     }
      //   }
      // }
    }
  //}, []);

  }, [startParse, toNFTsCopy, fromNFTsCopy]);

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>

          <div className={styles.nav} style={{marginTop: '3.5ex'}}>
            {navLinks.map((x, index) => (
                <button
                    className={cn(styles.link, {
                      [styles.active]: index === activeIndex,
                    })}
                    key={index}
                    onClick={() => setActiveIndex(index)}
                >
                  {x}
                </button>
            ))}
          </div>

          <div className={styles.body} style={{marginRight: '50ex'}}>
            <div className={styles.group}>
              {/*<div>{JSON.stringify(location.state)}</div>*/}
              <div style={{marginLeft: '-40ex'}}>
                {activeIndex === 0 && [
                  <div className={styles.line} style={{marginTop: '5ex'}}>
                    {location.state.isETH ? <div className={styles.price}>{Web3.utils.fromWei(location.state.fromVEXT)} {" ETH"}</div> :
                        <div className={styles.price}>{parseVextAmount(location.state.fromVEXT)} {" USDT"}</div>}
                  </div>,
                  <Items class={styles.items} nfts={fromNFTs} isListing={false} account={location.state.account}/>
                ]}
                {activeIndex === 1 && [
                  <div className={styles.line} style={{marginTop: '5ex'}}>
                    {location.state.isETH ? <div className={styles.price}>{Web3.utils.fromWei(location.state.toVEXT)} {" ETH"}</div> :
                        <div className={styles.price}>{parseVextAmount(location.state.toVEXT)} {" USDT"}</div>}
                    {/*{JSON.stringify(toNFTs)}*/}
                  </div>,
                  <Items class={styles.items} nfts={toNFTs} isListing={false} account={props.account}/>
                ]}
              </div>
            </div>
          </div>

          {/*<div className={styles.bg}>*/}
          {/*  /!*{location.state.listingId}*!/*/}
          {/*  /!*HI*!/*/}
          {/*  /!*{JSON.stringify(location)}*!/*/}
          {/*  /!*{JSON.stringify(location.state.toNFTs)}*!/*/}
          {/*  /!*{JSON.stringify(location.state.fromNFTs)}*!/*/}
          {/*  /!*{location.state.toVEXT}*!/*/}
          {/*  /!*{location.state.fromVEXT}*!/*/}
          {/*</div>*/}
          <div className={styles.details}>
            {/*<h1 className={cn("h3", styles.title)}></h1>*/}
            {/*<div className={styles.cost}>*/}
            {/*  <div className={cn("status-stroke-green", styles.price)}>*/}
            {/*    100 VEXT*/}
            {/*  </div>*/}
            {/*  <div className={cn("status-stroke-black", styles.price)}>*/}
            {/*    $4,429.87*/}
            {/*  </div>*/}
            {/*  <div className={styles.counter}>10 in stock</div>*/}
            {/*</div>*/}
            {/*<div className={styles.info}>*/}
            {/*  This NFT Card will give you Access to Special Airdrops. To learn*/}
            {/*  more about UI8 please visit{" "}*/}
            {/*  <a*/}
            {/*    href="https://ui8.net"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*  >*/}
            {/*    https://ui8.net*/}
            {/*  </a>*/}
            {/*</div>*/}
            {/*<div className={styles.nav}>*/}
            {/*  {navLinks.map((x, index) => (*/}
            {/*    <button*/}
            {/*      className={cn(*/}
            {/*        { [styles.active]: index === activeIndex },*/}
            {/*        styles.link*/}
            {/*      )}*/}
            {/*      onClick={() => setActiveIndex(index)}*/}
            {/*      key={index}*/}
            {/*    >*/}
            {/*      {x}*/}
            {/*    </button>*/}
            {/*  ))}*/}
            {/*</div>*/}
            {/*{JSON.stringify(location.state)}*/}
            {/*<Users className={styles.users} style={{marginBottom: '5ex'}} items={users} owner={1}/>*/}
            <Control account={props.account} offerId={location.state.offerId} toNFTs={location.state.toNFTs} fromNFTs={location.state.fromNFTs}
              toVEXT={location.state.toVEXT} fromVEXT={location.state.fromVEXT} isETH={location.state.isETH} toAccepted={location.state.toAccepted} fromAccepted={location.state.fromAccepted}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferScreen;
