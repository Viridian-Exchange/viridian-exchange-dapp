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
  const [giveAmount, setGiveAmount] = useState(0);
  const [recAmount, setRecAmount] = useState(0);



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
        {option === options[0] && <Items giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                                         recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs} give={true} selected={false} class={props.class} nfts={props.nfts} isListing={false} account={props.account}
                                         style={{marginTop: "20ex", marginBottom: "2ex"}}/>}
        {option === options[1] && <Items giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                                         recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs} give={false} selected={false} class={props.class} nfts={props.otherNFTs} isListing={false} account={props.account}
                                         style={{marginTop: "20ex", marginBottom: "2ex"}}/>}
        </Flexbox>
        <Flexbox flexDirection="column" style={{marginLeft: '5ex', marginTop: '3ex'}}>
          <TextInput
              style={{marginBottom: '2ex'}}
              className={styles.field}
              label="They Receive"
              name="Twitter"
              type="text"
              placeholder="$VEXT Amount"
              required
          />
          <Items class={props.class} nfts={selectedGiveNFTs} giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                 recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs} give={true} selected={true} isListing={false} account={props.account} />
          <TextInput
              style={{marginBottom: '2ex'}}
              className={styles.field}
              label="You Receive"
              name="Twitter"
              type="text"
              placeholder="$VEXT Amount"
              required
          />
          <Items class={props.class} giveSelectedNFTs={selectedGiveNFTs} setGiveSelectedNFTs={setGiveSelectedNFTs}
                 recSelectedNFTs={selectedRecNFTs} setRecSelectedNFTs={setRecSelectedNFTs}
                 nfts={selectedRecNFTs} give={false} isListing={false} selected={true} account={props.account}/>
        </Flexbox>
      </Flexbox>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)} onClick={async () => await makeOffer(props.account, props.to, selectedGiveIds, giveAmount, selectedRecIds, recAmount, true)
        }> <span>Send Offer</span> </button>
      </div>
      </div>
  );
};

export default OfferBuilder;
