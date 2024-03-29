import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Actions.module.sass";
import Transfer from "../Transfer";
import RemoveSale from "../RemoveSale";
import Burn from "../Burn";
import Report from "../Report";
import Icon from "../Icon";
import Modal from "../../components/Modal";

const Actions = ({ className, id, tokenId, account, owner, isListing, isPack, isETH, price }) => {
  const [visible, setVisible] = useState(false);
  const [visibleModalTransfer, setVisibleModalTransfer] = useState(false);
  const [visibleModalRemoveSale, setVisibleModalRemoveSale] = useState(false);
  const [visibleModalBurn, setVisibleModalBurn] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);

    let items;

    if(account.toLowerCase() === owner.toLowerCase()) {
        if (isListing) {
            items = [
                //TODO: Add visibleModalChangePrice
                {
                    title: "Change price",
                    icon: "coin",
                    action: () => {}, //console.log("coin"),
                },
                {
                    title: "Pull From Sale",
                    icon: "bag",
                    action: () => setVisibleModalRemoveSale(true),
                },
                {
                    title: "Withdraw Card",
                    icon: "close-circle",
                    action: () => setVisibleModalBurn(true),
                },
                {
                    title: "Report",
                    icon: "info-circle",
                    action: () => setVisibleModalReport(true),
                },
            ];
        }
        else {
            items = [
                {
                    title: "Transfer token",
                    icon: "arrow-right-square",
                    action: () => setVisibleModalTransfer(true),
                },
                {
                    title: "Withdraw Card",
                    icon: "close-circle",
                    action: () => setVisibleModalBurn(true),
                },
                {
                    title: "Report",
                    icon: "info-circle",
                    action: () => setVisibleModalReport(true),
                },
            ];
        }
    }
    else {
        items = [
            {
                title: "Report",
                icon: "info-circle",
                action: () => setVisibleModalReport(true),
            }
        ];
    }


  return (
    <>
        {/*{JSON.stringify(isPack)}*/}
        {/*{JSON.stringify(id)}        /!*{JSON.stringify(owner.toLowerCase() === account.toLowerCase())}*!/*/}
      <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
        <div
          className={cn(styles.actions, className, {
            [styles.active]: visible,
          })}
        >
          <button
            className={cn("button-circle-stroke", styles.button)}
            onClick={() => setVisible(!visible)}
          >
            <Icon name="more" size="24" />
          </button>
          <div className={styles.body}>
            {items.map((x, index) => (
              <div className={styles.item} key={index} onClick={x.action}>
                <Icon name={x.icon} size="20" />
                <span>{x.title}</span>
              </div>
            ))}
          </div>
        </div>
      </OutsideClickHandler>
      <Modal
        visible={visibleModalTransfer}
        onClose={() => setVisibleModalTransfer(false)}
      >
        <Transfer tokenId={tokenId} account={account} setVisibleModalTransfer={setVisibleModalTransfer} isPack={isPack} />
      </Modal>
      <Modal
        visible={visibleModalRemoveSale}
        onClose={() => setVisibleModalRemoveSale(false)}
      >
        <RemoveSale id={id} account={account} isPack={isPack} price={price} isETH={isETH} />
      </Modal>
      <Modal
        visible={visibleModalBurn}
        onClose={() => setVisibleModalBurn(false)}
      >
        <Burn tokenId={tokenId} account={account} isPack={isPack} />
      </Modal>
      <Modal
        visible={visibleModalReport}
        onClose={() => setVisibleModalReport(false)}
      >
        <Report tokenId={tokenId} id={id} account={account} isPack={isPack} />
      </Modal>
    </>
  );
};

export default Actions;
