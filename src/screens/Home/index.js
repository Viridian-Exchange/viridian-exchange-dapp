import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import Selection from "./Selection";
import Popular from "./Popular";
import HotBid from "../../components/HotBid";
import Collections from "./Collections";
import Discover from "./Discover";
import Description from "./Description";
import Modal from "../../components/Modal";
import SignupPrompt from "../../components/SignupPrompt";
import {HandleAddUserSimple} from "../../apis/UserAPI";

const Home = (props) => {



  return (
    <>
        <Modal
            visible={props.promptSetup}
            onClose={async () => {
                alert("closed prematurely");
                await HandleAddUserSimple(props.setUserInfo, props.account).then(() => {
                props.setPromptSetup(false);});
            }}
        >
            <SignupPrompt account = {props.account} setPromptSetup = {props.setPromptSetup} setUserInfo = {props.setUserInfo}/>
        </Modal>
        {JSON.stringify(props.userInfo)}
        <Description />
      <Popular />
      <HotBid classSection="section" nfts={props.nfts} setListings={props.setListings} account={props.account}/>
    </>
  );
};

export default Home;
