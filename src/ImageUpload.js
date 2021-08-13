import React from 'react';
import S3FileUpload from 'react-s3';
import config from "./config.json";

const ImageUpload = (props) => {

    return (
        <input type="file" onChange = { (e) => {props.setFiles(e.target.files)}}/>
    );
};

export default ImageUpload;