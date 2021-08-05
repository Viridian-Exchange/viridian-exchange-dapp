import React, {useEffect, useState} from "react";
import cn from "classnames";
import styles from "./Search01.module.sass";
import { Range, getTrackBackground } from "react-range";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import Dropdown from "../../components/Dropdown";
import VEJSON from '../../abis/ViridianExchange.json';
import Web3 from "web3";
// data
import { bids } from "../../mocks/bids";
import NFT from "../../components/NFT";
import vNFTJSON from "../../abis/ViridianNFT.json";
import veJSON from "../../abis/ViridianExchange.json";
import config from "../../local-dev-config";

let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");


const navLinks = ["All items", "Cards", "Packs", "Promotional Items"];

const dateOptions = ["Newest", "Oldest"];
const likesOptions = ["Most liked", "Least liked", "Most to Least Expensive"];
const colorOptions = ["All colors", "Black", "Green", "Pink", "Purple"];
const creatorOptions = ["Verified only", "All", "Most Liked"];
const pricesOptions = ["Most to Least Expensive", "Least to Most Expensive"];

const Search = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [date, setDate] = useState(dateOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);
  const [prices, setPrices] = useState(colorOptions[0]);

  const [search, setSearch] = useState("");

  const [values, setValues] = useState([5]);

  const [nfts, setNfts] = useState([]);
  const [listings, setListings] = useState([]);
  const [fetchedAndParsed, setFetchedAndParsed] = useState(false);
  const nftsCopy = [];

    async function getListings() {
        const veContractAddress = config.dev_contract_addresses.ve_contract;
        //console.log(JSON.stringify(vNFTJSON));
        let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
        // await console.log("ABIMETHODS");
        // await console.log(veABI.methods);
        return await veABI.methods.getListings().call();
    }

    async function getListingFromId(listingId) {
        const veContractAddress = config.dev_contract_addresses.ve_contract;
        //console.log(JSON.stringify(vNFTJSON));
        let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
        // await console.log("ABIMETHODS");
        // await console.log(veABI.methods);
        return await veABI.methods.getListingsFromId(listingId).call();
    }

    async function tokenURI(tokenId) {
        const vNFTContractAddress = config.dev_contract_addresses.vnft_contract;

        let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
        await console.log("ABIMETHODS: " + tokenId);
        let nft = vNFTABI.methods.tokenURI(tokenId).call();

        //alert(nft);

        return nft;
    }

    async function parseListing(listing) {
        //console.log('Fetching from uri: ' + JSON.stringify(listing.tokenId));
        //const extractedObject =calert(listing)
        if (listing) {
            await tokenURI(listing.tokenId).then(async (e) => {
                console.log("FETCHING THIS: " + JSON.stringify(e));
                await fetch(e, {
                    mode: "cors",
                    method: "GET"
                }).then(async (res) => {
                    console.log(res);
                    console.log(res.status);
                    if (res.ok) {
                        const resJson = await res.json();
                        alert(JSON.stringify(resJson));
                        const newNFT = {id: listing.tokenId, uri: resJson}
                        console.log(newNFT);
                        nftsCopy.push(newNFT);
                    }
            });
            });
        }
        //console.log("JSON: " + JSON.stringify(extractedObject));
        // listing['uri'] = await extractedObject;
        //nftCopy[i] = listing;
    }

    useEffect(async () => {
        //alert('called');

        //console.log('Getting owned NFTs');

        await getListings().then(async (e) => {
            console.log("Listings: " + JSON.stringify(e));
            await setListings(e);

            //alert(listings.length);
        });


        //await parseListing(listings[0]);

        if (listings) {
            for (let i = 0; i < listings.length; i++) {
                // await nfts.forEach((nft, i) => {
                //   extractMetadata(nft, i)
                // });
                let listing = listings[i];
                console.log("LSTNG: " + listing)
                if(listing) {
                    await parseListing(await getListingFromId(listing));
                }
            }
        }

        setNfts(nftsCopy);
        if (!fetchedAndParsed) {
            setFetchedAndParsed(true);
        }
    }, [fetchedAndParsed]);

  const handleSubmit = (e) => {
    alert();
  };

  const STEP = 0.1;
  const MIN = 0.01;
  const MAX = 10;

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.title}>Explore the Marketplace</div>
          <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search ..."
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="16" />
            </button>
          </form>
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
                onChange={(values) => setValues(values)}
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
                <div className={styles.number}>0.01 ETH</div>
                <div className={styles.number}>10 ETH</div>
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
                <div className={styles.item}>
                    <div className={styles.label}>Popularity</div>
                    <Dropdown
                        className={styles.dropdown}
                        value={likes}
                        setValue={setLikes}
                        options={likesOptions}
                    />
                </div>
              <div className={styles.item}>
                <div className={styles.label}>Collector</div>
                <Dropdown
                  className={styles.dropdown}
                  value={creator}
                  setValue={setCreator}
                  options={creatorOptions}
                />
              </div>
            </div>
            <div className={styles.reset}>
              <Icon name="close-circle-fill" size="24" />
              <span>Reset filter</span>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.list}>
              {nfts.map((x, index) => (
                  <NFT className={styles.card} item={x} key={index}/>
              ))}
            </div>
            <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)}>
                <span>Load more</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
