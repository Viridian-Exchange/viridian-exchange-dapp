import config from "../local-dev-config";
import vpJSON from "../abis/ViridianPack.json";
import Web3 from "web3";
import {Biconomy} from "@biconomy/mexa";

// const biconomy = new Biconomy(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b"),{apiKey: "-nNjhfDOJ.9faedf33-0521-4590-b5a6-9dec5319d742", debug: true});
//
// let web3 = new Web3(biconomy);

let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b"));

export async function openPack(packId, account, setRevealing, setCards) {
    const vpContractAddress = config.mumbai_contract_addresses.vp_contract;
    let vpABI = new web3.eth.Contract(vpJSON['abi'], vpContractAddress);

    await vpABI.methods.openPack(packId).send({from: account});
    //     .then(async transaction => {
    //     ////console.log("transaction: " + JSON.stringify(transaction));
    //
    //     //let uris = [];
    //     await vpABI.getPastEvents("Open", {},
    //         (errors, events) => {
    //             if (!errors) {
    //                 ////console.log(events);
    //                 //alert(JSON.stringify(events[0]));
    //                 //alert(events[0].returnValues["0"]);
    //                 return events[0].returnValues["0"];
    //             }
    //         })
    //
    //     //setCards(uris);
    //     //setRevealing(true);
    // });
}

export async function lockInPackResult(packId, account, setRevealing, setCards) {
    const vpContractAddress = config.mumbai_contract_addresses.vp_contract;
    let vpABI = new web3.eth.Contract(vpJSON['abi'], vpContractAddress);

    await vpABI.methods.lockInPackResult(packId).send({from: account});
    //     .then(async transaction => {
    //     ////console.log("transaction: " + JSON.stringify(transaction));
    //
    //     //let uris = [];
    //     await vpABI.getPastEvents("Open", {},
    //         (errors, events) => {
    //             if (!errors) {
    //                 ////console.log(events);
    //                 //alert(JSON.stringify(events[0]));
    //                 //alert(events[0].returnValues["0"]);
    //                 return events[0].returnValues["0"];
    //             }
    //         })
    //
    //     //setCards(uris);
    //     //setRevealing(true);
    // });
}

export async function tokenPackURI(tokenId) {
    const vpContractAddress = config.mumbai_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vpContractAddress);
    //console.log("ABIMETHODS: " + tokenId);
    let nft = vNFTABI.methods.tokenURI(tokenId).call();

    //alert(nft);

    return nft;
}

export async function ownerOfPack(tokenId) {
    const vNFTContractAddress = config.mumbai_contract_addresses.vp_contract;

    //console.log("THIS IS BEING CALLED")

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vNFTContractAddress);
    //console.log("ABIMETHODS5: " + tokenId);
    let owner = await vNFTABI.methods.ownerOf(tokenId).call.request();

    //alert(owner);

    return owner;
}

export async function ownerOfPackNoReq(tokenId) {
    //console.log("THIS IS BEING CALLED")
    const vNFTContractAddress = config.mumbai_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vNFTContractAddress);
    //console.log("ABIMETHODS6: " + tokenId);
    let owner = await vNFTABI.methods.ownerOf(tokenId).call();

    //alert(owner);
    //alert(nft);

    return owner;
}

export async function setPackApprovalForAll(from, exchangeAddress) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.mumbai_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vNFTContractAddress);
    return await vNFTABI.methods.setApprovalForAll(exchangeAddress, true).send.request({from: from});
}

export async function isPackApprovedForAll(owner, operator) {
    const vNFTContractAddress = config.mumbai_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vNFTContractAddress);

    return await vNFTABI.methods.isApprovedForAll(owner, operator).call();
}

export async function safeTransferPackFrom(from, to, tokenId) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.mumbai_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vNFTContractAddress);

    return await vNFTABI.methods.safeTransferFrom(from, to, tokenId).send({from: from});
}

export async function burnPack(from, tokenId) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.mumbai_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vNFTContractAddress);

    return await vNFTABI.methods.burn(tokenId).send({from: from});
}