import React, { useState } from "react";
import cn from "classnames";
import styles from "./Hero.module.sass";
import Dropdown from "../../../components/Dropdown";
import Icon from "../../../components/Icon";
import Item from "./Item";

const items = [
  {
    title: "General",
    icon: "home",
    items: [
        "What is Viridian Exchange?",
      "How does Viridian Exchange work?",
        "What is Viridian Vault?",
      "How do I Deposit a Card for Trading?",
        "How to Create and Connect an Account (Wallet Setup)",
      "What Cryptocurrencies does Viridian Exchange Support?",
      "",
    ],
  },
  {
    title: "DApp",
    icon: "circle-and-square",
    items: [
      "What is a DApp",
      "Dose it suppport Dark Mode",
      "Does it support Auto-Layout",
      "What is Stacks Design System",
      "How does it work",
      "How to start with Stacks",
    ],
  },
  {
    title: "VNFTs & Packs",
    icon: "lightning",
    items: [
      "What is a VNFT",
      "What is a Viridian Pack",
      "How do I get VNFTs and Packs",
      "How do I sell VNFTs and Packs",
    ],
  },
  {
    title: "VE Physical logistics",
    icon: "pen",
    items: [
      "How to submit a card to be minted as a VNFT",
      "How to withdraw your VNFTs",
      "How do we back the VNFTs",
      "Where do we store the cards",
      "How to we validate the authenticity of cards",
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
