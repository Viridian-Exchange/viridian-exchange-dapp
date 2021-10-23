import config from "../local-dev-config";
import veJSON from "../abis/ViridianExchange.json";
import voJSON from "../abis/ViridianExchangeOffers.json";
import vtJSON from "../abis/ViridianToken.json";
import Web3 from "web3";
import {approve} from "./ViridianTokenMethods";
import { isApprovedForAll, setApprovalForAll } from "./ViridianNFTMethods";
import { isPackApprovedForAll, setPackApprovalForAll } from "./ViridianPackMethods";
import {getWeb3Socket, toFixedBetter} from "../Utils";


let web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/c2ccaf282d324e8983bcb0c6ffaa05a6") || "HTTP://127.0.0.1:7545");

// export async function getUsers() {
//     const veContractAddress = config.ropsten_contract_addresses.ve_contract;
//
//     let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
//     //let users = await veABI.methods.getUsers().call();
//
//     //alert(JSON.stringify(users));
//
//     return [];
// }
//
// export async function signUpUser() {
//     const veContractAddress = config.ropsten_contract_addresses.ve_contract;
//
//     let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
//     let users = veABI.methods.signUpUser().call();
//
//     //alert(nft);
//
//     return users;
// }
//
// export async function getUserFromAddress(userAddr) {
//     const veContractAddress = config.ropsten_contract_addresses.ve_contract;
//
//     let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
//     let users = veABI.methods.getUserFromAddress(userAddr).call();
//
//     //alert(nft);
//
//     return users;
// }

export async function acceptOfferWithVEXT(from, _offerId, _toAmount) {
    const voContractAddress = config.ropsten_contract_addresses.vo_contract;

    //alert(from);

    const batch = new web3.BatchRequest();

    await isApprovedForAll(from, voContractAddress).then(async (isApproved) => {
        //alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setApprovalForAll(from, voContractAddress));
        }});

    batch.add(await approve(from, voContractAddress, _toAmount));

    let voABI = new web3.eth.Contract(voJSON['abi'], voContractAddress);
    //alert(JSON.stringify(e));
    //alert(web3.eth.accounts[0]);
    batch.add(await voABI.methods.acceptOfferWithVEXT(_offerId).send.request({from: from}));

    return batch.execute();
}

export async function acceptOfferWithETH(from, _offerId, _toAmount) {
    const voContractAddress = config.ropsten_contract_addresses.vo_contract;

    //alert(from);

    const batch = new web3.BatchRequest();

    await isApprovedForAll(from, voContractAddress).then(async (isApproved) => {
        //alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setApprovalForAll(from, voContractAddress));
        }});

    let voABI = new web3.eth.Contract(voJSON['abi'], voContractAddress);
    //alert(JSON.stringify(e));
    //alert(web3.eth.accounts[0]);
    batch.add(await voABI.methods.acceptOfferWithETH(_offerId).send.request({from: from, value: _toAmount}));

    return batch.execute();
}

export async function finalApprovalWithETH(from, _offerId, _fromAmount) {
    const voContractAddress = config.ropsten_contract_addresses.vo_contract;

    //alert(from);

    const batch = new web3.BatchRequest();

    await isApprovedForAll(from, voContractAddress).then(async (isApproved) => {
        //alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setApprovalForAll(from, voContractAddress));
        }});

    let voABI = new web3.eth.Contract(voJSON['abi'], voContractAddress);
    //alert(JSON.stringify(e));
    //alert(web3.eth.accounts[0]);
    batch.add(await voABI.methods.finalApprovalWithETH(_offerId).send.request({from: from, value: _fromAmount}));

    return batch.execute();
}

export async function getOffers() {
    const voContractAddress = config.ropsten_contract_addresses.vo_contract;

    let voABI = new web3.eth.Contract(voJSON['abi'], voContractAddress);
    let offers = await voABI.methods.getOffers().call();

    //alert(JSON.stringify(users));

    return offers;
}

export async function getOffersFromUser(_account) {
    const voContractAddress = config.ropsten_contract_addresses.vo_contract;

    let voABI = new web3.eth.Contract(voJSON['abi'], voContractAddress);
    let offers = await voABI.methods.getOffersFromUser(_account).call();

    //alert(JSON.stringify(users));

    return offers;
}

export async function putUpForSale(from, _nftId, _price, _royalty, _endTime, isVEXT) {
    const veContractAddress = config.ropsten_contract_addresses.ve_contract;
    const vtContractAddress = config.ropsten_contract_addresses.vt_contract;
    let vtABI = new web3.eth.Contract(vtJSON['abi'], vtContractAddress);
    const batch = new web3.BatchRequest();

    let allowance = await vtABI.methods.allowance(from, veContractAddress).call();

    //alert("ALLOW: " + allowance);

    if (isVEXT) {
        batch.add(await approve(from, veContractAddress, toFixedBetter(Number.parseInt(allowance) + Number.parseInt(_price))));
    }
    const web3Socket = await getWeb3Socket(web3);
    //alert(await isApprovedForAll(from, veContractAddress));
    await isApprovedForAll(from, veContractAddress).then(async (isApproved) => {
        //alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setApprovalForAll(from, veContractAddress));
        }});

    let veABI = new web3Socket.eth.Contract(veJSON['abi'], veContractAddress);
    let event_res = false;

    //console.log(veABI.methods);


    //alert(web3.eth.accounts[0]);
    try {
        if (!isVEXT) {
            batch.add(await veABI.methods.putUpForSale(_nftId, web3.utils.toWei(_price), _royalty, _endTime, isVEXT, true).send.request({from: from}));
            await veABI.events.ItemListed({}).on('data', async function(event) {
                //console.log(event.returnValues);
                // Do something here
            }).on('err', console.error);



        }
        else {
            batch.add(await veABI.methods.putUpForSale(_nftId, _price, _royalty, _endTime, isVEXT, true).send.request({from: from}));
            await veABI.events.ItemListed(function (err, result) {
                if (err) {
                    alert(err);
                }

                //console.log("LISTING SDFSD: " + JSON.stringify(result.returnValues));
                event_res = result.returnValues.listed;
            });

            // (function (err, result) {
            //     if (err) {
            //         alert(err);
            //     }
            //
            //     //console.log("LISTING SDFSD: " + JSON.stringify(result.returnValues));
            // });
        }
        batch.execute();


        //     .on("ItemListed", (listingId, wallet, listed) => {
        //     alert(listed);
        // });


    } catch(e) {
        //alert(e);
    }


}

export async function putPackUpForSale(from, _nftId, _price, _royalty, _endTime, isVEXT) {
    const veContractAddress = config.ropsten_contract_addresses.ve_contract;
    const vtContractAddress = config.ropsten_contract_addresses.vt_contract;
    let vtABI = new web3.eth.Contract(vtJSON['abi'], vtContractAddress);
    const batch = new web3.BatchRequest();

    let allowance = await vtABI.methods.allowance(from, veContractAddress).call();

    // alert("ALOW: " + Number.parseInt(allowance));
    // alert("PRICE: " + _price);
    //
    // alert(toFixedBetter(Number.parseInt(allowance) + Number.parseInt( _price)));

    if (isVEXT) {
        batch.add(await approve(from, veContractAddress, toFixedBetter(Number.parseInt(allowance) + Number.parseInt(_price))));
    }
    //alert(await isApprovedForAll(from, veContractAddress));
    await isPackApprovedForAll(from, veContractAddress).then(async (isApproved) => {
        alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setPackApprovalForAll(from, veContractAddress));
        }});

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let wsVeABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    //console.log(veABI.methods);
    //alert(web3.eth.accounts[0]);
    try {
        alert("PACC: " + _nftId);
        if (!isVEXT) {
            batch.add(await veABI.methods.putUpForSale(_nftId, web3.utils.toWei(_price), _royalty, _endTime, isVEXT, false).send.request({from: from})
                .then(async transaction => {
                    alert("BITCH THIS SHOULD WORK");
                    //console.log("Listing" + JSON.stringify(transaction));
                await veABI.getPastEvents("ItemListed", {}, (errors, events) => {
                    if (!errors) {
                        alert(events[0].returnValues["0"]);
                    }
                });
            }));
        }
        else {
            batch.add(await veABI.methods.putUpForSale(_nftId, _price, _royalty, _endTime, isVEXT, false).send.request({from: from})
                .then(async (transaction) => {
                //console.log("Listing" + JSON.stringify(transaction));
                await veABI.getPastEvents("ItemListed", {}, (errors, events) => {
                    if (!errors) {
                        alert(events[0].returnValues["0"]);
                    }
                });
            }));
        }
        batch.execute().then(async (e) => {
            alert(e);
        })


    } catch(e) {
        alert(e);
    }
}

export async function buyNFTWithVEXT(from, _listingId, amount) {
    const veContractAddress = config.ropsten_contract_addresses.ve_contract;
    const vtContractAddress = config.ropsten_contract_addresses.vt_contract;
    const batch = new web3.BatchRequest();
    //alert(from);

    await isApprovedForAll(from, veContractAddress).then(async (isApproved) => {
        //alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setApprovalForAll(from, veContractAddress));
        }});

    await isPackApprovedForAll(from, veContractAddress).then(async (isApproved) => {
        alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setPackApprovalForAll(from, veContractAddress));
        }});

    batch.add(await approve(from, veContractAddress, amount));

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let vtABI = new web3.eth.Contract(vtJSON['abi'], vtContractAddress);
    //alert(await vtABI.methods.balanceOf(from) + " vs. " + amount);
    //alert(JSON.stringify(e));
    //alert(web3.eth.accounts[0]);
    //alert(from);
    batch.add(await veABI.methods.buyNFTWithVEXT(_listingId).send.request({from: from}));

    return batch.execute();
}

export async function buyNFTWithETH(from, _listingId, amount) {
    const veContractAddress = config.ropsten_contract_addresses.ve_contract;
    const vtContractAddress = config.ropsten_contract_addresses.vt_contract;
    const batch = new web3.BatchRequest();
    //alert(from);

    await isApprovedForAll(from, veContractAddress).then(async (isApproved) => {
        alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setApprovalForAll(from, veContractAddress));
        }});

    await isPackApprovedForAll(from, veContractAddress).then(async (isApproved) => {
        alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setPackApprovalForAll(from, veContractAddress));
        }});

    //batch.add(await approve(from, veContractAddress, amount));

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let vtABI = new web3.eth.Contract(vtJSON['abi'], vtContractAddress);
    //alert(await vtABI.methods.balanceOf(from) + " vs. " + amount);
    //alert(JSON.stringify(e));
    //alert(web3.eth.accounts[0]);
    //alert(from);
    batch.add(await veABI.methods.buyNFTWithETH(_listingId).send.request({from: from, value: amount}));

    return batch.execute();
}

export async function pullFromSale(from, _listingId, price, isETH) {
    const veContractAddress = config.ropsten_contract_addresses.ve_contract;
    const vtContractAddress = config.ropsten_contract_addresses.vt_contract;

    const batch = new web3.BatchRequest();

    let vtABI = new web3.eth.Contract(vtJSON['abi'], vtContractAddress);

    let allowance = await vtABI.methods.allowance(from, veContractAddress).call();

    //alert("ALLOW " + toFixedBetter(Number.parseInt(price)));

    //alert("NEW ALLOW " + toFixedBetter(Number.parseInt(allowance)) - toFixedBetter(Number.parseInt(price)));

    if (!isETH) {
        batch.add(await approve(from, veContractAddress, toFixedBetter(toFixedBetter(allowance) - toFixedBetter(price))));
    }

    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);

    batch.add(await veABI.methods.pullFromSale(_listingId).send.request({from: from}));

    return batch.execute();
}

export async function makeOffer(from, _to, _nftIds, _packIds, _amount, _recNftIds, _recPackIds, _recAmount, _isVEXT, expirationTime) {
    const voContractAddress = config.ropsten_contract_addresses.vo_contract;

    //alert(1);

    let voABI = new web3.eth.Contract(voJSON['abi'], voContractAddress);

    //alert(2);

    const batch = new web3.BatchRequest();

    //alert(3);

    await isApprovedForAll(from, voContractAddress).then(async (isApproved) => {
        //alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setApprovalForAll(from, voContractAddress));
        }});

    await isPackApprovedForAll(from, voContractAddress).then(async (isApproved) => {
        alert("APPR: " + JSON.stringify(isApproved));
        if (!isApproved) {
            batch.add(await setPackApprovalForAll(from, voContractAddress));
        }});

    //alert(4);

    if (_isVEXT) {
        batch.add(await approve(from, voContractAddress, toFixedBetter(_amount)));
    }

    //alert(from);
    if (_isVEXT) {
        batch.add(await voABI.methods.makeOffer(_to, _nftIds, _packIds, _amount, _recNftIds, _packIds, _recAmount, _isVEXT, expirationTime).send.request({from: from}));
    } else {
        batch.add(await voABI.methods.makeOffer(_to, _nftIds, _packIds, web3.utils.toWei(_amount), _recNftIds, _packIds, web3.utils.toWei(_recAmount), _isVEXT, expirationTime).send.request({from: from}));
    }

    //alert(6);

    return batch.execute();
}