import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import '@progress/kendo-theme-default/dist/all.css';
import "./styles/app.sass";
import Page from "./components/Page";
import Home from "./screens/Home";
import PayPal from "./screens/BuyCrypto";
import UploadVariants from "./screens/Unused-Screens/UploadVariants";
import UploadDetails from "./screens/Unused-Screens/UploadDetails";
import ConnectWallet from "./screens/Unused-Screens/ConnectWallet";
import Faq from "./screens/Faq";
import Activity from "./screens/Unused-Screens/Activity";
import Search01 from "./screens/Search01";
import Search02 from "./screens/Search02";
import OfferScreen from "./screens/OfferScreen";
import Profile from "./screens/Profile";
import ProfileEdit from "./screens/ProfileEdit";
import Drops from "./screens/Unused-Screens/Drops";
import Item from "./screens/Item";
import PageList from "./screens/Unused-Screens/PageList";
import config from "./local-dev-config";
import veJSON from "./abis/ViridianExchange.json";
import vNFTJSON from "./abis/ViridianNFT.json";
import Web3 from "web3";
import vTJSON from "./abis/ViridianToken.json";
import BigNumber from "bignumber.js";
import Modal from "./components/Modal";
import {FetchAllUsers, FetchUser, HandleAddUser, HandleAddUserSimple, HandleUpdateUser} from "./apis/UserAPI";
import {
    useCryptoPrices,
    CryptoPriceProvider
} from "react-realtime-crypto-prices";
import {ownerOfPackNoReq} from "./smartContracts/ViridianPackMethods";
import posthog from 'posthog-js';
import  { Breakpoint, BreakpointProvider } from 'react-socks';
import Fortmatic from 'fortmatic';
import AnimatedPopup from "./components/AnimatedPopup";
import CardInspector from "./components/3DViewer";

// const customNodeOptions = {
//     rpcUrl: 'https://matic-mumbai.chainstacklabs.com/', // your own node url
//     chainId: 80001 // chainId of your own node
// }
//
// const fm = new Fortmatic('pk_test_D8DEF2FF56CA7957');//, customNodeOptions);
//
// let web3Fort = new Web3(fm.getProvider());
//
// web3Fort.currentProvider.enable();

posthog.init("phc_xnVfYWTOySi1xgfxvO4GQR4HaJi2ZSI156QXjxHVdh1", {api_host: 'https://app.posthog.com'});



let web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");





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
    const [ownedNfts, setOwnedNfts] = useState([]);
    const [ownedPacks, setOwnedPacks] = useState([]);
    const [fetchedAndParsed, setFetchedAndParsed] = useState(false);
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState("");
    const [ethBalance, setEthBalance] = useState(0);
    const [ethBalanceUSD, setEthBalanceUSD] = useState(0);
    const [wethBalance, setWethBalance] = useState(0);
    const [userInfo, setUserInfo] = useState({});
    const [promptSetup, setPromptSetup] = useState(false);
    const [promptInstallMetamask, setPromptInstallMetamask] = useState(false);
    const [userFetched, setUserFetched] = useState(false);
    const [checkUserPrompt, setCheckUserPrompt] = useState(false);
    const nftsCopy = [];
    const [users, setUsers] = useState([]);
    const [initialLoaded, setInitialLoaded] = useState(false);
    const [filteredNfts, setFilteredNFTs] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    //const [nftsSet, setNftsSet] = useState(false);
    let nftsSet = false;

    //const history = useHistory();
    //const location = useLocation();

    const isMetaMaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        const {ethereum} = window;
        if (!Boolean(ethereum && ethereum.isMetaMask)) {
            setPromptInstallMetamask(true);
        }
    };

    //TODO: Figure out how to call this from aws to avoid the cors error
    const fetchCurrencyData = () => {
        axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10')
            .then(response => {
                const wanted = ['ethereum']
                const result = response.data.filter(currency =>
                    wanted.includes(currency.id),
                )
                //alert(JSON.stringify(result));
            })
            .catch(err => console.log(err))
    }

    async function newUserCheck(account_from_eth) {

            let res = await FetchUser(setUserInfo, account_from_eth);
            if (!res) {
                await setPromptSetup(true);
                //alert("New user!")
                return true;
            }

            //alert(JSON.stringify(history))
        //history.replace(location.pathname, { state: "penis"});


            //     .then(async (res) => {
            //

            //
            // })


        // if (connected && (JSON.stringify(userInfo)) === "{}") {
        //     await setPromptSetup(true);
        //
        //
        // }
        return false;
    }

    async function connectWallet() {
        try {
            // Will open the MetaMask UI
            // You should disable this button while the request is pending!
            //alert('connecting wallet')
            await window.ethereum.request({ method: 'eth_requestAccounts' }).then(async (accounts) => {
                //alert(JSON.stringify(accounts));
                setAccount(accounts[0]);
                if (accounts[0]) {
                    //alert(accounts[0]);
                    await setConnected(true);
                    posthog.identify(account);
                    if (account && connected) {
                        await newUserCheck(accounts[0]);
                    }

                    // if (!(await newUserCheck())) {
                    //     await FetchUser(setUserInfo, accounts[0]);
                    // }

                }
                // else {
                //    // alert("Prompt Metamask");
                //     setPromptInstallMetamask(true);
                // }
                //alert(JSON.stringify(account));
            });

            //TODO: Figure out a way to cleanly prompt adding these assets
            // const wasAdded = await ethereum.request({
            //     method: 'wallet_watchAsset',
            //     params: {
            //         type: 'ERC20', // Initially only supports ERC20, but eventually more!
            //         options: {
            //             address: tokenAddress, // The address that the token is at.
            //             symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            //             decimals: tokenDecimals, // The number of decimals in the token
            //             image: tokenImage, // A string url of the token logo
            //         },
            //     },
            // });

            // Check if MetaMask is installed
            // MetaMask injects the global API into window.ethereum
            if (window.ethereum) {
                try {
                    // check if the chain to connect to is installed
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x13881' }], // chainId must be in hexadecimal numbers
                    });
                } catch (error) {
                    // This error code indicates that the chain has not been added to MetaMask
                    // if it is not, then install it into the user MetaMask
                    if (error.code === 4902) {
                        //alert('hi')
                        try {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainName: 'Polygon Mumbai Testnet',
                                        chainId: '0x13881',
                                        nativeCurrency: {
                                            name: 'Polygon',
                                            symbol: 'MATIC',
                                            decimals: 18
                                        },
                                        rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
                                        blockExplorerUrls: ['https://mumbai.polygonscan.com/']
                        },
                                ],
                            });
                        } catch (addError) {
                            console.log("ADD ERROR:")
                            console.error(addError);
                        }
                    }
                    console.error(error);
                }
            } else {
                // if no window.ethereum then MetaMask is not installed
                alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
            }


            //alert(JSON.stringify(web3));
            await setConnected(true);
            // await web3.eth.getBalance(account).then(async (balance) =>
            //     await setEthBalance(round(balance * .000000000000000001, 4)));
            await web3.eth.getBalance(account, async function(err, result) {
                if (err) {
                    //console.log(err)
                } else {
                    //alert(web3.utils.fromWei(result, "ether"))
                    //alert('fetchingData');
                    //fetchCurrencyData();
                    setEthBalance(await getVEXTBalance());
                }
            })

            //alert("Getting vext balancealert(\"1\")")
            await setWethBalance(await getVEXTBalance());


            // await setUserInfo(await getUserInfo());





            //alert(account);
            //await web3.eth.sign(web3.utils.sha3("test"), account, function (err, result) { //console.log(err, result); });
        } catch (error) {
            //alert("cannot connect")
            //console.error(error);
        }
    }


    async function getVEXTBalance() {
        //alert("2")
        const vtContractAddress = config.mumbai_contract_addresses.vt_contract;
        ////console.log(JSON.stringify(vNFTJSON));
        let vtABI = new web3.eth.Contract(vTJSON['abi'], vtContractAddress);
        return await vtABI.methods.balanceOf(account).call();
    }

    function parseVextBalance(vextBalance) {
        //alert("BEF: " + wethBalance);
        vextBalance = new BigNumber(vextBalance);
        vextBalance = vextBalance.shiftedBy(-18);
        vextBalance = vextBalance.toNumber();
        //alert(wethBalance);
        //alert(wethBalance < 1000000.0);
        if (10000 < vextBalance && vextBalance < 1000000.0) {
            return (vextBalance / 1000).toFixed(2) + "K"
        }
        else if (vextBalance > 1000000.0) {
            //alert("DIV: " + wethBalance / 1000000)
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
        const veContractAddress = config.mumbai_contract_addresses.ve_contract;
        ////console.log(JSON.stringify(vNFTJSON));
        let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
        //console.log("ABIMETHODS");
        //console.log(veABI.methods);
        return await veABI.methods.getListings().call();
    }

    async function getListingFromId(listingId) {
        const veContractAddress = config.mumbai_contract_addresses.ve_contract;
        ////console.log(JSON.stringify(vNFTJSON));
        let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
        // await //console.log("ABIMETHODS");
        //console.log(veABI.methods);
        return await veABI.methods.getListingFromId(listingId).call();
    }

    async function tokenURI(tokenId) {
        const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;

        let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
        //console.log("ABIMETHODS: " + tokenId);
        let nft = vNFTABI.methods.tokenURI(tokenId).call();

        //alert(nft);

        return nft;
    }

    async function packURI(tokenId) {
        const vpContractAddress = config.mumbai_contract_addresses.vp_contract;
        let vpABI = new web3.eth.Contract(vNFTJSON['abi'], vpContractAddress);
        //alert(JSON.stringify(vnftABI.methods));
        let nft = vpABI.methods.tokenURI(tokenId).call();

        //alert(nft);

        return nft;
    }

    async function ownerOf(tokenId) {
        const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;

        let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
        //console.log("ABIMETHODSAPP: " + tokenId);
        let owner = vNFTABI.methods.ownerOf(tokenId).call();

        //alert(nft);

        return owner;
    }

    async function getOwnedNFTs() {
        //alert('gettingOwnedNFTs');

        ////console.log(JSON.stringify(vNFTJSON));
        //alert(account);

        // NFT Contract Calls
        const vnftContractAddress = config.mumbai_contract_addresses.vnft_contract;
        let vnftABI = new web3.eth.Contract(vNFTJSON['abi'], vnftContractAddress);
        //alert(JSON.stringify(vnftABI.methods));
        //alert(account)
        let nftIds = await vnftABI.methods.getOwnedNFTs().call({from: account});
        let nfts = [];
        //alert(JSON.stringify(vnftABI.methods));

        // await //console.log(JSON.stringify(vNFTJSON['abi']));
        //console.log(vnftContractAddress);
        //console.log("test");

        if (nftIds) {
            //alert(JSON.stringify(nftIds));
            for (let i = 0; i < nftIds.length; i++) {
                let nftId = nftIds[i]
                let uri = await vnftABI.methods.tokenURI(nftId).call();
                ////console.log("XXX: " + uri);
                nfts.push({id: nftId, uri: uri});
            }

            //alert(nfts);
        }
        //alert(nftIds);
        //await //console.log(vnftABI.methods);


        ////console.log(nfts);

        if (!nftsSet) {
            //alert(JSON.stringify(nfts) + " & " + JSON.stringify(ownedNfts) + JSON.stringify(!nftsSet))
            setOwnedNfts(nfts);
            //setNftsSet(true);
        }
        //nftsSet = true;
    }


    async function getOwnedPacks() {
        //alert('gettingOwnedNFTs');

        ////console.log(JSON.stringify(vNFTJSON));
        //alert(account);

        // NFT Contract Calls
        const vpContractAddress = config.mumbai_contract_addresses.vp_contract;
        let vpABI = new web3.eth.Contract(vNFTJSON['abi'], vpContractAddress);
        //alert(JSON.stringify(vnftABI.methods));
        let nftIds = await vpABI.methods.getOwnedNFTs().call({from: account});
        let nfts = [];

        // await //console.log(JSON.stringify(vNFTJSON['abi']));
        //console.log(vpContractAddress);
        //console.log("test");

        if (nftIds) {
            //alert(JSON.stringify(nftIds));
            for (let i = 0; i < nftIds.length; i++) {
                let nftId = nftIds[i]
                let uri = await vpABI.methods.tokenURI(nftId).call();
                //alert("XXX: " + uri);
                nfts.push({id: nftId, uri: uri});
            }

            //alert(nfts);
        }
        //alert(nftIds);
        //await //console.log(vnftABI.methods);


        ////console.log(nfts);

        if (ownedPacks.length === 0) {
            setOwnedPacks(nfts);
        }
    }

    async function parseListing(listing) {
        ////console.log('Fetching from uri: ' + JSON.stringify(listing.tokenId));
        //const extractedObject =calert(listing)
        if (listing) {
            //alert(JSON.stringify(listing.isVEXT));
            if (listing.isVNFT) {
                await tokenURI(listing.tokenId).then(async (e) => {
                    //console.log("FETCHING THIS: " + JSON.stringify(e));
                    await fetch(e, {
                        mode: "cors",
                        method: "GET"
                    }).then(async (res) => {
                        //console.log(res);
                        //console.log(res.status);
                        await ownerOf(listing.tokenId).then(async (owner) => {
                            if (res.ok) {
                                //alert("Owner OF: " + owner);
                                const resJson = await res.json();
                                //alert(JSON.stringify(resJson));
                                const newNFT = {
                                    listingId: listing.listingId,
                                    id: listing.tokenId,
                                    uri: resJson,
                                    owner: owner,
                                    price: listing.price,
                                    isVNFT: listing.isVNFT,
                                    isETH: !listing.isVEXT
                                }
                                //console.log(newNFT);
                                nftsCopy.push(newNFT);
                            }
                        });
                    });
                });
            }
            else {
                await packURI(listing.tokenId).then(async (e) => {
                    //console.log("FETCHING THIS: " + JSON.stringify(e));
                    await fetch(e, {
                        mode: "cors",
                        method: "GET"
                    }).then(async (res) => {
                        //console.log(res);
                        //console.log(res.status);
                        await ownerOfPackNoReq(listing.tokenId).then(async (owner) => {
                            if (res.ok) {
                                //alert("Owner OF: " + owner);
                                const resJson = await res.json();
                                //alert(JSON.stringify(resJson));
                                const newNFT = {
                                    listingId: listing.listingId,
                                    id: listing.tokenId,
                                    uri: resJson,
                                    owner: owner,
                                    price: listing.price,
                                    isVNFT: listing.isVNFT,
                                    isETH: !listing.isVEXT
                                }
                                //console.log(newNFT);
                                nftsCopy.push(newNFT);
                            }
                        });
                    });
                });
            }
        }
        ////console.log("JSON: " + JSON.stringify(extractedObject));
        // listing['uri'] = await extractedObject;
        //nftCopy[i] = listing;
    }


    // useEffect(async () => {
    //     // Update the document title using the browser API
    //     //await alert(JSON.stringify(currentUser) + " vs. " + Auth.currentUserInfo().username);
    //     if (connected && account) {
    //         await FetchUser(setUserInfo, account, setPromptSetup).then(async (res) => {
    //                 await newUserCheck();
    //         });
    //     }
    //
    //
    //
    // }, [connected]);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [])


    useEffect(async () => {
        //alert(JSON.stringify(props));
        //alert('called');

        await FetchAllUsers(setUsers);

        //alert("hi")

        //console.log("USEEFF")


        if (!checkUserPrompt) {

            //alert(JSON.stringify(Web3.givenProvider));
            if (Web3.givenProvider) {
                //alert("Connecting wallet")
                await connectWallet();

                //await alert(connected);
                //connect().then(() => setConnected(true));
            }
        }

        isMetaMaskInstalled();

            ////console.log('Getting owned NFTs');

        // if (!listings) {
        //
        //     await getListings().then(async (e) => {
        //         //alert("Listings: " + JSON.stringify(e));
        //         await setListings(e);
        //
        //         //setFetchedAndParsed(false);
        //         //alert(listings);
        //     });
        // }

            //await parseListing(listings[0]);

        //
            //console.log('Getting owned NFTs');

            await getListings().then(async (e) => {
                //console.log("Listings: " + JSON.stringify(e));
                await setListings(e);

                //setFetchedAndParsed(false);
                //alert(listings);
            });
        //}

        if (ownedNfts.length === 0) {
            //await getOwnedNFTs();
        }

        if (ownedPacks.length === 0) {
            //await getOwnedPacks();
        }


            if (listings) {
                //alert("WENIS")
                //alert(listings)
                for (let i = 0; i < listings.length; i++) {
                    // await nfts.forEach((nft, i) => {
                    //   extractMetadata(nft, i)
                    // });
                    let listing = listings[i];
                    //alert(listing);
                    //console.log("LSTNG: " + listing)
                    if (listing && !listing.name) {
                        await parseListing(await getListingFromId(listing));
                    }

                }
            }

            setNfts(nftsCopy);

            //alert(JSON.stringify(nftsCopy))

            setFilteredNFTs(nftsCopy);

            //setListings(nftsCopy);
            if (!fetchedAndParsed) {
                setFetchedAndParsed(true);

            }

        if (fetchedAndParsed && !checkUserPrompt && connected && account) {
            setCheckUserPrompt(true);
        }





    }, [fetchedAndParsed, checkUserPrompt, connected]);


    useEffect(async () => {
        if (account) {
            //alert("AC: " + account);

            await getOwnedNFTs();
        }
    }, [account]);

    useEffect(async () => {
        if (account) {
            //alert("AC: " + account);
            await getOwnedPacks();
        }
    }, [account, fetchedAndParsed]);



  return (
      <CryptoPriceProvider >
          <BreakpointProvider>
    <Router forceRefresh={true}>
        <AnimatedPopup success={success} setSuccess={setSuccess} error={error} setError={setError}/>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} setOwnedNFTs={setOwnedPacks} setOwnedPacks={setOwnedNfts} users={users} ownedPacks={ownedPacks} ownedNFTs={ownedNfts} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={wethBalance} setVextBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
                {/*{"ON: " + JSON.stringify(users)}*/}
                <Home nfts={nfts} account={account} userInfo = {userInfo} setUserInfo = {setUserInfo} ownedNFTs = {ownedNfts} setOwnedNFTs = {setOwnedNfts}
                      ownedPacks = {ownedPacks} setOwnedPacks = {setOwnedPacks}
                  users = {users} listings={listings} setListings={setListings} nfts={nfts}
                    account={account} isListing={true} promptSetup = {promptSetup} setPromptSetup = {setPromptSetup} promptInstallMetamask = {promptInstallMetamask} setPromptInstallMetamask = {setPromptInstallMetamask}
              userInfo = {userInfo} setUserInfo = {setUserInfo} connected = {connected}/>
            </Page>
          )}
        />
        {/*<Route*/}
        {/*  exact*/}
        {/*  path="/upload-variants"*/}
        {/*  render={() => (*/}
        {/*    <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} wethBalance={wethBalance} setWethBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>*/}
        {/*      <UploadVariants />*/}
        {/*    </Page>*/}
        {/*  )}*/}
        {/*/>*/}
          <Route
              exact
              path="/BuyCrypto"
              render={() => (

                  <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={wethBalance} setVextBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
                      <PayPal/>
                  </Page>
              )}
          />
        <Route
          exact
          path="/upload-details"
          render={() => (
            <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={wethBalance} setVextBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
              <UploadDetails />
            </Page>
          )}
        />
        {/*<Route*/}
        {/*  exact*/}
        {/*  path="/connect-wallet"*/}
        {/*  render={() => (*/}
        {/*    <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} wethBalance={wethBalance} setWethBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>*/}
        {/*      <ConnectWallet wethBalance={wethBalance}/>*/}
        {/*    </Page>*/}
        {/*  )}*/}
        {/*/>*/}
      {/*<Route*/}
      {/*    exact*/}
      {/*    path="/drops"*/}
      {/*    render={() => (*/}
      {/*        <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} wethBalance={wethBalance} setWethBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>*/}
      {/*            <Drops />*/}
      {/*        </Page>*/}
      {/*    )}*/}
      {/*/>*/}
        <Route
          exact
          path="/faq"
          render={() => (
            <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={wethBalance} setVextBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
              <Faq />
            </Page>
          )}
        />
        <Route
          exact
          path="/activity"
          render={() => (
            <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} nfts={nfts} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={wethBalance} setVextBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
              <Activity />
            </Page>
          )}
        />
        <Route
          exact
          path="/search01"
          render={() => (
            <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={wethBalance} setVextBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
              <Search01 listings={listings} setListings={setListings} nfts={filteredNfts} account={account} />
            </Page>
          )}
        />
        {/*<Route*/}
        {/*  exact*/}
        {/*  path="/search02"*/}
        {/*  render={() => (*/}
        {/*    <Page users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} wethBalance={wethBalance} setWethBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>*/}
        {/*      <Search02 listings={listings} setListings={setListings} nfts={nfts} account={account} />*/}
        {/*    </Page>*/}
        {/*  )}*/}
        {/*/>*/}
        <Route
          exact
          path="/profile/:address"
          render={() => (
            <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} setOwnedNFTs={setOwnedPacks} setOwnedPacks={setOwnedNfts} users={users} ownedPacks={ownedPacks} ownedNFTs={ownedNfts} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={wethBalance} setVextBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
                {/*{JSON.stringify(users)}*/}
                <Profile users={users} cameFromHome={true} nfts={nfts} account={account} userInfo = {userInfo} setUserInfo = {setUserInfo} ownedNFTs = {ownedNfts} setOwnedNFTs = {setOwnedNfts} ownedPacks = {ownedPacks} setOwnedPacks = {setOwnedPacks} setFetchedAndParsed={setFetchedAndParsed} setSuccess={setSuccess} setError={setError} />
            </Page>
          )}
        />
        <Route
          exact
          path="/profile-edit"
          render={() => (
            <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={wethBalance} setVextBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
              <ProfileEdit account = {account} userInfo = {userInfo} setUserInfo = {setUserInfo} users = {users}/>
            </Page>
          )}
        />
        <Route
          exact
          path="/item/:type/:id"
          render={() => (
            <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={wethBalance} setVextBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
              <Item account={account} setSuccess={setSuccess} setError={setError} />
            </Page>
          )}
        />
          <Route
              exact
              path="/offer/:id"
              render={() => (
                  <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} vextBalance={wethBalance} setVextBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>
                      <OfferScreen account={account} setSuccess={setSuccess} setError={setError} />
                  </Page>
              )}
          />
        {/*<Route*/}
        {/*  exact*/}
        {/*  path="/pagelist"*/}
        {/*  render={() => (*/}
        {/*    <Page setPromptInstallMetamask = {setPromptInstallMetamask} users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} ethBalance={ethBalance} setEthBalance={setEthBalance} wethBalance={wethBalance} setWethBalance={setWethBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}>*/}
        {/*      <PageList />*/}
        {/*    </Page>*/}
        {/*  )}*/}
        {/*/>*/}
      <Route path="*">
          <Redirect to="/" />
      </Route>
      </Switch>
    </Router>
          </BreakpointProvider>
      </CryptoPriceProvider>
  );
}

export default App;
