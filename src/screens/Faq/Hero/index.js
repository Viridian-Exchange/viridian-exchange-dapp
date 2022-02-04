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
      {learnMore: "https://viridianexchange.com", question: "What is Viridian Exchange?", answer: "Viridian Exchange is the premier digital marketplace for collectible-backed NFTs -- enabling users to instantly buy, sell, and trade their physical cards on the Ethereum blockchain. We increase the liquidity and transparency of physical collectibles, while reducing many inefficiencies that come with the current methods of trade."},
      {learnMore: "https://viridianexchange.com", question: "How does Viridian Exchange work?", answer: "Viridian enables the exchange of NFTs that are tethered to an underlying physical collectible (starting with Pokémon and sports cards). When users transact on our dApp, they are inherently transferring the rights of ownership to the corresponding physical card that is held in our Viridian Vault. These cards can be withdrawn at any point in time, at which point the tethered NFT is burned. "} ,
      {learnMore: "https://viridianexchange.com", question: "What is Viridian Vault?", answer: "In order to ensure the credibility of all tethered assets on our platform, we house all physical cards in the Viridian Vault, our 24/7 monitored, temperature controlled facility where cards are stored, secured, and insured. Our contracted infrastructure allows us to seamlessly manage inventory and shipping with an in-house API."},
      {learnMore: "https://viridianexchange.com", question: "How do I Deposit a Card for Trading?", answer: "To deposit a card to our platform, the process is simple. First, snap a picture with your smartphone — our proprietary image-recognition algorithm will extract pertinent data about your card(s). Then, create and print a shipping label through our portal, and send your top-loaded card(s) to the Viridian Vault. Once we receive your card, our experts process, verify, and authenticate the precious cargo. After fully processed (2-3 days max), you can buy/sell/trade the rights to your cards as NFTs with other users at the click of a button. If you ever want to withdraw the cards from your inventory, you can redeem the physical card at any time, at which point the corresponding NFT is burned. "},
      {learnMore: "https://viridianexchange.com", question: "How to Create and Connect an Account (Wallet Setup)", answer: "To use our platform, you must first set up a MetaMask wallet to handle NFT custody and send crypto payments. The link to download is [here](https://metamask.io/download.html). We recommend you install the chrome browser extension, but it also works in native iOS and Android for mobile usage. \n" +
            "\n" +
            "To set up your wallet, please refer to the instructions laid out " +
            + {metamaskLink} + ". Once your account is set up, you're ready to get started! Relaunch our app, and after clicking \"Connect Wallet\", MetaMask should automatically prompt you to connect your wallet on the correct network \"Rompten Test Network\". Now, you can set up your profile and get started on our platform!\n" +
            "\n" +
            "If you are still having issues setting up your wallet , please refer to this instructional video [here](https://www.youtube.com/watch?v=WAStJtjYI_c&ab_channel=CryptoJumpstart)."},
      {learnMore: "https://viridianexchange.com", question: "What Cryptocurrencies does Viridian Exchange Support?", answer: "To start off, Viridian Exchange will offer support for Ether and USDC (a stable cryptocurrency which is backed by the US dollar) for payments. Later on, we plan on adding support for a wide variety of ERC-20 tokens so users can have numerous choices for payment when transacting our NFTs. "},
    ],
  },
  {
    title: "DAPPs & Wallets",
    icon: "wallet",
    items: [
      {learnMore: "https://ethereum.org/en/dapps/", question: "What is a dapp?", answer: "Decentralized applications (dApps) are digital applications or programs that exist and run on a blockchain or P2P network of computers instead of a single computer, and are outside the purview and control of a single authority."},
      {learnMore: "https://ethereum.org/en/dapps/", question: "What is a wallet?", answer: "A cryptocurrency wallet is a device, physical medium, program or a service which stores the public and/or private keys for cryptocurrency transactions. In addition to this basic function of storing the keys, a cryptocurrency wallet more often also offers the functionality of encrypting and/or signing information."},
      {learnMore: "https://ethereum.org/en/dapps/", question: "How to get a wallet?", answer: "There are many wallet providers but for Viridian Exchange we recommend you use Metamask, you can get a metamask account by downloading the chrome extension or downloading the app from the metamask website."},
      {learnMore: "https://ethereum.org/en/dapps/", question: "How to connect a wallet?", answer: "The wallet will either connect automatically or the \"connect wallet\" button needs to be pressed. Assure that the Ropsten Testnet is selected in the metamask network selection section."},
      {learnMore: "https://ethereum.org/en/dapps/", question: "How to interact with the dapp?", answer: "Every interaction is facilitated by the wallet, if you have the proper ETH balance (or USDC in certain instances) you can purchase, list, offer, and open nfts/packs on the site. \n" +
            "Changes from various interactions will be reflected in the dapp and the wallet itself, if they don't line up either wait or refresh the page."},
    ],
  },
  {
    title: "NFTs & Packs",
    icon: "lightning",
    items: [
      {learnMore: "https://ethereum.org/en/nft/#:~:text=NFTs%20are%20tokens%20that%20we,represent%20ownership%20of%20unique%20items.&text=They%20can%20only%20have%20one,stands%20for%20non%2Dfungible%20token.", question: "What is an NFT?", answer: "NFT stands for non-fungible token – a digital token that's a type of cryptocurrency, much like Bitcoin or Ethereum. But unlike a standard coin in the Bitcoin blockchain, an NFT is unique and can't be exchanged like-for-like (hence, non-fungible)."},
      {learnMore: "https://ethereum.org/en/nft/#:~:text=NFTs%20are%20tokens%20that%20we,represent%20ownership%20of%20unique%20items.&text=They%20can%20only%20have%20one,stands%20for%20non%2Dfungible%20token.", question: "What is a Viridian Pack?", answer: "Viridian packs are nfts themselves which when opened mint a certain number of randomly selected cards to the user's inventory."},
      {learnMore: "https://ethereum.org/en/nft/#:~:text=NFTs%20are%20tokens%20that%20we,represent%20ownership%20of%20unique%20items.&text=They%20can%20only%20have%20one,stands%20for%20non%2Dfungible%20token.", question: "How do I get NFTs and Packs?", answer: "NFTs and Packs can be bought or traded for on the exchange using your wallet."},
      {learnMore: "https://ethereum.org/en/nft/#:~:text=NFTs%20are%20tokens%20that%20we,represent%20ownership%20of%20unique%20items.&text=They%20can%20only%20have%20one,stands%20for%20non%2Dfungible%20token.", question: "How do I sell NFTs and Packs?", answer: "NFTs and Packs can be sold or offered on the exchange for ETH or USDC using your wallet."},
    ],
  },
  {
    title: "VE Physical logistics",
    icon: "bulb",
    items: [
      {learnMore: "https://viridianexchange.com", question: "How to properly ship a card to be minted as an NFT", answer: "The card should be put in a penny sleeve and either a Card Saver I or a Toploader with some painters tape closing the top. Then before putting it in the envolope or bubble mailer place two pieces or cardboard on each side to add extra protection for the card."},
      {learnMore: "https://viridianexchange.com", question: "How to withdraw your NFTs?", answer: "Press the withdraw button on the card and fill in your shipping information. Then approve the NFT burn with your wallet and the card will be shipped to you by us."},
      {learnMore: "https://viridianexchange.com", question: "How do we back the NFTs?", answer: "While all NFTs are up on the site, we have them secured in our Viridian Vault and the cards will not move from that location until the owner burns the NFT associated with the card. \n" +
            "Due to the fact that we send the phyiscal card, this allows the value to be backed at all times."},
      {learnMore: "https://viridianexchange.com", question: "Where do we store the cards?", answer: "We store the cards in our Viridian Vault which is a temperature controlled and fire proof storage facility with physical security."},
      {learnMore: "https://viridianexchange.com", question: "How to we validate the authenticity of cards?", answer: "Our team of card experts with years of experience in the industry, validate all cards before they are minted to the site as NFTs."},
    ],
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
