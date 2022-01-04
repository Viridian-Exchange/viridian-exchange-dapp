import config from "../local-dev-config";
import vTJSON from "../abis/ViridianToken.json";
import Web3 from "web3";
import {Biconomy} from "@biconomy/mexa";
//let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");

const biconomy = new Biconomy(Web3.givenProvider || new Web3.providers.HttpProvider( "https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b"),{apiKey: "O5RPM2y3A.bab3f010-10fb-47e4-8fa7-1efae42ab1b5", debug: true});

let web3 = new Web3(biconomy);

// biconomy.onEvent(biconomy.READY, () => {
//     // Initialize your dapp here like getting user accounts etc
//     alert("initialized");
// }).onEvent(biconomy.ERROR, (error, message) => {
//     // Handle error while initializing mexa
//     alert(error);
// });

export async function approve(from, exchangeAddress, amount) {
    const vTContractAddress = config.mumbai_contract_addresses.vt_contract;

    let vTABI = new web3.eth.Contract(vTJSON['abi'], vTContractAddress);

    return await vTABI.methods.approve(exchangeAddress, amount.toString()).send.request({from: from, signatureType: biconomy.EIP712_SIGN});
}