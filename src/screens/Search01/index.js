import React, {useEffect, useState} from "react";
import cn from "classnames";
import styles from "./Search01.module.sass";
import { Range, getTrackBackground } from "react-range";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import Dropdown from "../../components/Dropdown";
import VEJSON from '../../abis/ViridianExchange.json';
import { useLocation, useHistory } from "react-router-dom";
import Web3 from "web3";
// data
import { bids } from "../../mocks/bids";
import NFT from "../../components/NFT";
import vNFTJSON from "../../abis/ViridianNFT.json";
import veJSON from "../../abis/ViridianExchange.json";
import config from "../../local-dev-config";
import Fuse from "fuse.js";
import Pack from "../../components/Pack";
import Loader from "../../components/Loader";

let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

const navLinks = ["All items", "Cards", "Packs"];//, "Promotional Items"];

const dateOptions = ["Newest", "Oldest"];
const likesOptions = ["Most liked", "Least liked", "Most to Least Expensive"];
const colorOptions = ["All colors", "Black", "Green", "Pink", "Purple"];
const creatorOptions = ["Verified only", "All", "Most Liked"];
const pricesOptions = ["Most to Least Expensive", "Least to Most Expensive"];

const Search = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [date, setDate] = useState(dateOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);
  const [prices, setPrices] = useState("Sort Price");
  const [filteredNFTs, setFilteredNFTs] = useState([]);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState([""]);

  const [values, setValues] = useState([500000]);

  const location = useLocation();
  const history = useHistory();

  const options = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        keys: [
            "uri.name",
            "uri.year",
            "uri.grade",
            "uri.set",
            "uri.grade",
            "id"
        ]
    };



    useEffect(async () => {

        if(location.search) {
            if (location.search.split('=')[1] !== search) {
                await setSearch(location.search.split('=')[1]);
            }

            //alert(location.search.split('=')[1])

            if (props.nfts) {
                const fuse = new Fuse(props.nfts, options);

                //alert(JSON.stringify(props.nfts));

                //alert(search);

                const result = fuse.search(search);

                //alert("RES: " + JSON.stringify(result));

                let tempNFTs = [];

                result.map((item) => {
                    tempNFTs.push(item.item);
                });

                //alert("TNFT: " + JSON.stringify(tempNFTs));


                setFilteredNFTs(tempNFTs);
            }

        }
        else {
            await setFilteredNFTs(props.nfts);

            //alert(filteredNFTs)
        }
    }, [search, props.nfts]);

  const STEP = 50;
  const MIN = 1;
  const MAX = 1000000;

  return (
    <div className={cn("section-pt80", styles.section)} style={{marginTop: '4ex'}}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.title}>Explore the Marketplace</div>
          {/*<form*/}
          {/*  className={styles.search}*/}
          {/*  action=""*/}
          {/*  //onSubmit={() => handleSubmit()}*/}
          {/*>*/}
          {/*  <input*/}
          {/*    className={styles.input}*/}
          {/*    type="text"*/}
          {/*    value={search}*/}
          {/*    onChange={(e) => setSearch(e.target.value)}*/}
          {/*    name="search"*/}
          {/*    placeholder="Search ..."*/}
          {/*    required*/}
          {/*  />*/}
          {/*  <button className={styles.result}>*/}
          {/*    <Icon name="search" size="16" />*/}
          {/*  </button>*/}
          {/*</form>*/}
        </div>
        <div className={styles.sorting}>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              value={date}
              setValue={setDate}
              options={dateOptions}
            />
          </div>
          <div className={styles.nav}>
            {navLinks.map((x, index) => (
              <button
                className={cn(styles.link, {
                  [styles.active]: index === activeIndex,
                })}
                onClick={() => setActiveIndex(index)}
                key={index}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.filters}>
            <div className={styles.range}>
              <div className={styles.label}>Price range</div>
              <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => {setValues(values);}}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "8px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values,
                          colors: ["#3772FF", "#E6E8EC"],
                          min: MIN,
                          max: MAX,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "24px",
                      width: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#3772FF",
                      border: "4px solid #FCFCFD",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-33px",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "18px",
                        fontFamily: "Poppins",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        backgroundColor: "#141416",
                      }}
                    >
                      {values[0].toFixed(1)}
                    </div>
                  </div>
                )}
              />
              <div className={styles.scale}>
                <div className={styles.number}>$1</div>
                <div className={styles.number}>$1M</div>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                <div className={styles.label}>Price</div>
                <Dropdown
                  className={styles.dropdown}
                  value={prices}
                  setValue={setPrices}
                  options={pricesOptions}
                />
              </div>
                {/*<div className={styles.item}>*/}
                {/*    <div className={styles.label}>Popularity</div>*/}
                {/*    <Dropdown*/}
                {/*        className={styles.dropdown}*/}
                {/*        value={likes}*/}
                {/*        setValue={setLikes}*/}
                {/*        options={likesOptions}*/}
                {/*    />*/}
                {/*</div>*/}
              {/*<div className={styles.item}>*/}
              {/*  <div className={styles.label}>Collector</div>*/}
              {/*  <Dropdown*/}
              {/*    className={styles.dropdown}*/}
              {/*    value={creator}*/}
              {/*    setValue={setCreator}*/}
              {/*    options={creatorOptions}*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
            <div className={styles.reset} onClick={() => {//setFilters([]); setPrices("Sort Price");
                history.push("/search01");}}>
              <Icon name="close-circle-fill" size="24" />
              <span>Reset filter</span>
            </div>
          </div>
            {filteredNFTs.length > 0 ? <div className={styles.wrapper}>
              {/*{JSON.stringify(filteredNFTs[0].price)}*/}
              {(prices === "Most to Least Expensive") ? <div className={styles.list}>
              {[].concat(filteredNFTs)
                  .sort((a, b) => a.price < b.price ? 1 : -1).map((x, index) => {
                      if (x.price <= (values[0] * 1000000000000000000)) {
                          if (x.isVNFT) {
                              if (activeIndex === 0 || activeIndex === 1) {
                                  return (<NFT className={styles.card} item={x} key={index} isListing={true}
                                               account={props.account}/>);
                              }
                          } else {
                              if (activeIndex === 0 || activeIndex === 2) {
                                  return (<Pack className={styles.card} item={x} key={index} isListing={true}
                                                account={props.account}/>);
                              }
                          }
                      }
              })}
            </div> : <div>{(prices === "Least to Most Expensive") ? <div className={styles.list}>
                  {[].concat(filteredNFTs)
                      .sort((a, b) => a.price > b.price ? 1 : -1).map((x, index) => {
                          if (x.price <= (values[0] * 1000000000000000000)) {
                              if (x.isVNFT) {
                                  if (activeIndex === 0 || activeIndex === 1) {
                                      return (<NFT className={styles.card} item={x} key={index} isListing={true}
                                                   account={props.account}/>);
                                  }
                              } else {
                                  if (activeIndex === 0 || activeIndex === 2) {
                                      return (<Pack className={styles.card} item={x} key={index} isListing={true}
                                                    account={props.account}/>);
                                  }
                              }
                          }
                  })}
              </div> : <div className={styles.list}>
                  {filteredNFTs.map((x, index) => {
                      if (x.price <= (values[0] * 1000000000000000000)) {
                          if (x.isVNFT) {
                              if (activeIndex === 0 || activeIndex === 1) {
                                  return (<NFT className={styles.card} item={x} key={index} isListing={true}
                                               account={props.account}/>);
                              }
                          } else {
                              if (activeIndex === 0 || activeIndex === 2) {
                                  return (<Pack className={styles.card} item={x} key={index} isListing={true}
                                                account={props.account}/>);
                              }
                          }
                      }
                  })}
              </div>} </div> }
            <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)}>
                <span>Load more</span>
              </button>
            </div>
            </div>: <div style={{margin: 'auto',
                width: '-50%',
                padding: '10px'}}><Loader/></div>}
        </div>
      </div>
    </div>
  );
};

export default Search;
