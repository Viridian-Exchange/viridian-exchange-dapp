import React from "react";
import cn from "classnames";
import styles from "./Users.module.sass";
import oStyles from "../Card.module.sass"
import {parseVextAmount} from "../../../Utils";

const Users = ({ className, items, owner, fromNFTs, toNFTs, fromVEXT, toVEXT, curProfilePhoto, otherProfilePhoto, isETH }) => {
    /*
    <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.price}>100 VEXT</div>
              <div className={styles.price}>3 VNFTs</div>
          </div>
            <div className={styles.line}>
                <div className={styles.price}>100 VEXT</div>
                <div className={styles.price}>3 VNFTs</div>
            </div>
            <div className={styles.counter}>{item.counter}</div>

        </div>
     */

    let trade = [];

    if (isETH) {
        trade = [
            {
                NFTs: fromNFTs.length + " VNFTs",
                VEXT: parseVextAmount(fromVEXT) + " ETH",
            },
            {
                NFTs: toNFTs.length + " VNFTs",
                VEXT: parseVextAmount(toVEXT) + " ETH",
            },
        ];
    }
    else {
        trade = [
            {
                NFTs: fromNFTs.length + " VNFTs",
                VEXT: parseVextAmount(fromVEXT) + " USDT",
            },
            {
                NFTs: toNFTs.length + " VNFTs",
                VEXT: parseVextAmount(toVEXT) + " USDT",
            },
        ];
    }


  return (
    <div className={cn(styles.users, className)}>
      <div className={styles.list}>
        {items.map((x, index) => {
            if (index === 0) {
                return (
                    <div className={styles.item} key={index}>
                        <div className={styles.avatar}>
                            <img src={curProfilePhoto} alt="Avatar"/>
                            {x.reward && (
                                <div className={styles.reward}>
                                    <img src={x.reward} alt="Reward"/>
                                </div>
                            )}
                        </div>
                        <div className={oStyles.details}>
                            <div className={oStyles.position}>{x.position}</div>
                            <div className={oStyles.line}>
                                <div className={oStyles.price}>{trade[index].VEXT}</div>
                                <div className={oStyles.price}>{trade[index].NFTs}</div>
                            </div>
                            <div className={oStyles.name}>{owner}</div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className={styles.item} key={index}>
                        <div className={styles.avatar}>
                            <img src={otherProfilePhoto} alt="Avatar"/>
                            {x.reward && (
                                <div className={styles.reward}>
                                    <img src={x.reward} alt="Reward"/>
                                </div>
                            )}
                        </div>
                        <div className={oStyles.details}>
                            <div className={oStyles.position}>{x.position}</div>
                            <div className={oStyles.line}>
                                <div className={oStyles.price}>{trade[index].VEXT}</div>
                                <div className={oStyles.price}>{trade[index].NFTs}</div>
                            </div>
                            <div className={oStyles.name}>{owner}</div>
                        </div>
                    </div>
                )
            }
        })}
      </div>
    </div>
  );
};

export default Users;
