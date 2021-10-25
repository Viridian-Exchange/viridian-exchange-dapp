import React from "react";
import cn from "classnames";
import styles from "./Users.module.sass";
import {ownerOfPack} from "../../../smartContracts/ViridianPackMethods";

const Users = ({ className, items, owner, ownerUser }) => {
  return (
    <div className={cn(styles.users, className)}>
      <div className={styles.list}>
        {items.map((x, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.avatar}>
                {ownerUser.profilePhotoURL && <img src={ownerUser.profilePhotoURL} alt="Avatar" />}
              {x.reward && (
                <div className={styles.reward}>
                  <img src={x.reward} alt="Reward" />
                </div>
              )}
            </div>
            <div className={styles.details}>
              <div className={styles.position}>{x.position}</div>
              <div className={styles.name}>{ownerUser.displayName}</div>
                <div className={styles.subName}>{owner}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
