import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Footer.module.sass";
import Group from "./Group";
import Image from "../Image";
import Form from "../Form";
import Theme from "../Theme";

const items = [
  {
    title: "Viridian Exchange",
    menu: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Discover",
        url: "/search01",
      },
      {
        title: "FAQ",
        url: "/faq",
      },
    ],
  },
  {
    title: "Info",
    menu: [
      {
        title: "Buy $VEXT",
        url: "/BuyVEXT",
      },
    ],
  },
];

const Footers = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <footer className={styles.footer}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Link className={styles.logo} to="/">
              <Image
                className={styles.pic}
                src="/logo.svg"
                srcDark="/logo.svg"
                alt="Viridian Exchange"
              />
            </Link>
            <div className={styles.info}>The Future of Collectibles Trade.</div>
            {/*<div className={styles.version}>*/}
            {/*  <div className={styles.details}>Dark theme</div>*/}
            {/*  <Theme className="theme-big" />*/}
            {/*</div>*/}
          </div>
          <div className={styles.col}>
            {items.map((x, index) => (
              <Group className={styles.group} item={x} key={index} />
            ))}
          </div>
          <div className={styles.col}>
            <div className={styles.category}>Join Newsletter</div>
            <div className={styles.text}>
              Be the first to hear about new product updates
            </div>
            <Form
              className={styles.form}
              value={email}
              setValue={setEmail}
              onSubmit={() => handleSubmit()}
              placeholder="Enter your email"
              type="email"
              name="email"
            />
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.copyright}>
            Copyright © 2021 Viridian Exchange LLC. All rights reserved
          </div>
          <div className={styles.note}>
            We use cookies for better service. <a href="/#">Accept</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
