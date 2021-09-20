import React, { useEffect, useState } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../Header";
import Footer from "../Footer";

const Page = ({ nfts, filteredNfts, setFilteredNFTs, children, account, setAccount, connected, setConnected, userInfo, setUserInfo, vextBalance, setVextBalance }) => {
    const [initialLoaded, setInitialLoaded] = useState(false);

  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(async () => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();

    // if (!initialLoaded) {
    //     if (account) {
    //         setInitialLoaded(true);
    //         alert(account)
    //
    //         history.push("/profile/" + account);
    //
    //         setTimeout(async () => {
    //             await history.push("/");
    //         }, 5000);
    //     }
    // }

      // if (!initialLoaded) {
      //     setInitialLoaded(true);
      //
      //     if (window.location.href.includes("profile")) {
      //         //await history.push("/");
      //
      //         //setTimeout(async () => {alert(nfts)}, 5000); //history.push("/profile/" + account); }, 5000);
      //     }
      //
      //     if (account) {
      //         history.push("/profile/" + account);
      //
      //         alert(account);
      //     }
      // }

  }, [pathname]);

  return (
    <div className={styles.page}>
        {/*{account}*/}
      <Header nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs} vextBalance={vextBalance} setVextBalance={setVextBalance} account = {account} setAccount = {setAccount} connected = {connected} setConnected = {setConnected} userInfo = {userInfo} setUserInfo = {setUserInfo}/>
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  );
};

export default withRouter(Page);
