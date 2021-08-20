import React, { useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../Header";
import Footer from "../Footer";

const Page = ({ children, account, setAccount, connected, setConnected, userInfo, setUserInfo, vextBalance, setVextBalance }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);

  return (
    <div className={styles.page}>
      <Header vextBalance={vextBalance} setVextBalance={setVextBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}/>
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  );
};

export default withRouter(Page);
