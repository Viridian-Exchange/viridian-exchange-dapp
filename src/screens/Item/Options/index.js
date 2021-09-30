import React from "react";
import cn from "classnames";
import styles from "./Options.module.sass";
import Icon from "../../../components/Icon";
import Actions from "../../../components/Actions";

const Options = ({ className, items, tokenId, id, account, owner, isListing, isPack, price }) => {
  return (
    <div className={cn(styles.options, className)}>
      <button className={cn("button-circle-stroke", styles.button)}>
        <Icon name="share" size="24" />
      </button>
      <button className={cn("button-circle-stroke", styles.button, styles.favorite)}>
        <Icon name="heart-fill" size="24" />
      </button>
        {/*{tokenId + 'breh'}*/}
      <Actions price={price} className={styles.actions} tokenId={tokenId} id={id} account={account} owner={owner} isListing={isListing} isPack={isPack} />
    </div>
  );
};

export default Options;
