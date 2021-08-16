import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Users from "./Users";
import Control from "./Control";
import Options from "./Options";
import { useLocation, withRouter } from 'react-router-dom';

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

const Item = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  //const {passedState} = props.location.state
  const location = useLocation();

  return (
    <>
      {/*{JSON.stringify(location.state)}*/}
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <div className={styles.categories}>
                {categories.map((x, index) => (
                  <div
                    className={cn(
                      { "status-black": x.category === "black" },
                      { "status-purple": x.category === "purple" },
                      styles.category
                    )}
                    key={index}
                  >
                    {x.content}
                  </div>
                ))}
              </div>
              <img
                //srcSet="/images/content/item-pic@2x.jpg 2x"
                src={location.state.uri.image}
                alt="Item"
              />
            </div>
            {/*{location.state.listingId}*/}
            <Options className={styles.options} id={location.state.listingId} account={props.account} />
          </div>
          <div className={styles.details}>
            <h1 className={cn("h3", styles.title)}>{location.state.uri.name}</h1>
            <div className={styles.cost}>
              <div className={cn("status-stroke-green", styles.price)}>
                {location.state.price} VEXT
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

            {/*{JSON.stringify(isListing)}*/}
            <Users className={styles.users} items={users} owner={location.state.nftOwner} />
            <Control price={location.state.price} className={styles.control} state={location.state} owner={location.state.nftOwner} account={props.account} isListing={location.state.isListing} />
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Item);
