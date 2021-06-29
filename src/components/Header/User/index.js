import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";
import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

const items = [
  {
    title: "My profile",
    icon: "user",
    url: "/profile",
  },
  {
    title: "My items",
    icon: "image",
    url: "/item",
  },
  {
    title: "Disconnect",
    icon: "exit",
    url: "/connect-wallet",
  },
];

const User = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);

  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const {ethereum} = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  async function connectWallet() {
      try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!
        await window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
          setAccount(accounts[0]);
        });
        await web3.eth.getBalance(account).then((balance) =>
        setBalance(balance))
        setConnected(true);
        //await web3.eth.sign(web3.utils.sha3("test"), account, function (err, result) { console.log(err, result); });
      } catch (error) {
        console.error(error);
      }
  }

  //alert(account);

  if (connected) {
    return (
        <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
          <div className={cn(styles.user, className)}>
            <div className={styles.head} onClick={() => setVisible(!visible)}>
              <div className={styles.avatar}>
                <img src="/images/content/avatar-user.jpg" alt="Avatar"/>
              </div>
              <div className={styles.wallet}>
                {balance} <span className={styles.currency}>VEXT</span>
              </div>
            </div>
            {visible && (
                <div className={styles.body}>
                  <div className={styles.name}>Enrico Cole</div>
                  <div className={styles.code}>
                    <div className={styles.number}>{account}</div>
                    <button className={styles.copy}>
                      <Icon name="copy" size="16"/>
                    </button>
                  </div>
                  <div className={styles.wrap}>
                    <div className={styles.line}>
                      <div className={styles.preview}>
                        <img
                            src="/images/content/ve_circle.png"
                            alt="Ethereum"
                        />
                      </div>
                      <div className={styles.details}>
                        <div className={styles.info}>Balance</div>
                        <div className={styles.price}>{balance} VEXT</div>
                      </div>
                    </div>
                    <button
                        className={cn("button-stroke button-small", styles.button)}
                    >
                      Manage fun on Coinbase
                    </button>
                  </div>
                  <div className={styles.menu}>
                    {items.map((x, index) =>
                        x.url ? (
                            x.url.startsWith("http") ? (
                                <a
                                    className={styles.item}
                                    href={x.url}
                                    rel="noopener noreferrer"
                                    key={index}
                                >
                                  <div className={styles.icon}>
                                    <Icon name={x.icon} size="20"/>
                                  </div>
                                  <div className={styles.text}>{x.title}</div>
                                </a>
                            ) : (
                                <Link
                                    className={styles.item}
                                    to={x.url}
                                    onClick={() => setVisible(!visible)}
                                    key={index}
                                >
                                  <div className={styles.icon}>
                                    <Icon name={x.icon} size="20"/>
                                  </div>
                                  <div className={styles.text}>{x.title}</div>
                                </Link>
                            )
                        ) : (
                            <div className={styles.item} key={index}>
                              <div className={styles.icon}>
                                <Icon name={x.icon} size="20"/>
                              </div>
                              <div className={styles.text}>{x.title}</div>
                              <Theme className={styles.theme}/>
                            </div>
                        )
                    )}
                  </div>
                </div>
            )}
          </div>
        </OutsideClickHandler>
    );
  }
  else {
    return (
        <OutsideClickHandler onOutsideClick={() => {}}>
          <div className={cn(styles.user, className)}>
            <div className={styles.head} onClick={() => connectWallet()}>
              <div className={styles.disconnectedWallet}>
                Connect Wallet
              </div>
            </div>
          </div>
        </OutsideClickHandler>
    );
  }
};

export default User;
