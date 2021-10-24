import React, { useState } from "react";
import cn from "classnames";
import styles from "./Hero.module.sass";
import Dropdown from "../../../components/Dropdown";
import Icon from "../../../components/Icon";
import Item from "./Item";

let metamaskLink = <a href='https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047'>here</a>;

const items = [
  {
    title: "General",
    icon: "home",
    items: [
      {question: "What is Viridian Exchange?", answer: "Viridian Exchange is the premier digital marketplace for collectible-backed NFTs -- enabling users to instantly buy, sell, and trade their physical cards on the Ethereum blockchain. We increase the liquidity and transparency of physical collectibles, while reducing many inefficiencies that come with the current methods of trade."},
      {question: "How does Viridian Exchange work?", answer: "Viridian enables the exchange of NFTs that are tethered to an underlying physical collectible (starting with Pokémon and sports cards). When users transact on our dApp, they are inherently transferring the rights of ownership to the corresponding physical card that is held in our Viridian Vault. These cards can be withdrawn at any point in time, at which point the tethered NFT is burned. "} ,
      {question: "What is Viridian Vault?", answer: "In order to ensure the credibility of all tethered assets on our platform, we house all physical cards in the Viridian Vault, our 24/7 monitored, temperature controlled facility where cards are stored, secured, and insured. Our contracted infrastructure allows us to seamlessly manage inventory and shipping with an in-house API."},
      {question: "How do I Deposit a Card for Trading?", answer: "To deposit a card to our platform, the process is simple. First, snap a picture with your smartphone — our proprietary image-recognition algorithm will extract pertinent data about your card(s). Then, create and print a shipping label through our portal, and send your top-loaded card(s) to the Viridian Vault. Once we receive your card, our experts process, verify, and authenticate the precious cargo. After fully processed (2-3 days max), you can buy/sell/trade the rights to your cards as NFTs with other users at the click of a button. If you ever want to withdraw the cards from your inventory, you can redeem the physical card at any time, at which point the corresponding NFT is burned. "},
      {question: "How to Create and Connect an Account (Wallet Setup)", answer: "To use our platform, you must first set up a MetaMask wallet to handle NFT custody and send crypto payments. The link to download is [here](https://metamask.io/download.html). We recommend you install the chrome browser extension, but it also works in native iOS and Android for mobile usage. \n" +
            "\n" +
            "To set up your wallet, please refer to the instructions laid out " +
            + {metamaskLink} + ". Once your account is set up, you're ready to get started! Relaunch our app, and after clicking \"Connect Wallet\", MetaMask should automatically prompt you to connect your wallet on the correct network \"Rompten Test Network\". Now, you can set up your profile and get started on our platform!\n" +
            "\n" +
            "If you are still having issues setting up your wallet , please refer to this instructional video [here](https://www.youtube.com/watch?v=WAStJtjYI_c&ab_channel=CryptoJumpstart)."},
      {question: "What Cryptocurrencies does Viridian Exchange Support?", answer: "To start off, Viridian Exchange will offer support for Ether and USDT (a stable cryptocurrency which is backed by the US dollar) for payments. Later on, we plan on adding support for a wide variety of ERC-20 tokens so users can have numerous choices for payment when transacting our NFTs. "},
    ],
    learnMore: "https://viridianexchange.com"
  },
  {
    title: "DAPPs & Wallets",
    icon: "wallet",
    items: [
      {question: "What is a dapp?", answer: "Decentralized applications (dApps) are digital applications or programs that exist and run on a blockchain or P2P network of computers instead of a single computer, and are outside the purview and control of a single authority."},
      {question: "What is a wallet?", answer: "A cryptocurrency wallet is a device, physical medium, program or a service which stores the public and/or private keys for cryptocurrency transactions. In addition to this basic function of storing the keys, a cryptocurrency wallet more often also offers the functionality of encrypting and/or signing information."},
      {question: "How to get a wallet?", answer: "There are many wallet providers but for Viridian Exchange we recommend you use Metamask, you can get a metamask account by downloading the chrome extension or downloading the app from the metamask website."},
      {question: "How to connect a wallet?", answer: ""},
      {question: "How to interact with the dapp?", answer: ""},
    ],
    learnMore: "https://ethereum.org/en/dapps/"
  },
  {
    title: "NFTs & Packs",
    icon: "lightning",
    items: [
      {question: "What is an NFT?", answer: ""},
      {question: "What is a Viridian Pack?", answer: ""},
      {question: "How do I get NFTs and Packs?", answer: ""},
      {question: "How do I sell NFTs and Packs?", answer: ""},
    ],
    learnMore: "https://ethereum.org/en/nft/#:~:text=NFTs%20are%20tokens%20that%20we,represent%20ownership%20of%20unique%20items.&text=They%20can%20only%20have%20one,stands%20for%20non%2Dfungible%20token."
  },
  {
    title: "VE Physical logistics",
    icon: "bulb",
    items: [
      {question: "How to properly ship a card to be minted as a NFT", answer: ""},
      {question: "How to withdraw your NFTs?", answer: ""},
      {question: "How do we back the NFTs?", answer: ""},
      {question: "Where do we store the cards?", answer: ""},
      {question: "How to we validate the authenticity of cards?", answer: ""},
    ],
    learnMore: "https://viridianexchange.com"
  },
];

const Hero = () => {
  const options = [];
  items.map((x) => options.push(x.title));

  const [direction, setDirection] = useState(options[0]);

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.stage}>learn how to get started</div>
          <h1 className={cn("h2", styles.title)}>Frequently asked questions</h1>
          <div className={styles.info}>
            Join Viridian Exchange's community if you have questions not covered here, or to follow immediate updates on the product! {" "}
            <a href="https://t.me/viridian_exchange" rel="noopener noreferrer">
              Telegram
            </a>
          </div>
          <Dropdown
            className={cn("mobile-show", styles.dropdown)}
            value={direction}
            setValue={setDirection}
            options={options}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.nav}>
              {items.map((x, index) => (
                <div
                  className={cn(styles.link, {
                    [styles.active]: x.title === direction,
                  })}
                  onClick={() => setDirection(x.title)}
                  key={index}
                >
                  <Icon name={x.icon} size="16" />
                  <span>{x.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.col}>
            {items
              .find((x) => x.title === direction)
              .items.map((x, index) => (
                <Item className={styles.item} item={x} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
