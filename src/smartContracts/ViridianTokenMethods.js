import config from "../local-dev-config";
import vTJSON from "../abis/ViridianToken.json";
import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");

export async function approve(from, exchangeAddress, amount) {
    const vTContractAddress = config.mumbai_contract_addresses.vt_contract;

    let vTABI = new web3.eth.Contract(vTJSON['abi'], vTContractAddress);

    return await vTABI.methods.approve(exchangeAddress, amount.toString()).send.request({from: from});
}