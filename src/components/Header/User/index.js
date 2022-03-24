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
import vTJSON from "../../../abis/ViridianToken.json";
import BigNumber from "bignumber.js";
import {FetchUser} from "../../../apis/UserAPI";
import ReactLoading from "react-loading";
import {
  useCryptoPrices,
  CryptoPriceProvider
} from "react-realtime-crypto-prices";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {balanceOf} from "../../../smartContracts/ViridianTokenMethods";
let web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/XvPpXkhm8UtkGw9b8tIMcR3vr1zTZd3b") || "HTTP://127.0.0.1:7545");

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
    url: "/",
  },
];

const User = ({ className, account, setAccount, connected, setConnected, userInfo, setUserInfo, vextBalance, setVextBalance, ethBalance, setEthBalance, setPromptInstallMetamask}) => {
  const [visible, setVisible] = useState(false);
  const [balance, setBalance] = useState(0);
  const prices = useCryptoPrices(["eth"]);



  //ABI Stuff


  //Todo: if they press skip for now, then link address to user struct and default profile picture
  //const [ethBalance, setEthBalance] = useState(0);
  //const [vextBalance, setVextBalance] = useState(0);

  useEffect(() => {
    if (Web3.givenProvider) {
      const connect = async () => {
        //alert("connecting wallet")
        await connectWallet();
        //console.log(connected);
        //alert()
      }
      //connect().then(() => setConnected(true));
    }
  }, [web3.givenProvider]);


  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const {ethereum} = window;
    if (!Boolean(ethereum && ethereum.isMetaMask)) {
      setPromptInstallMetamask(true);
    }
  };


  async function connectWallet() {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      await window.ethereum.request({ method: 'eth_requestAccounts' }).then(async (accounts) => {
        setAccount(accounts[0]);
        if (accounts[0]) {
          await FetchUser(setUserInfo, accounts[0]);
          //alert("FETCH FROM USER SCREEN")
        }
        //alert(accounts[0]);
        //alert(JSON.stringify(account));
      });


      //alert(JSON.stringify(web3));


      //await web3.eth.balanceOf(account).then(async (balance) => {
        //alert(balance);
          //await setEthBalance(round( balance * .000000000000000001, 4))
      //});
      await setEthBalance(await getWETHBalance());
      await setVextBalance(await getWETHBalance());
      await setConnected(true);

      //alert("setting connected from user/index");

      // await setUserInfo(await getUserInfo());





      //alert(account);
      //await web3.eth.sign(web3.utils.sha3("test"), account, function (err, result) { //console.log(err, result); });
    } catch (error) {
      console.error(error);
    }
  }

  async function getWETHBalance() {

    const vtContractAddress = config.mumbai_contract_addresses.vt_contract;
    ////console.log(JSON.stringify(vNFTJSON));
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

  const shortenAccount = () => {
    if (account) {
      return account.toString().substring(0, 6) + "..." + account.toString().substring(38);
    }
  }

  //alert(account);
  if (connected) {
    //if username is empty, ask to set up
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          {(!userInfo.profilePhotoURL || !vextBalance) ?
              [<div className={styles.avatar}>
                <ReactLoading type={'spin'} color={'#bf9a36'} height={'100%'} width={'100%'} />
              </div>,
                <div className={styles.wallet}>
                  <span className={styles.currency}><img style={{width: '3ex', marginTop: '-.4ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' /></span>
                </div>] : [<div className={styles.avatar}>
            <img src={userInfo.profilePhotoURL + "?" + new Date().getTime()} alt="Avatar" />
            </div>,
                <div>{(ethBalance === 0) && (parseVextBalance(vextBalance) !== "0.00") ? <div className={styles.wallet}>
          {parseVextBalance(vextBalance)} <span className={styles.currency}>USDC</span>
            </div> : <div className={styles.wallet}>
                  <img style={{width: '3ex', marginTop: '-.5ex', marginLeft: '-1ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />
                  {parseVextBalance(ethBalance)}
                </div>}</div>]}
        </div>
            {visible && (
                <div className={styles.body}>
                  <div className={styles.name}>{userInfo.displayName}</div>
                  <CopyToClipboard text={account}
                      // onCopy={() => this.setState({copied: true})}
                  >
                    <div className={styles.code}>
                      <div className={styles.number}>{shortenAccount()}</div>
                      <button className={styles.copy}>
                        <Icon name="copy" size="16"/>
                      </button>
                    </div>
                  </CopyToClipboard>
                  <div className={styles.wrap}>
                    <div className={styles.line}>
                      {/*<div className={styles.preview}>*/}
                      {/*  <img*/}
                      {/*      src="/images/content/ve_circle.png"*/}
                      {/*      alt="Ethereum"*/}
                      {/*  />*/}
                      {/*</div>*/}
                      <div className={styles.details} style={{marginLeft: '-1ex'}}>
                        <div className={styles.info}>Balance</div>
                        <div>{(ethBalance === 0) ? <div className={styles.price}>
                          {parseVextBalance(vextBalance)} <span className={styles.currency}>USDC</span>
                        </div> : <div className={styles.price}>
                          <img style={{width: '2ex', marginTop: '-.4ex'}} src='https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' alt='ETH' />
                          {parseVextBalance(ethBalance)}
                          <>{prices.eth && <div style={{color: 'grey', fontSize: '5'}}>${Math.round((prices.eth * parseVextBalance(ethBalance)) * 100) / 100}</div>}</>
                          {/*<span className={styles.currency}>ETH</span>*/}
                        </div>}</div>
                      </div>
                    </div>
                    {/*<button*/}
                    {/*    className={cn("button-stroke button-small", styles.button)}*/}
                    {/*>*/}
                    {/*  Manage fun on Coinbase*/}
                    {/*</button>*/}
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
            <div className={styles.head} onClick={async () => {isMetaMaskInstalled(); await connectWallet()}}>
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
