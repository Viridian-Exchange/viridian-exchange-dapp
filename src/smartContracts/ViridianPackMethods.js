import config from "../local-dev-config";
import vNFTJSON from "../abis/ViridianPack.json";
import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

export async function openPack(packId, account, setRevealing, setCards) {
    const vpContractAddress = config.dev_contract_addresses.vp_contract;
    let vpABI = new web3.eth.Contract(vNFTJSON['abi'], vpContractAddress);

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