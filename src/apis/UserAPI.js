import axios from "axios";
import React from 'react'
const config = require('../config.json');

export const HandleAddUser = async (setUserInfo, address, displayName, bio, website, twitter, profilePhotoURL, coverPhotoURL, event) => {
    const newUser = {
        newUser: {
            "username": "",
            "displayName": "",
            "bio": "",
            "website": "",
            "twitter": "",
            "profilePhotoURL": "",
            "coverPhotoURL": "",
            "following": [],
            "followers": [],
            "likes": []
        },
        users: []
    };

    //event.preventDefault();
    // add call to AWS API Gateway add user endpoint here
    try {
        const params = {
            "username": address,
            "displayName": displayName,
            "bio": bio,
            "profilePhotoURL": profilePhotoURL,
            "coverPhotoURL": coverPhotoURL,
            "following": [],
            "followers": [],
            "likes": []
        };
        await axios.post(`${config.api.invokeUrl}/user/${address}`, params).then(res => {
            setUserInfo(params);
            return res;
        });
        // user.users = [...user.users, user.newUser];
        // user.newUser = { "userID": "", "username": "", "email": "", "collection": [] };
        //console.log("UPLOAD SUCCESS: " + params);
    } catch (err) {
        console.log(`An error has occurred: ${err}`);
    }
};

export const HandleAddUserSimple = async (setUserInfo, address) => {
    const newUser = {
        newUser: {
            "username": "",
            "displayName": "",
            "bio": "",
            "website": "",
            "twitter": "",
            "profilePhotoURL": "",
            "coverPhotoURL": "",
            "following": [],
            "followers": [],
            "likes": []
        },
        users: []
    };

    //event.preventDefault();
    // add call to AWS API Gateway add user endpoint here
    try {
        const params = {
            "username": address,
            "displayName": "",
            "bio": "",
            "website": "",
            "twitter": "",
            "profilePhotoURL": "https://source.boringavatars.com/marble/120/" + address,
            "coverPhotoURL": "",
            "following": [],
            "followers": [],
            "likes": []
        };
        await axios.post(`${config.api.invokeUrl}/user/${address}`, params).then((res) => {
            if (res) {
                return res;
            }
        })
        // TODO: I THINK THIS SETUSER IS NOT SETTING THE USER PROPERLY
        await setUserInfo(params);


        // user.users = [...user.users, user.newUser];
        // user.newUser = { "userID": "", "username": "", "email": "", "collection": [] };
        //console.log("UPLOAD SUCCESS: " + params);
    } catch (err) {
        console.log(`An error has occurred: ${err}`);
    }
};

export const HandleUpdateUser = async (setUserInfo, address, displayName, bio, website, twitter, profilePhotoURL, coverPhotoURL, following, followers, likes) => {

    // add call to AWS API Gateway update user endpoint here
    try {
        const params = {
            "username": address,
            "displayName": displayName,
            "bio": bio,
            "website": website,
            "twitter": twitter,
            "profilePhotoURL": profilePhotoURL,
            "coverPhotoURL": coverPhotoURL,
            "following": following,
            "followers": followers,
            "likes": likes
        };
        //
        // alert(JSON.stringify(params));
        //alert(JSON.stringify(params));
        await axios.patch(`${config.api.invokeUrl}/user/${address}`, params).then(res => {
            //alert(JSON.parse(res.config.data));
            //TODO: Figure out why this causes problems!!!

            //console.log("UPLOAD SUCCESS: " + JSON.stringify(params));
            //alert(res.data.Item.username);
            //
            params['username'] = address
            setUserInfo(params);
            return res;
        });

    }catch (err) {
        console.log(`Error updating user: ${err}`);
    }
};

export const HandleDeleteUser = async (username, event) => {
    const user = {
        newUser: {
            "userName": "",
            "id": ""
        },
        users: []
    };

    //event.preventDefault();
    // add call to AWS API Gateway delete user endpoint here
    try {
        await axios.delete(`${config.api.invokeUrl}/user/${username}`);
        //const updatedUsers = [...user.users].filter(user => user.username !== username);
        //user.users = updatedUsers;
        console.log('DELETE SUCCESSFUL')
    } catch (err) {
        console.log(`Unable to delete user: ${err}`);
    }
};

export const FetchUser = async (setUserInfo, address) => {
    const user = {
        newUser: {
            "username": ""
        },
        users: []
    };

    // add call to AWS API Gateway to fetch users here
    // then set them in state
    try {
        await axios.get(`${config.api.invokeUrl}/user/${address}`).then(async(res) => {
            if (res.data.Item) {
                await setUserInfo(res.data.Item);
            }
            alert(JSON.stringify(res.data.Item));
            return res.status;
        });
        // const res_user = res.data;
        // user.users = res_user;
        // alert("Success: " + JSON.stringify(res));
        //console.log (JSON.stringify(user));
        // alert("auth user: " + JSON.stringify(user.users.Item));



    } catch (err) {
        alert(`An error has occurred: ${err}`);
    }
};