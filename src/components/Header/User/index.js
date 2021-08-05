import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";
import Web3 from "web3";
import config from "../../../local-dev-config";
import vTJSON from "../../../abis/ViridianToken.json";
import BigNumber from "bignumber.js";
let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

const items = [
  {
    title: "My profile",
    icon: "user",
    url: "/profile",
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
  const [ethBalance, setEthBalance] = useState(0);
  const [vextBalance, setVextBalance] = useState(0);

  useEffect(() => {
    if (Web3.givenProvider) {
      const connect = async () => {
        //alert("connecting wallet")
        await connectWallet();
        console.log(connected);
      }
      //connect().then(() => setConnected(true));
    }
  }, [web3.givenProvider]);

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
          //alert(JSON.stringify(account));
        });
        //alert(JSON.stringify(web3));
        await web3.eth.getBalance(account).then(async (balance) =>
        await setEthBalance(round(balance * .000000000000000001, 4)));
        await setVextBalance(await getVEXTBalance());
        await setConnected(true);
        //await web3.eth.sign(web3.utils.sha3("test"), account, function (err, result) { console.log(err, result); });
      } catch (error) {
        console.error(error);
      }
  }

  async function getVEXTBalance() {
    const vtContractAddress = config.dev_contract_addresses.vt_contract;
    //console.log(JSON.stringify(vNFTJSON));
    let vtABI = new web3.eth.Contract(vTJSON['abi'], vtContractAddress);
    return await vtABI.methods.balanceOf(account).call();
  }

  function parseVextBalance(vextBalance) {
    //alert("BEF: " + vextBalance);
    vextBalance = new BigNumber(vextBalance);
    vextBalance = vextBalance.shiftedBy(-18);
    vextBalance = vextBalance.toNumber();
    //alert(vextBalance);
    //alert(vextBalance < 1000000.0);
    if (10000 < vextBalance && vextBalance < 1000000.0) {
      return (vextBalance / 1000).toFixed(2) + "K"
    }
    else if (vextBalance > 1000000.0) {
      //alert("DIV: " + vextBalance / 1000000)
      return (vextBalance / 1000000).toFixed(2) + "M"
    }
    else {
      return vextBalance.toFixed(2);
    }
  }

  const round = (number, decimalPlaces) => {
    const factorOfTen = Math.pow(10, decimalPlaces)
    return Math.round(number * factorOfTen) / factorOfTen
  }

  //alert(account);
  if (connected) {
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            <img src="/images/content/avatar-user.jpg" alt="Avatar" />
          </div>
          <div className={styles.wallet}>
            {parseVextBalance(vextBalance)} <span className={styles.currency}>VEXT</span>
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
                        <div className={styles.price}>{parseVextBalance(vextBalance)} VEXT</div>
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
            <div className={styles.head} onClick={async () => await connectWallet()}>
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
