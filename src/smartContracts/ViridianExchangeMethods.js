import config from "../local-dev-config";
import veJSON from "../abis/ViridianExchange.json";
import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

export async function getUsers() {
    const veContractAddress = config.dev_contract_addresses.ve_contract;

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let users = await veABI.methods.getUsers().call();

    //alert(JSON.stringify(users));

    return users;
}

export async function signUpUser() {
    const veContractAddress = config.dev_contract_addresses.ve_contract;

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let users = veABI.methods.signUpUser().call();

    //alert(nft);

    return users;
}

export async function getUserFromAddress(userAddr) {
    const veContractAddress = config.dev_contract_addresses.ve_contract;

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let users = veABI.methods.getUserFromAddress(userAddr).call();

    //alert(nft);

    return users;
}