import axios from "axios";
import React from 'react'
const config = require('../config.json');

export const HandleAddEmail = async (email, event) => {

    //event.preventDefault();
    // add call to AWS API Gateway add card endpoint here
    try {
        const params = {
           "email": email
        };
        await axios.post(`${config.email_add_api.invokeUrl}/emails/${email}`, params);
        console.log("UPLOAD SUCCESS: " + JSON.stringify(params));
    } catch (err) {
        console.log(`An error has occurred: ${err}`);
    }
};
