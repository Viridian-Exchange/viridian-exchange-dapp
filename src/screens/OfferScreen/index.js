import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Slider from "react-slick";
import Users from "./Users";
import Items from "./Items";
import Control from "./Control";
import Options from "./Options";
import { useLocation } from "react-router-dom";

const navLinks = ["Info", "Owners", "History", "Bids"];

const categories = [
  {
    category: "black",
    content: "Pokemon",
  },
  {
    category: "purple",
    content: "Graded",
  },
];

const users = [
  {
    name: "Raquel Will",
    position: "Owner",
    avatar: "/images/content/avatar-2.jpg",
    reward: "/images/content/reward-1.svg",
  },
  {
    name: "Selina Mayert",
    position: "Creator",
    avatar: "/images/content/avatar-1.jpg",
  },
];

const OfferScreen = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  //const {passedState} = props.location.state
  const location = useLocation();

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.bg}>
            {/*{location.state.listingId}*/}
            HI
            {JSON.stringify(location)}
            {JSON.stringify(location.state.toNFTs)}
            {JSON.stringify(location.state.fromNFTs)}
            {location.state.toVEXT}
            {location.state.fromVEXT}
          </div>
          <div className={styles.details}>
            <h1 className={cn("h3", styles.title)}></h1>
            <div className={styles.cost}>
              <div className={cn("status-stroke-green", styles.price)}>
                100 VEXT
              </div>
              <div className={cn("status-stroke-black", styles.price)}>
                $4,429.87
              </div>
              <div className={styles.counter}>10 in stock</div>
            </div>
            <div className={styles.info}>
              This NFT Card will give you Access to Special Airdrops. To learn
              more about UI8 please visit{" "}
              <a
                href="https://ui8.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ui8.net
              </a>
            </div>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(
                    { [styles.active]: index === activeIndex },
                    styles.link
                  )}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
            </div>
            {JSON.stringify(location.state)}
            <Users className={styles.users} items={users} owner={1} />
            <Control account={props.account} offerId={location.state.offerId} toNFTs={location.state.toNFTs} fromNFTs={location.state.fromNFTs}
              toVEXT={location.state.toVEXT} fromVEXT={location.state.fromVEXT}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferScreen;
