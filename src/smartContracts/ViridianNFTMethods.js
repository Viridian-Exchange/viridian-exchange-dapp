import config from "../local-dev-config";
import vNFTJSON from "../abis/ViridianNFT.json";
import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

export async function tokenURI(tokenId) {
    const vNFTContractAddress = config.dev_contract_addresses.vnft_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    await console.log("ABIMETHODS: " + tokenId);
    let nft = vNFTABI.methods.tokenURI(tokenId).call();

    //alert(nft);

    return nft;
}

export async function ownerOf(tokenId) {
    const vNFTContractAddress = config.dev_contract_addresses.vnft_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    await console.log("ABIMETHODS: " + tokenId);
    let owner = vNFTABI.methods.ownerOf(tokenId).call();

    //alert(nft);

    return owner;
}