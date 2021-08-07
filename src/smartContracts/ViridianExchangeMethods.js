import config from "../local-dev-config";
import veJSON from "../abis/ViridianExchange.json";
import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

export async function getUsers() {
    const vNFTContractAddress = config.dev_contract_addresses.vnft_contract;

    let veABI = new web3.eth.Contract(veJSON['abi'], vNFTContractAddress);
    let users = veABI.methods.getUsers().call();

    //alert(nft);

    return users;
}

export async function signUpUser() {
    const vNFTContractAddress = config.dev_contract_addresses.vnft_contract;

    let veABI = new web3.eth.Contract(veJSON['abi'], vNFTContractAddress);
    let users = veABI.methods.signUpUser().call();

    //alert(nft);

    return users;
}