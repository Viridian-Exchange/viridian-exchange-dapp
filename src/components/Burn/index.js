import React from "react";
import cn from "classnames";
import styles from "./Burn.module.sass";
import {burn} from "../../smartContracts/ViridianNFTMethods";
import {burnPack} from "../../smartContracts/ViridianPackMethods";
import Icon from "../Icon";

const Burn = ({ className, account, tokenId, isPack }) => {
  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn("h4", styles.title)}>Withdraw card</div>
      <div className={styles.text}>
        Please input shipping info to receive the card backing this NFT below:
      </div>

        <form
            className={styles.search}
            action=""
            onSubmit={() => {

            }}
        >
            <input
                className={styles.input}
                //type={type}
                value=""
                //onChange={(e) => setValue(e.target.value)}
                name="Shipping Address"
                placeholder="Shipping Address..."
                required
                style={{marginBottom: '2ex'}}
            />
            <input
                className={styles.input}
                //type={type}
                value=""
                //onChange={(e) => setValue(e.target.value)}
                name="City"
                placeholder="City..."
                required
                style={{marginBottom: '2ex'}}
            />
            <input
                className={styles.input}
                //type={type}
                value=""
                //onChange={(e) => setValue(e.target.value)}
                name="Country"
                placeholder="Country..."
                required
                style={{marginBottom: '2ex'}}
            />
            <input
                className={styles.input}
                //type={type}
                value=""
                //onChange={(e) => setValue(e.target.value)}
                name="ZIP Code"
                placeholder="ZIP Code..."
                required
                style={{marginBottom: '2ex'}}
            />
            <input
                name="I acknowledge that withdrawing this card will burn the nft backing it, and that this action cannot be undone."
                type="checkbox"
                checked={false}
                onChange={() => {}}/><div style={{marginLeft: '3ex', marginTop: '-2.75ex'}} className={styles.text} >I acknowledge that withdrawing this card will burn the nft backing it, and that this action cannot be undone.</div>
        </form>

      <div className={styles.btns}>
          {isPack ? <button onClick={async () => await burn(account, tokenId)} className={cn("button-pink", styles.button)}>Continue</button> :
              <button onClick={async () => await burnPack(account, tokenId)} className={cn("button-pink", styles.button)}>Continue</button>}
        <button className={cn("button-stroke", styles.button)}>Cancel</button>
      </div>
    </div>
  );
};

export default Burn;
