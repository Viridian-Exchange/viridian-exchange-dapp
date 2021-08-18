import config from "../local-dev-config";
import veJSON from "../abis/ViridianExchange.json";
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

export async function getOffers() {
    const veContractAddress = config.dev_contract_addresses.ve_contract;

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let offers = await veABI.methods.getOffers().call();

    //alert(JSON.stringify(users));

    return offers;
}

export async function putUpForSale(from, _nftId, _price, _royalty, _endTime) {
    const veContractAddress = config.dev_contract_addresses.ve_contract;
    //alert(await isApprovedForAll(from, veContractAddress));
    await isApprovedForAll(from, veContractAddress).then(async (isApproved) => {
        //alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            await setApprovalForAll(from, veContractAddress);
        }});

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    console.log(veABI.methods);
    //alert(web3.eth.accounts[0]);
    try {
        await veABI.methods.putUpForSale(_nftId, _price, _royalty, _endTime, true).send({from: from});
    } catch(e) {
        alert(e);
    }
}

export async function buyNFTWithVEXT(from, _listingId, amount) {
    const veContractAddress = config.dev_contract_addresses.ve_contract;

    //alert(from);

    await isApprovedForAll(from, veContractAddress).then(async (isApproved) => {
        //alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            await setApprovalForAll(from, veContractAddress);
        }});

    await approve(from, veContractAddress, amount).then(async (e) => {
        let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
        alert(JSON.stringify(e));
        //alert(web3.eth.accounts[0]);
        return await veABI.methods.buyNFTWithVEXT(_listingId).send({from: from});
    });
}

export async function pullFromSale(from, _listingId) {
    const veContractAddress = config.dev_contract_addresses.ve_contract;

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);

    return await veABI.methods.pullFromSale(_listingId).send({from: from});
}

export async function makeOffer(from, _to, _nftIds, _amount, _recNftIds, _recAmount, isVEXT) {
    const veContractAddress = config.dev_contract_addresses.ve_contract;

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);

    return await veABI.methods.makeOffer(_to, _nftIds, _amount, _recNftIds, _recAmount, isVEXT).send({from: from});
}