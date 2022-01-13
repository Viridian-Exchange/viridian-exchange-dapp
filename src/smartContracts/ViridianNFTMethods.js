import config from "../local-dev-config";
import vNFTJSON from "../abis/ViridianNFT.json";
import Web3 from "web3";

import {Biconomy} from "@biconomy/mexa";

const biconomy = new Biconomy(Web3.givenProvider || new Web3.providers.HttpProvider( "https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b"),{apiKey: "O5RPM2y3A.bab3f010-10fb-47e4-8fa7-1efae42ab1b5", debug: true});

let web3 = new Web3(biconomy);

//let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b"));

export async function tokenURI(tokenId) {
    const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    //console.log("ABIMETHODS: " + tokenId);
    let nft = vNFTABI.methods.tokenURI(tokenId).call();

    //alert(nft);

    return nft;
}

export async function ownerOf(tokenId) {
    const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    //console.log("ABIMETHODS1: " + tokenId);
    let owner = await vNFTABI.methods.ownerOf(tokenId).call();

    //alert(nft);

    return owner;
}

export async function ownerOfNoReq(tokenId) {
    const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    //console.log("ABIMETHODS2: " + tokenId);
    let owner = await vNFTABI.methods.ownerOf(tokenId).call();

    //alert(nft);

    return owner;
}

export async function setApprovalForAll(from, exchangeAddress) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    return await vNFTABI.methods.setApprovalForAll(exchangeAddress, true).send({from: from, signatureType: biconomy.EIP712_SIGN});
}

export async function isApprovedForAll(owner, operator) {
    const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);

    return await vNFTABI.methods.isApprovedForAll(owner, operator).call();
}

export async function safeTransferFrom(from, to, tokenId) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);

    return await vNFTABI.methods.safeTransferFrom(from, to, tokenId).send({from: from, signatureType: biconomy.EIP712_SIGN});
}

export async function burn(from, tokenId) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);

    return await vNFTABI.methods.burn(tokenId).send({from: from, signatureType: biconomy.EIP712_SIGN});
}