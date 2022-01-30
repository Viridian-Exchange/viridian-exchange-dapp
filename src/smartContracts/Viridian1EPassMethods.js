import config from "../local-dev-config";
import vNFTJSON from "../abis/Viridian1EPass.json";
import Web3 from "web3";

import {Biconomy} from "@biconomy/mexa";

let web3 = new Web3(Web3.givenProvider);

// export async function tokenURI(tokenId) {
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//     //console.log("ABIMETHODS: " + tokenId);
//     let nft = vNFTABI.methods.tokenURI(tokenId).call();
//
//     //alert(nft);
//
//     return nft;
// }
//
// export async function ownerOf(tokenId) {
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//     //console.log("ABIMETHODS1: " + tokenId);
//     let owner = await vNFTABI.methods.ownerOf(tokenId).call();
//
//     //alert(nft);
//
//     return owner;
// }
//
// export async function ownerOfNoReq(tokenId) {
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//     //console.log("ABIMETHODS2: " + tokenId);
//     let owner = await vNFTABI.methods.ownerOf(tokenId).call();
//
//     //alert(nft);
//
//     return owner;
// }
//
// export async function setApprovalForAll(from, exchangeAddress) {
//     //alert("Setting approval to " + from + " for " + exchangeAddress);
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//     return await vNFTABI.methods.setApprovalForAll(exchangeAddress, true).send({from: from});
// }

export async function mint(from, numMint) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.rinkeby_contract_addresses.v1ep_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    return await vNFTABI.methods.mint(numMint).send({from: from, value: (1000000000000000000 * numMint).toString()});
}

export async function getNumNFTs(from) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.rinkeby_contract_addresses.v1ep_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    return await vNFTABI.methods.getNumNFTs().call();
}

//
// export async function isApprovedForAll(owner, operator) {
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//
//     return await vNFTABI.methods.isApprovedForAll(owner, operator).call();
// }

// export async function safeTransferFrom(from, to, tokenId) {
//     //alert("Setting approval to " + from + " for " + exchangeAddress);
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//
//     return await vNFTABI.methods.safeTransferFrom(from, to, tokenId).send({from: from});
// }
//
// export async function burn(from, tokenId) {
//     //alert("Setting approval to " + from + " for " + exchangeAddress);
//     const vNFTContractAddress = config.mumbai_contract_addresses.vnft_contract;
//
//     let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
//
//     return await vNFTABI.methods.burn(tokenId).send({from: from, signatureType: biconomy.EIP712_SIGN});
// }