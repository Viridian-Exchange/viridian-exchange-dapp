import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./styles/app.sass";
import Page from "./components/Page";
import Home from "./screens/Home";
import PayPal from "./screens/PayPal";
import UploadVariants from "./screens/UploadVariants";
import UploadDetails from "./screens/UploadDetails";
import ConnectWallet from "./screens/ConnectWallet";
import Faq from "./screens/Faq";
import Activity from "./screens/Activity";
import Search01 from "./screens/Search01";
import Search02 from "./screens/Search02";
import Profile from "./screens/Profile";
import ProfileEdit from "./screens/ProfileEdit";
import Item from "./screens/Item";
import PageList from "./screens/PageList";
import config from "./local-dev-config";
import veJSON from "./abis/ViridianExchange.json";
import vNFTJSON from "./abis/ViridianNFT.json";
import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

function App() {
    const [listings, setListings] = useState([]);
    const [nfts, setNfts] = useState([]);
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
                        //alert(JSON.stringify(resJson));
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
        //alert(JSON.stringify(props))
        //alert('called');

        //console.log('Getting owned NFTs');
        await getListings().then(async (e) => {
            console.log("Listings: " + JSON.stringify(e));
            await setListings(e);

            //setFetchedAndParsed(false);
            //alert(listings);
        });


        //await parseListing(listings[0]);

        if (listings) {
            //alert("WENIS")
            //alert(listings)
            for (let i = 0; i < listings.length; i++) {
                // await nfts.forEach((nft, i) => {
                //   extractMetadata(nft, i)
                // });
                let listing = listings[i];
                //alert(listing);
                console.log("LSTNG: " + listing)
                if(listing && !listing.name) {
                    await parseListing(await getListingFromId(listing));
                }
            }
        }

        //alert(nftsCopy);

        setNfts(nftsCopy);

        //setListings(nftsCopy);
        if (!fetchedAndParsed) {
            setFetchedAndParsed(true);
        }
    }, [fetchedAndParsed]);



  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Page>
              <Home listings={listings} setListings={setListings} nfts={nfts} />
            </Page>
          )}
        />
        <Route
          exact
          path="/upload-variants"
          render={() => (
            <Page>
              <UploadVariants />
            </Page>
          )}
        />
          <Route
              exact
              path="/paypal"
              render={() => (
                  <Page>
                      <PayPal/>
                  </Page>
              )}
          />
        <Route
          exact
          path="/upload-details"
          render={() => (
            <Page>
              <UploadDetails />
            </Page>
          )}
        />
        <Route
          exact
          path="/connect-wallet"
          render={() => (
            <Page>
              <ConnectWallet />
            </Page>
          )}
        />
        <Route
          exact
          path="/faq"
          render={() => (
            <Page>
              <Faq />
            </Page>
          )}
        />
        <Route
          exact
          path="/activity"
          render={() => (
            <Page>
              <Activity />
            </Page>
          )}
        />
        <Route
          exact
          path="/search01"
          render={() => (
            <Page>
              <Search01 listings={listings} setListings={setListings} nfts={nfts} />
            </Page>
          )}
        />
        <Route
          exact
          path="/search02"
          render={() => (
            <Page>
              <Search02 listings={listings} setListings={setListings} nfts={nfts} />
            </Page>
          )}
        />
        <Route
          exact
          path="/profile"
          render={() => (
            <Page>
              <Profile />
            </Page>
          )}
        />
        <Route
          exact
          path="/profile-edit"
          render={() => (
            <Page>
              <ProfileEdit />
            </Page>
          )}
        />
        <Route
          exact
          path="/item/:id"
          render={() => (
            <Page>
              <Item />
            </Page>
          )}
        />
        <Route
          exact
          path="/pagelist"
          render={() => (
            <Page>
              <PageList />
            </Page>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
