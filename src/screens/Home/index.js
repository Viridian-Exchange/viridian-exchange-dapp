import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import Selection from "./Selection";
import Popular from "./Popular";
import HotBid from "../../components/HotBid";
import Collections from "./Collections";
import Discover from "./Discover";
import AnimatedPopup from "../../components/AnimatedPopup";
import Description from "./Description";
import Modal from "../../components/Modal";
import SignupPrompt from "../../components/SignupPrompt";
import {HandleAddUserSimple} from "../../apis/UserAPI";
import {useHistory} from "react-router-dom";
import InstallMetamaskPrompt from "../../components/InstallMetamaskPrompt";

const Home = (props) => {
    const [initialLoaded, setInitialLoaded] = useState(false);

    const history = useHistory();

    // useEffect(async () => {
    //     if (!initialLoaded && props.account) {
    //         setInitialLoaded(true);
    //         history.push("/profile/" + props.account);
    //     }
    // }, []);

  return (
    <>
        {/*{JSON.stringify(props.promptInstallMetamask)}*/}
        {/*<Modal*/}
        {/*    visible={props.promptInstallMetamask}*/}
        {/*    onClose={async () => {*/}
        {/*        props.setPromptInstallMetamask(false);*/}
        {/*    }}*/}
        {/*>*/}
        {/*    <InstallMetamaskPrompt />*/}
        {/*</Modal>*/}
        <Modal
            visible={props.promptSetup}
            onClose={async () => {
                await HandleAddUserSimple(props.setUserInfo, props.account).then(() => {
                props.setPromptSetup(false);});
            }}
        >
            <SignupPrompt account = {props.account}
                          setPromptSetup = {props.setPromptSetup} setUserInfo = {props.setUserInfo}/>
        </Modal>
        <Description />
        {/*{"ONT: " + JSON.stringify(props.ownedNFTs)}*/}
      <Popular nfts={props.nfts} account={props.account} userInfo = {props.userInfo} setUserInfo = {props.setUserInfo}
               ownedNFTs = {props.ownedNFTs} setOwnedNFTs = {props.setOwnedNFTs}
               ownedPacks = {props.ownedPacks} setOwnedPacks = {props.setOwnedPacks} users={props.users} />
      <HotBid classSection="section" nfts={props.nfts} setListings={props.setListings} account={props.account}/>
    </>
  );
}

export default Home;
