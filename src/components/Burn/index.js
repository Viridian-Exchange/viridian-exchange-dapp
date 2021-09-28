import React from "react";
import cn from "classnames";
import styles from "./Burn.module.sass";
import {burn} from "../../smartContracts/ViridianNFTMethods";
import {burnPack} from "../../smartContracts/ViridianPackMethods";

const Burn = ({ className, account, tokenId, isPack }) => {
  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn("h4", styles.title)}>Burn token</div>
      <div className={styles.text}>
        Are you sure to burn this token? This action cannot be undone. Token
        will be transfered to zero address
      </div>
      <div className={styles.btns}>
          {isPack ? <button onClick={async () => await burn(account, tokenId)} className={cn("button-pink", styles.button)}>Continue</button> :
              <button onClick={async () => await burnPack(account, tokenId)} className={cn("button-pink", styles.button)}>Continue</button>}
        <button className={cn("button-stroke", styles.button)}>Cancel</button>
      </div>
    </div>
  );
};

export default Burn;
