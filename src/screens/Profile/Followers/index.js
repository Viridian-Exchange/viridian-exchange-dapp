import React from "react";
import cn from "classnames";
import styles from "./Followers.module.sass";
import Loader from "../../../components/Loader";
import Icon from "../../../components/Icon";
import {Link} from "react-router-dom";

const Followers = ({ className, items }) => {
  return (
    <div className={cn(styles.followers, className)}>
      <div className={styles.list}>
        {items.map((x, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.follower}>
              <div className={styles.avatar}>
                <img src={x.profilePhotoURL} alt="Avatar" />
              </div>
              <div className={styles.details}>
                <div className={styles.title}>{x.displayName}</div>
                {/*<div className={styles.counter}>{x.counter}</div>*/}
                <a
                  className={cn(
                    "button-small", "button-stroke button-small",
                    styles.button
                  )}
                  href={x.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
        ))}
      </div>
      <Loader className={styles.loader} />
    </div>
  );
};

export default Followers;
