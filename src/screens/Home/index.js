import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import Selection from "./Selection";
import Popular from "./Popular";
import HotBid from "../../components/HotBid";
import Collections from "./Collections";
import Discover from "./Discover";
import Description from "./Description";

const Home = (props) => {
    // useEffect(async () => {
    //     alert(JSON.stringify(props))
    // }, []);

  return (
    <>
        <Description />
        {JSON.stringify(props.users)}
      <Popular users={props.users} />
      <HotBid classSection="section" nfts={props.nfts} setListings={props.setListings} account={props.account}/>
    </>
  );
};

export default Home;
