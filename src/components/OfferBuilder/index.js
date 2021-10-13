import React, { useState } from "react";
import cn from "classnames";
import styles from "./UploadDetails.module.sass";
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
import {parseAmountToVext} from "../../Utils";
import Web3 from "web3";

const royaltiesOptions = ["10%", "20%", "30%"];

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
              onChange={(e) => {setGiveAmount(e.target.value); console.log(giveAmount);}}
              className={styles.field}
              label="They Receive"
              name="Twitter"
              type="text"
              placeholder="ETH Amount"
              required
          /> : <TextInput
              style={{marginBottom: '2ex'}}
              onChange={(e) => {setGiveAmount(e.target.value); console.log(giveAmount);}}
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
        <button className={cn("button", styles.button)} onClick={async () => {
          if (isETH) {
            await makeOffer(props.account, props.to, selectedGiveIds, selectedGivePackIds, giveAmount.toString(), selectedRecIds, selectedRecPackIds, recAmount.toString(), false, 7);
          }
          else {
            await makeOffer(props.account, props.to, selectedGiveIds, selectedGivePackIds, parseAmountToVext(giveAmount), selectedRecIds, selectedRecPackIds, parseAmountToVext(recAmount), true, 7);
          }
        }
        }> <span>Send Offer</span> </button>
      </div>
      </div>
  );
};

export default OfferBuilder;
