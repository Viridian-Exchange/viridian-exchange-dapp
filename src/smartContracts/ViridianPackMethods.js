import config from "../local-dev-config";
import vpJSON from "../abis/ViridianPack.json";
import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

export async function openPack(packId, account, setRevealing, setCards) {
    const vpContractAddress = config.dev_contract_addresses.vp_contract;
    let vpABI = new web3.eth.Contract(vpJSON['abi'], vpContractAddress);

    await vpABI.methods.openPack(packId).send({from: account}).then(async transaction => {
        console.log("transaction: " + JSON.stringify(transaction));

        //let uris = [];
        await vpABI.getPastEvents("Open", {},
            (errors, events) => {
                if (!errors) {
                    console.log(events);
                    //alert(JSON.stringify(events[0]));
                    //alert(events[0].returnValues["0"]);
                    return events[0].returnValues["0"];
                }
            })

        //setCards(uris);
        //setRevealing(true);
    });
}

export async function tokenPackURI(tokenId) {
    const vpContractAddress = config.dev_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vpContractAddress);
    await console.log("ABIMETHODS: " + tokenId);
    let nft = vNFTABI.methods.tokenURI(tokenId).call();

    //alert(nft);

    return nft;
}

export async function ownerOfPack(tokenId) {
    const vNFTContractAddress = config.dev_contract_addresses.vp_contract;

    console.log("THIS IS BEING CALLED")

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vNFTContractAddress);
    await console.log("ABIMETHODS5: " + tokenId);
    let owner = await vNFTABI.methods.ownerOf(tokenId).call.request();

    //alert(owner);

    return owner;
}

export async function ownerOfPackNoReq(tokenId) {
    console.log("THIS IS BEING CALLED")
    const vNFTContractAddress = config.dev_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vNFTContractAddress);
    await console.log("ABIMETHODS6: " + tokenId);
    let owner = await vNFTABI.methods.ownerOf(tokenId).call();

    //alert(owner);
    //alert(nft);

    return owner;
}

export async function setApprovalForAll(from, exchangeAddress) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.dev_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vNFTContractAddress);
    return await vNFTABI.methods.setApprovalForAll(exchangeAddress, true).send.request({from: from});
}

export async function isApprovedForAll(owner, operator) {
    const vNFTContractAddress = config.dev_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vNFTContractAddress);

    return await vNFTABI.methods.isApprovedForAll(owner, operator).call();
}

export async function safeTransferPackFrom(from, to, tokenId) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.dev_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vNFTContractAddress);

    return await vNFTABI.methods.safeTransferFrom(from, to, tokenId).send({from: from});
}

export async function burnPack(from, tokenId) {
    //alert("Setting approval to " + from + " for " + exchangeAddress);
    const vNFTContractAddress = config.dev_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vpJSON['abi'], vNFTContractAddress);

    return await vNFTABI.methods.burn(tokenId).send({from: from});
}