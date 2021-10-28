import React, { useState, Button } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Footer.module.sass";
import Group from "./Group";
import Image from "../Image";
import Form from "../Form";
import Theme from "../Theme";
import {HandleAddEmail} from '../../apis/EmailListAPI'
import config from '../../config.json'
import styles1 from "../Form/Form.module.sass";
import Icon from "../Icon";

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
        title: "Get Faucet ETH",
        //url: "/BuyCrypto",
        url: "https://faucet.dimensions.network"
      },
    ],
  },
];


const Footers = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = React.useState(false);

  const handleSubmit = (e) => {
    alert();
  };

  const successfulMessage = () => {
    if (successMessage) {
      return <div style={{marginLeft: "10px"}}> <Icon name="check" size="18" fill={"#BF9A36"} /> <a>Sign Up Successful!</a></div>
    }
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
            <div className={styles.info}>The future of collectible exchange.</div>
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
            <div className={styles.category}>Join Our Newsletter</div>
            <div className={styles.text}>
              Be the first to hear about new product updates and exclusive pack releases!
            </div>
            {/*<Form*/}
            {/*  className={styles.form}*/}
            {/*  setValue={setEmail}*/}
            {/*  click={() => {HandleAddEmail(email); setSuccessMessage(true)}}*/}
            {/*  placeholder="Enter your email"*/}
            {/*  type="email"*/}
            {/*  name="email"*/}
            {/*>*/}
              <input className={styles1.input}
                     placeholder='Enter your email' onChange={e => setEmail(e.target.value)}>
              </input>

              <button style = {{float: "center", marginLeft: "5px", marginTop: "7px"}} className={styles1.btn} type = "submit" onClick={(e) => {HandleAddEmail(email); setSuccessMessage(true);}}>
                <Icon name="arrow-next" size="14"/>
              </button>


          {/*<button className = {styles1.btn}*/}
          {/*       type = "submit" inverted basic onClick={(e) => {HandleAddEmail(email); setSuccessMessage(true);}}>Sign up</button>*/}



            {/*</Form>*/}
            {successfulMessage()}

          </div>
        </div>
        <div>

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
