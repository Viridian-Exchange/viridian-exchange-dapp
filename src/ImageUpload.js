import React from 'react';
import S3FileUpload from 'react-s3';
import config from "./config.json";
import cn from "classnames";
import styles from "./screens/ProfileEdit/ProfileEdit.module.sass";

const ImageUpload = (props) => {

    return (
        <button
            className={cn(
                "button-stroke button-small",
                styles.button
            )}
        >
            <input type="file" onChange = { (e) => {props.setFiles(e.target.files)}}/>
        </button>

    );
};

export default ImageUpload;