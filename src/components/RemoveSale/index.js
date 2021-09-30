import React from "react";
import cn from "classnames";
import styles from "./RemoveSale.module.sass";
import {pullFromSale} from "../../smartContracts/ViridianExchangeMethods";

const RemoveSale = ({ className, id, account, price }) => {
  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn("h4", styles.title)}>Remove from sale</div>
      <div className={styles.text}>
        Do you really want to remove your item from sale? You can put it on sale
        anytime
      </div>
      <div className={styles.btns}>
          {account}
          {"   " + id}
          {"   " + price}
        <button className={cn("button", styles.button)} onClick={async () => {await pullFromSale(account, id, price)}}>Remove now</button>
        <button className={cn("button-stroke", styles.button)}>Cancel</button>
      </div>
    </div>
  );
};

export default RemoveSale;
