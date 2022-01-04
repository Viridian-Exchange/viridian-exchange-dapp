const AWS = require('aws-sdk');

exports.handler = async(event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const {email} = JSON.parse(event.body);

    const params = {
        TableName: "Emails",
        Item: {
            email: email
        }
    };

    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 200;
    } catch(error) {
        responseBody = 'Unable to add email: ' + error;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: responseBody
    };

    return response;
};
