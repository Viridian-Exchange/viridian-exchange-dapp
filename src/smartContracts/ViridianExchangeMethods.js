import config from "../local-dev-config";
import veJSON from "../abis/ViridianExchange.json";
import voJSON from "../abis/ViridianExchangeOffers.json";
import vtJSON from "../abis/ViridianToken.json";
import Web3 from "web3";
import {approve} from "./ViridianTokenMethods";
import { isApprovedForAll, setApprovalForAll } from "./ViridianNFTMethods";
import { isPackApprovedForAll, setPackApprovalForAll } from "./ViridianPackMethods";
import {getWeb3Socket, toFixedBetter} from "../Utils";
import {Biconomy} from "@biconomy/mexa";

// import {
//     helperAttributes,
//     getDomainSeperator,
//     getDataToSignForPersonalSign,
//     getDataToSignForEIP712,
//     buildForwardTxRequest,
//     getBiconomyForwarderConfig
// } from './biconomyForwarderHelpers';

//let sigUtil = require("eth-sig-util"); // additional dependency

// This web3 instance is used to get user signature from connected wallet
let walletWeb3 = new Web3(window.ethereum);


let userAddress = '0x4A680E6c256efe9DDA9aC19A96e205f7791158Ee';
let networkId = '80001';
// || new Web3.providers.HttpProvider( "https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b")
const biconomy = new Biconomy(Web3.givenProvider || new Web3.providers.HttpProvider( "https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b"),{apiKey: "O5RPM2y3A.bab3f010-10fb-47e4-8fa7-1efae42ab1b5", debug: true});

let web3 = new Web3(biconomy);

// biconomy.onEvent(biconomy.READY, () => {
//     // Initialize your dapp here like getting user accounts etc
//     alert("initialized");
// }).onEvent(biconomy.ERROR, (error, message) => {
//     // Handle error while initializing mexa
//     alert(error);
// });

//Web3.givenProviderlet web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b"));


// export async function getUsers() {
//     const veContractAddress = config.ropsten_contract_addresses.ve_contract;
//
//     let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
//     //let users = await veABI.methods.getUsers().call();
//
//     //alert(JSON.stringify(users));
//
//     return [];
// }
//
// export async function signUpUser() {
//     const veContractAddress = config.ropsten_contract_addresses.ve_contract;
//
//     let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
//     let users = veABI.methods.signUpUser().call();
//
//     //alert(nft);
//
//     return users;
// }
//
// export async function getUserFromAddress(userAddr) {
//     const veContractAddress = config.ropsten_contract_addresses.ve_contract;
//
//     let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
//     let users = veABI.methods.getUserFromAddress(userAddr).call();
//
//     //alert(nft);
//
//     return users;
// }

export async function acceptOfferWithERC20(from, _offerId, _toAmount) {
    const voContractAddress = config.mumbai_contract_addresses.vo_contract;

    //alert(from);

    

    await isApprovedForAll(from, voContractAddress).then(async (isApproved) => {
        //alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            await setApprovalForAll(from, voContractAddress);
        }});

    await approve(from, voContractAddress, _toAmount);

    let voABI = new web3.eth.Contract(voJSON['abi'], voContractAddress);
    //alert(JSON.stringify(e));
    //alert(web3.eth.accounts[0]);
    await voABI.methods.acceptOfferWithERC20(_offerId).send({from: from, signatureType: biconomy.EIP712_SIGN});

    //return batch.execute();
}

export async function getOffers() {
    const voContractAddress = config.mumbai_contract_addresses.vo_contract;

    let voABI = new web3.eth.Contract(voJSON['abi'], voContractAddress);
    let offers = await voABI.methods.getOffers().call();

    //alert(JSON.stringify(users));

    return offers;
}

export async function getOffersFromUser(_account) {
    const voContractAddress = config.mumbai_contract_addresses.vo_contract;

    let voABI = new web3.eth.Contract(voJSON['abi'], voContractAddress);
    let offers = await voABI.methods.getOffersFromUser(_account).call();

    //alert(JSON.stringify(users));

    return offers;
}

export async function putUpForSale(from, _nftId, _price, _royalty, _endTime, _erc20Address) {
    const veContractAddress = config.mumbai_contract_addresses.ve_contract;
    const vtContractAddress = config.mumbai_contract_addresses.vt_contract;
    let vtABI = new web3.eth.Contract(vtJSON['abi'], vtContractAddress);
    

    let allowance = await vtABI.methods.allowance(from, veContractAddress).call();

    //alert("ALLOW: " + allowance);

    //if (isVEXT) {
       //await approve(from, veContractAddress, toFixedBetter(Number.parseInt(allowance) + Number.parseInt(_price)));
    //}
    //const web3Socket = await getWeb3Socket(web3);
    // //alert(await isApprovedForAll(from, veContractAddress));
    // await isApprovedForAll(from, veContractAddress).then(async (isApproved) => {
    //     //alert("APPR: " + JSON.stringify(isApproved));
    //     if (!isApproved) {
    //         await setApprovalForAll(from, veContractAddress);
    //     }});

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let event_res = false;

    //console.log(veABI.methods);


    //alert(web3.eth.accounts[0]);
    try {
        // if (!isVEXT) {
        //     batch.add(await veABI.methods.putUpForSale(_nftId, web3.utils.toWei(_price), _royalty, _endTime, _erc20Address, true).send.request({from: from}));
        //     await veABI.events.ItemListed({}).on('data', async function(event) {
        //         //console.log(event.returnValues);
        //         // Do something here
        //     }).on('err', console.error);
        //
        //
        //
        // }
        // else {
            //alert(_erc20Address);
            await veABI.methods.putUpForSale(_nftId, _price, _royalty, _endTime, _erc20Address, true).send({from: from, signatureType: biconomy.EIP712_SIGN});
            await veABI.events.ItemListed(function (err, result) {
                if (err) {
                    alert(err);
                }

                //console.log("LISTING SDFSD: " + JSON.stringify(result.returnValues));
                event_res = result.returnValues.listed;
            });

            // (function (err, result) {
            //     if (err) {
            //         alert(err);
            //     }
            //
            //     //console.log("LISTING SDFSD: " + JSON.stringify(result.returnValues));
            // });
        //}

        //     .on("ItemListed", (listingId, wallet, listed) => {
        //     alert(listed);
        // });


    } catch(e) {
        //alert(e);
    }


}

export async function putPackUpForSale(from, _nftId, _price, _royalty, _endTime, _erc20Address) {
    const veContractAddress = config.mumbai_contract_addresses.ve_contract;
    const vtContractAddress = config.mumbai_contract_addresses.vt_contract;
    let vtABI = new web3.eth.Contract(vtJSON['abi'], vtContractAddress);
    

    //let allowance = await vtABI.methods.allowance(from, veContractAddress).call();

    // alert("ALOW: " + Number.parseInt(allowance));
    // alert("PRICE: " + _price);
    //
    // alert(toFixedBetter(Number.parseInt(allowance) + Number.parseInt( _price)));

    //if (isVEXT) {
        //await approve(from, veContractAddress, toFixedBetter(Number.parseInt(allowance) + Number.parseInt(_price)));
    //}
    //alert(await isApprovedForAll(from, veContractAddress));
    // await isPackApprovedForAll(from, veContractAddress).then(async (isApproved) => {
    //     //alert("APPR: " + JSON.stringify(isApproved));
    //     if (!isApproved) {
    //         await setPackApprovalForAll(from, veContractAddress);
    //     }});

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let wsVeABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    //console.log(veABI.methods);
    //alert(web3.eth.accounts[0]);
    try {
        //alert("PACC: " + _nftId);
        // if (!isVEXT) {
        //     batch.add(await veABI.methods.putUpForSale(_nftId, web3.utils.toWei(_price), _royalty, _endTime, isVEXT, false).send.request({from: from}));
        // }
        // else {
            await veABI.methods.putUpForSale(_nftId, _price, _royalty, _endTime, _erc20Address, false).send({from: from, signatureType: biconomy.EIP712_SIGN});
        //}
        // batch.execute().then(async (e) => {
        //     //alert(e);
        // })


    } catch(e) {
        console.error(e);
    }
}

export async function buyNFTWithERC20(from, _listingId, amount) {
    const veContractAddress = config.mumbai_contract_addresses.ve_contract;
    const vtContractAddress = config.mumbai_contract_addresses.vt_contract;
    
    //alert(from);

    // await isApprovedForAll(from, veContractAddress).then(async (isApproved) => {
    //     //alert("APPR: " + JSON.stringify(isApproved));
    //     if (!isApproved) {
    //         await setApprovalForAll(from, veContractAddress);
    //     }});
    //
    // await isPackApprovedForAll(from, veContractAddress).then(async (isApproved) => {
    //     //alert("APPR: " + JSON.stringify(isApproved));
    //     if (!isApproved) {
    //         await setPackApprovalForAll(from, veContractAddress);
    //     }});

    await approve(from, veContractAddress, amount);

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    //let vtABI = new web3.eth.Contract(vtJSON['abi'], vtContractAddress);
    //alert(await vtABI.methods.balanceOf(from) + " vs. " + amount);
    //alert(JSON.stringify(e));
    //alert(web3.eth.accounts[0]);
    //alert(from);

    //alert("buy nft")

    //await veABI.methods.buyNFTWithERC20(_listingId).send({from: from, signatureType: biconomy.EIP712_SIGN});

    //return batch.execute();
}

export async function pullFromSale(from, _listingId, price, isETH) {
    const veContractAddress = config.mumbai_contract_addresses.ve_contract;
    const vtContractAddress = config.mumbai_contract_addresses.vt_contract;

    

    let vtABI = new web3.eth.Contract(vtJSON['abi'], vtContractAddress);

    let allowance = await vtABI.methods.allowance(from, veContractAddress).call();

    //alert("ALLOW " + toFixedBetter(Number.parseInt(price)));

    //alert("NEW ALLOW " + toFixedBetter(Number.parseInt(allowance)) - toFixedBetter(Number.parseInt(price)));

    if (!isETH) {
        await approve(from, veContractAddress, toFixedBetter(toFixedBetter(allowance) - toFixedBetter(price)));
    }

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);

    await veABI.methods.pullFromSale(_listingId).send({from: from, signatureType: biconomy.EIP712_SIGN});

    // await tx.on("transactionHash", function (hash) {
    //     console.log(`Transaction hash is ${hash}`);
    //     alert(`Transaction sent. Waiting for confirmation ..`);
    // }).once("confirmation", function (confirmationNumber, receipt) {
    //     console.log(receipt);
    //     console.log(receipt.transactionHash);
    //     //do something with transaction hash
    // });

    //return batch.execute();
}

export async function makeOffer(from, _to, _nftIds, _packIds, _amount, _recNftIds, _recPackIds, _recAmount, _erc20Address, expirationTime) {
    const voContractAddress = config.mumbai_contract_addresses.vo_contract;

    //alert(1);

    let voABI = new web3.eth.Contract(voJSON['abi'], voContractAddress);

    //alert(2);

    

    //alert(3);

    await isApprovedForAll(from, voContractAddress).then(async (isApproved) => {
        //alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            await setApprovalForAll(from, voContractAddress);
        }});

    await isPackApprovedForAll(from, voContractAddress).then(async (isApproved) => {
        //alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            await setPackApprovalForAll(from, voContractAddress);
        }});

    //alert(4);

    //if (_isVEXT) {
        await approve(from, voContractAddress, toFixedBetter(_amount));
    //}

    //alert(from);
   // if (_isVEXT) {
       await voABI.methods.makeOffer(_to, _nftIds, _packIds, _amount, _recNftIds, _packIds, _recAmount, _erc20Address, expirationTime).send({from: from, signatureType: biconomy.EIP712_SIGN});
    // } else {
    //     batch.add(await voABI.methods.makeOffer(_to, _nftIds, _packIds, web3.utils.toWei(_amount), _recNftIds, _packIds, web3.utils.toWei(_recAmount), _isVEXT, expirationTime).send.request({from: from}));
    // }

    //alert(6);

    //return batch.execute();
}