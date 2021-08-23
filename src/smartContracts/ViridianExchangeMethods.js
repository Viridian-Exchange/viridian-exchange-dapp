import config from "../local-dev-config";
import veJSON from "../abis/ViridianExchange.json";
import vtJSON from "../abis/ViridianToken.json";
import Web3 from "web3";
import {approve} from "./ViridianTokenMethods";
import { isApprovedForAll, setApprovalForAll } from "./ViridianNFTMethods";


let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

// export async function getUsers() {
//     const veContractAddress = config.dev_contract_addresses.ve_contract;
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
//     const veContractAddress = config.dev_contract_addresses.ve_contract;
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
//     const veContractAddress = config.dev_contract_addresses.ve_contract;
//
//     let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
//     let users = veABI.methods.getUserFromAddress(userAddr).call();
//
//     //alert(nft);
//
//     return users;
// }

export async function acceptOfferWithVEXT(from, _offerId, _toAmount) {
    const veContractAddress = config.dev_contract_addresses.ve_contract;

    //alert(from);

    const batch = new web3.BatchRequest();

    await isApprovedForAll(from, veContractAddress).then(async (isApproved) => {
        alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setApprovalForAll(from, veContractAddress));
        }});

    batch.add(await approve(from, veContractAddress, _toAmount));

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    //alert(JSON.stringify(e));
    //alert(web3.eth.accounts[0]);
    batch.add(await veABI.methods.acceptOfferWithVEXT(_offerId).send.request({from: from}));

    return batch.execute();
}

export async function getOffers() {
    const veContractAddress = config.dev_contract_addresses.ve_contract;

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let offers = await veABI.methods.getOffers().call();

    //alert(JSON.stringify(users));

    return offers;
}

export async function getOffersFromUser(_account) {
    const veContractAddress = config.dev_contract_addresses.ve_contract;

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let offers = await veABI.methods.getOffersFromUser(_account).call();

    //alert(JSON.stringify(users));

    return offers;
}

export async function putUpForSale(from, _nftId, _price, _royalty, _endTime) {
    const veContractAddress = config.dev_contract_addresses.ve_contract;
    const batch = new web3.BatchRequest();
    //alert(await isApprovedForAll(from, veContractAddress));
    await isApprovedForAll(from, veContractAddress).then(async (isApproved) => {
        alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setApprovalForAll(from, veContractAddress));
        }});

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    console.log(veABI.methods);
    //alert(web3.eth.accounts[0]);
    try {
        batch.add(await veABI.methods.putUpForSale(_nftId, _price, _royalty, _endTime, true).send.request({from: from}));
        batch.execute();
    } catch(e) {
        alert(e);
    }
}

export async function buyNFTWithVEXT(from, _listingId, amount) {
    const veContractAddress = config.dev_contract_addresses.ve_contract;
    const vtContractAddress = config.dev_contract_addresses.vt_contract;
    const batch = new web3.BatchRequest();
    //alert(from);

    await isApprovedForAll(from, veContractAddress).then(async (isApproved) => {
        alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setApprovalForAll(from, veContractAddress));
        }});

    batch.add(await approve(from, veContractAddress, amount));

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let vtABI = new web3.eth.Contract(vtJSON['abi'], vtContractAddress);
    //alert(await vtABI.methods.balanceOf(from) + " vs. " + amount);
    //alert(JSON.stringify(e));
    //alert(web3.eth.accounts[0]);
    batch.add(await veABI.methods.buyNFTWithVEXT(_listingId).send.request({from: from}));
    return batch.execute();
}

export async function pullFromSale(from, _listingId, price) {
    const veContractAddress = config.dev_contract_addresses.ve_contract;
    const vtContractAddress = config.dev_contract_addresses.vt_contract;

    const batch = new web3.BatchRequest();

    let vtABI = new web3.eth.Contract(veJSON['abi'], vtContractAddress);

    batch.add(await approve(from, veContractAddress, vtABI.methods.allowance(from, veContractAddress) - price));

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);

    batch.add(await veABI.methods.pullFromSale(_listingId).send({from: from}));

    return batch.execute();
}

export async function makeOffer(from, _to, _nftIds, _amount, _recNftIds, _recAmount, isVEXT) {
    const veContractAddress = config.dev_contract_addresses.ve_contract;

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);

    const batch = new web3.BatchRequest();

    await isApprovedForAll(from, veContractAddress).then(async (isApproved) => {
        alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setApprovalForAll(from, veContractAddress));
        }});

    batch.add(await approve(from, veContractAddress, _amount));
    batch.add(await veABI.methods.makeOffer(_to, _nftIds, _amount, _recNftIds, _recAmount, isVEXT).send.request({from: from}));

    batch.execute();
}