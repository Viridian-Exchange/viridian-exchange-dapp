import axios from "axios";
const config = require('../config.json');

export const HandleSendEmail = async (toEmails, subject, message, event) => {
    event.preventDefault();
    try {
        const params = {
            "toEmails": toEmails,
            "subject": subject,
            "message": message
        };
        await axios.post(`${config.email_api.invokeUrl}/send`, params);
        console.log("EMAIL SEND SUCCESS: " + JSON.stringify(params));
    } catch (err) {
        console.log(`An error has occurred: ${err}`);
    }
};