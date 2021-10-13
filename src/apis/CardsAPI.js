import axios from "axios";
import React from 'react'
const config = require('../config.json');


export const HandleAddCard = async (id, name, cardNum, grade, price, cardOwner, cardOwnerUsername, imageUrl, event) => {
    const card = {
        newCard: {
            "name": "",
            "cardNum": "",
            "id": ""
        },
        cards: []
    };

    //event.preventDefault();
    // add call to AWS API Gateway add card endpoint here
    try {
        const params = {
            "id": id,
            "cardName": name,
            "cardNum": cardNum,
            "grade": grade,
            "picUrl": imageUrl,
            "type": "",
            "cardOwner": cardOwner,
            "cardOwnerUsername": cardOwnerUsername,
            "seller": "",
            "forSale": true,
            "price": price
        };
        await axios.post(`${config.api.invokeUrl}/cards/${id}`, params);
        card.cards = [...card.cards, card.newCard];
        card.newCard = { "cardName": "", "id": "" };
        //console.log("UPLOAD SUCCESS: " + JSON.stringify(params));
    } catch (err) {
        console.log(`An error has occurred: ${err}`);
    }
};


export const HandleAddNFTLike = async (id, numLikes) => {

    // add call to AWS API Gateway update card endpoint here
    try {

        const params = {
            "id": id,
            "numLikes": numLikes,
        };
        await axios.patch(`${config.api.invokeUrl}/cards/${id}`, params);
        //const cardToUpdate = [...card.cards].find(card => card.id === id);
        //const updatedCards = [...card.cards].filter(card => card.id !== id);
        //cardToUpdate.cardName = name;
        //updatedCards.push(cardToUpdate);
        //card.cards = updatedCards;
        //console.log("UPLOAD SUCCESS: " + JSON.stringify(params));
    }catch (err) {
        console.log(`Error updating card: ${err}`);
    }
};

export const HandleDeleteCard = async (id, event) => {
    const card = {
        newCard: {
            "cardName": "",
            "id": ""
        },
        cards: []
    };

    //event.preventDefault();
    // add call to AWS API Gateway delete card endpoint here
    try {
        await axios.delete(`${config.api.invokeUrl}/cards/${id}`);
        //console.log("SUCCESSFULLY DELETED CARDS")
    }catch (err) {
        console.log(`Unable to delete card: ${err}`);
    }
};

export const FetchCards = async (setNFTLikes) => {
    const card = {
        newCard: {
            "numLikes": "",
            "id": ""
        },
        cards: []
    };

    // add call to AWS API Gateway to fetch cards here
    // then set them in state

    try {
        await axios.get(`${config.api.invokeUrl}/cards`).then(async(res) => {
            console.log(JSON.stringify(res));
            alert(res.data.Items);
            if (res.data.Items) {
                alert("from api: " + JSON.stringify(res.data.Items));
                await setNFTLikes(res.data.Items);
            }
            //alert(JSON.stringify("FETCHAU: " + res.data.Items));
            return res.status;
        });


    }
    catch (err) {
        alert(`An error has occurred: ${err}`);
    }

};