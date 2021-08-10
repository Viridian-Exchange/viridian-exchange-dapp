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
import Items from "../../screens/Profile/Items";
import Dropdown from "../Dropdown";
import Flexbox from 'flexbox-react';

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
  const [selectedNFTs, setSelectedNFTs] = useState([]);

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
        {option === options[0] && <Items class={props.class} nfts={props.nfts} isListing={false} account={props.account}
                                         style={{marginTop: "20ex", marginBottom: "2ex"}}/>}
        {option === options[1] && <Items class={props.class} nfts={[{"id":"2","uri":{"name":"Charizard","description":"Base Set","image":"https://viridian-images.s3.us-east-2.amazonaws.com/CD12.png"},"owner":"0x4A680E6c256efe9DDA9aC19A96e205f7791158Ee"}]} isListing={false} account={props.account}
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
          <Items class={props.class} nfts={props.nfts} isListing={false} account={props.account} />
          <TextInput
              style={{marginBottom: '2ex'}}
              className={styles.field}
              label="You Receive"
              name="Twitter"
              type="text"
              placeholder="$VEXT Amount"
              required
          />
          <Items class={props.class} nfts={[{"id":"2","uri":{"name":"Charizard","description":"Base Set","image":"https://viridian-images.s3.us-east-2.amazonaws.com/CD12.png"},"owner":"0x4A680E6c256efe9DDA9aC19A96e205f7791158Ee"}]} isListing={false} account={props.account}/>
        </Flexbox>
      </Flexbox>
      </div>
  );
};

export default OfferBuilder;
