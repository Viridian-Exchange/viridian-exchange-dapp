import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";
import Web3 from "web3";
import config from "../../../local-dev-config";
import veJSON from "../../../abis/ViridianExchange.json";
let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

//TODO: Instead of account, pass in user with all info through to profile/user
const items = (account) => [
  {
    title: "My profile",
    icon: "user",
    url: `/profile/${account}`,
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
  const [userInfo, setUserInfo] = useState({});

  //create consts for all user fields, then set them to the json in one function
  //TODO: Useeffect for when userInfo changes, sends to blockchain
  const [userAddress, setUserAddress] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [coverPhotoURL, setCoverPhotoURL] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [bio, setBio] = useState("");
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [likes, setLikes] = useState([]);



  //ABI Stuff


  //Todo: if they press skip for now, then link address to user struct and default profile picture

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

  async function getUserInfo() {
    const veContractAddress = config.dev_contract_addresses.ve_contract;
    let veABI = new web3.eth.Contract(veJSON['abi'], veContractAddress);
    let userInfo = await veABI.methods.getUserFromAddress(account).call();
    return userInfo;
  }

  async function connectWallet() {
      try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!
        await window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
          setAccount(accounts[0]);
          alert(account);
          //alert(JSON.stringify(account));
        });
        //alert(JSON.stringify(web3));
        await web3.eth.getBalance(account).then(async (balance) =>
        await setBalance(round(balance * .000000000000000001, 4)));
        await setConnected(true);

        //instantiate user
        // setUserInfo(getUserInfo());
        // alert(JSON.stringify(userInfo));
        // alert(JSON.stringify(userInfo));


        //await web3.eth.sign(web3.utils.sha3("test"), account, function (err, result) { console.log(err, result); });
      } catch (error) {
        console.error(error);
      }
  }

  const round = (number, decimalPlaces) => {
    const factorOfTen = Math.pow(10, decimalPlaces)
    return Math.round(number * factorOfTen) / factorOfTen
  }

  //alert(account);
  if (connected) {
    //if username is empty, ask to set up
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            <img src="/images/content/avatar-user.jpg" alt="Avatar" />
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
                    {items(account).map((x, index) =>
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
                                    onClick={() => setVisible(!visible)}
                                    key={index}
                                    to={{ pathname: x.url, state: { account: account }}}
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
