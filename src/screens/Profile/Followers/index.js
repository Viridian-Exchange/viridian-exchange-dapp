import React from "react";
import cn from "classnames";
import styles from "./Followers.module.sass";
import Loader from "../../../components/Loader";
import Icon from "../../../components/Icon";
import {Link} from "react-router-dom";

const Followers = ({ className, items, userInfo, followed }) => {
    if (followed) {
        return (
            <div className={cn(styles.followers, className)}>
                <div className={styles.list}>
                    <div className={styles.item} >
                        <div className={styles.follower}>
                            <div className={styles.avatar}>
                                <img src={userInfo.profilePhotoURL+ "?" + new Date().getTime()} alt="Avatar" />
                            </div>
                            <div className={styles.details}>
                                <div className={styles.title}>{userInfo.displayName}</div>
                                {/*<div className={styles.counter}>{x.counter}</div>*/}
                                <a> {userInfo.bio} </a>
                                <a
                                    className={cn(
                                        "button-small", "button-stroke button-small",
                                        styles.button
                                    )}
                                    href={userInfo.username}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Go to Profile
                                    {/*{x.buttonContent}*/}
                                </a>
                            </div>
                        </div>
                        {/*<div className={styles.wrap}>*/}
                        {/*  <div className={styles.gallery}>*/}
                        {/*    {x.gallery.map((x, index) => (*/}
                        {/*      <div className={styles.preview} key={index}>*/}
                        {/*        <img src={x} alt="Follower" />*/}
                        {/*      </div>*/}
                        {/*    ))}*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                    </div>
                    {items ? items.map((x, index) => (
                        <div className={styles.item} key={index}>
                            <div className={styles.follower}>
                                <div className={styles.avatar}>
                                    <img src={x.profilePhotoURL + "?" + new Date().getTime()} alt="Avatar" />
                                </div>
                                <div className={styles.details}>
                                    <div className={styles.title}>{x.displayName}</div>
                                    {/*<div className={styles.counter}>{x.counter}</div>*/}
                                    <a> {x.bio} </a>
                                    <a
                                        className={cn(
                                            "button-small", "button-stroke button-small",
                                            styles.button
                                        )}
                                        href={x.username}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Go to Profile
                                        {/*{x.buttonContent}*/}
                                    </a>
                                </div>
                            </div>
                            {/*<div className={styles.wrap}>*/}
                            {/*  <div className={styles.gallery}>*/}
                            {/*    {x.gallery.map((x, index) => (*/}
                            {/*      <div className={styles.preview} key={index}>*/}
                            {/*        <img src={x} alt="Follower" />*/}
                            {/*      </div>*/}
                            {/*    ))}*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                        </div>
                    )) : <Loader className={styles.loader} />}
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={cn(styles.followers, className)}>
                <div className={styles.list}>
                    {items ? items.map((x, index) => (
                        <div className={styles.item} key={index}>
                            <div className={styles.follower}>
                                <div className={styles.avatar}>
                                    <img src={x.profilePhotoURL + "?" + new Date().getTime()} alt="Avatar" />
                                </div>
                                <div className={styles.details}>
                                    <div className={styles.title}>{x.displayName}</div>
                                    {/*<div className={styles.counter}>{x.counter}</div>*/}
                                    <a> {x.bio} </a>
                                    <a
                                        className={cn(
                                            "button-small", "button-stroke button-small",
                                            styles.button
                                        )}
                                        href={x.username}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Go to Profile
                                        {/*{x.buttonContent}*/}
                                    </a>
                                </div>
                            </div>
                            {/*<div className={styles.wrap}>*/}
                            {/*  <div className={styles.gallery}>*/}
                            {/*    {x.gallery.map((x, index) => (*/}
                            {/*      <div className={styles.preview} key={index}>*/}
                            {/*        <img src={x} alt="Follower" />*/}
                            {/*      </div>*/}
                            {/*    ))}*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                        </div>
                    )) : <Loader className={styles.loader} />}
                </div>
            </div>
        );
    }
};

export default Followers;
