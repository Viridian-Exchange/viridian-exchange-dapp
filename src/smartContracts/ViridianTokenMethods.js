import config from "../local-dev-config";
import vTJSON from "../abis/MetaTransactionTokenABI.json";
import Web3 from "web3";
import {Biconomy} from "@biconomy/mexa";
let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");

//const biconomy = new Biconomy(Web3.givenProvider || new Web3.providers.HttpProvider( "https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b"),{apiKey: "O5RPM2y3A.bab3f010-10fb-47e4-8fa7-1efae42ab1b5", debug: true});

//let web3 = new Web3(biconomy);

// biconomy.onEvent(biconomy.READY, () => {
//     // Initialize your dapp here like getting user accounts etc
//     alert("initialized");
// }).onEvent(biconomy.ERROR, (error, message) => {
//     // Handle error while initializing mexa
//     alert(error);
// });

export async function approve(from, exchangeAddress, amount) {
    //const vTContractAddress = config.mumbai_contract_addresses.vt_contract;

    const vTContractAddress = config.mumbai_contract_addresses.vt_contract;

    let vTABI = new web3.eth.Contract(vTJSON, vTContractAddress);


    //TODO: Figure out why from is wrong
    alert(from);

    alert(await vTABI.methods.allowance(from, exchangeAddress).call());

    let approve_amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //(2^256 - 1 )

    let tx = await vTABI.methods.approve(exchangeAddress, '115792089237316195423570985008687907853269984665640564039457584007913129639935').send({from: from});//, signatureType: biconomy.EIP712_SIGN});

    // await tx.on("transactionHash", function (hash) {
    //     console.log(`Transaction hash is ${hash}`);
    //     alert(`Transaction sent. Waiting for confirmation ..`);
    // }).once("confirmation", function (confirmationNumber, receipt) {
    //     console.log(receipt);
    //     console.log(receipt.transactionHash);
    //     //do something with transaction hash
    // });

    await console.log(JSON.stringify(tx))

    return tx;
    //await console.log(JSON.stringify(tx))
}