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
import vTJSON from "./abis/ViridianToken.json";
import BigNumber from "bignumber.js";
import { getUsers, signUpUser } from "../src/smartContracts/ViridianExchangeMethods";
let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

//TODO: show address, list of followers, description, etc on profile page
// function in the smart contract to add a user that is followed
// (triggered by follow button press-> calls the function which takes in an address and adds the user to the list of following)
// front end will pull the followee user and be able to show the profile on the initial user
// , and call in the CLI, once followers working, you will see another profile show up
// use item flow -> Profile/user flow
// get current user wallet, then abi->getuserfromaddress->return json of user struct
function App() {
    const [listings, setListings] = useState([]);
    const [nfts, setNfts] = useState([]);
    const [fetchedAndParsed, setFetchedAndParsed] = useState(false);
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState("");
    const [ethBalance, setEthBalance] = useState(0);
    const [vextBalance, setVextBalance] = useState(0);
    const nftsCopy = [];
    const [users, setUsers] = useState([]);

    const isMetaMaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        const {ethereum} = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    async function connectWallet() {
        try {
            // Will open the MetaMask UI
            // You should disable this button while the request is pending!
            await window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
                setAccount(accounts[0]);
                //alert(JSON.stringify(account));
            });
            //alert(JSON.stringify(web3));
            await web3.eth.getBalance(account).then(async (balance) =>
                await setEthBalance(round(balance * .000000000000000001, 4)));
            await setVextBalance(await getVEXTBalance());
            await setConnected(true);
            //alert(account);
            //await web3.eth.sign(web3.utils.sha3("test"), account, function (err, result) { console.log(err, result); });
        } catch (error) {
            console.error(error);
        }
    }

    async function getVEXTBalance() {
        const vtContractAddress = config.dev_contract_addresses.vt_contract;
        //console.log(JSON.stringify(vNFTJSON));
        let vtABI = new web3.eth.Contract(vTJSON['abi'], vtContractAddress);
        return await vtABI.methods.balanceOf(account).call();
    }

    function parseVextBalance(vextBalance) {
        //alert("BEF: " + vextBalance);
        vextBalance = new BigNumber(vextBalance);
        vextBalance = vextBalance.shiftedBy(-18);
        vextBalance = vextBalance.toNumber();
        //alert(vextBalance);
        //alert(vextBalance < 1000000.0);
        if (10000 < vextBalance && vextBalance < 1000000.0) {
            return (vextBalance / 1000).toFixed(2) + "K"
        }
        else if (vextBalance > 1000000.0) {
            //alert("DIV: " + vextBalance / 1000000)
            return (vextBalance / 1000000).toFixed(2) + "M"
        }
        else {
            return vextBalance.toFixed(2);
        }
    }

    const round = (number, decimalPlaces) => {
        const factorOfTen = Math.pow(10, decimalPlaces)
        return Math.round(number * factorOfTen) / factorOfTen
    }

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

    async function ownerOf(tokenId) {
        const vNFTContractAddress = config.dev_contract_addresses.vnft_contract;

        let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
        await console.log("ABIMETHODS: " + tokenId);
        let owner = vNFTABI.methods.ownerOf(tokenId).call();

        //alert(nft);

        return owner;
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
                    await ownerOf(listing.tokenId).then(async (owner) => {
                    if (res.ok) {
                        //alert("Owner OF: " + owner);
                        const resJson = await res.json();
                        //alert(JSON.stringify(resJson));
                        const newNFT = {listingId: listing.listingId, id: listing.tokenId, uri: resJson, owner: owner, price: listing.price}
                        console.log(newNFT);
                        nftsCopy.push(newNFT);
                    }
                });
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

        //alert(JSON.stringify(Web3.givenProvider));
        if (Web3.givenProvider) {
            //alert("Connecting wallet")
            await connectWallet();
            //await alert(connected);
            //connect().then(() => setConnected(true));
        }

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

        setUsers(await getUsers());
        console.log("USERS: " + await getUsers());
    }, [fetchedAndParsed]);



  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Page>
              <Home users={users} listings={listings} setListings={setListings} nfts={nfts} account={account} isListing={true} />
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
              <Search01 listings={listings} setListings={setListings} nfts={nfts} account={account} />
            </Page>
          )}
        />
        <Route
          exact
          path="/search02"
          render={() => (
            <Page>
              <Search02 listings={listings} setListings={setListings} nfts={nfts} account={account} />
            </Page>
          )}
        />
        <Route
          exact
          path="/profile/:address"
          render={() => (
            <Page>
              <Profile nfts={nfts} account={account} />
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
              <Item account={account}/>
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
