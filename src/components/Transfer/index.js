import React, { useState } from "react";
import cn from "classnames";
import styles from "./Transfer.module.sass";
import {safeTransferFrom} from "../../smartContracts/ViridianNFTMethods";
import {safeTransferPackFrom} from "../../smartContracts/ViridianPackMethods";

const Transfer = ({ className, id, tokenId, account, setVisibleModalTransfer, isPack }) => {
  const [to, setTo] = useState("");


  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn("h4", styles.title)}>Transfer token</div>
      <div className={styles.text}>
        You can transfer tokens from your address to another
      </div>
      <div className={styles.info}>Receiver address</div>
      <div className={styles.field}>
        <input
          className={styles.input}
          type="text"
          name="address"
          placeholder="Paste address"
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div className={styles.btns}>
          {/*{account + " " + to + " " + tokenId}*/}
          {isPack ? <button onClick={async () => await safeTransferPackFrom(account, to, tokenId)} className={cn("button", styles.button)}>Continue</button> :
              <button onClick={async () => await safeTransferFrom(account, to, tokenId)} className={cn("button", styles.button)}>Continue</button>}
        <button onClick={() => setVisibleModalTransfer(false)} className={cn("button-stroke", styles.button)}>Cancel</button>
      </div>
    </div>
  );
};

export default Transfer;
