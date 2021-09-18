import React, { useState, useEffect } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";
import Fuse from "fuse.js";

const nav = [
  {
    url: "/search01",
    title: "Discover",
  },
  {
    url: "/faq",
    title: "How it works",
  },
  {
    url: "/BuyVEXT",
    title: "Buy $VEXT",
  },
  {
    url: "/profile",
    title: "Profile",
  },
];

const Headers = (props) => {
  const [visibleNav, setVisibleNav] = useState(false);
  //const [search, setSearch] = useState("");
  // Change the pattern
  const [pattern, setPattern] = useState("");
  const [searchString, setSearchString] = useState("");
  const [runFuse, setRunFuse] = useState(false);
  const [fuseResults, setFuseResults] = useState([]);

  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: [
      "cardName",
      "cardNum",
      "grade"
    ]
  };

  const fuse = new Fuse(props.nfts, options);

  useEffect(async () => {
    //alert(JSON.stringify(fuse.search(pattern)));
    props.setFilteredNFTs(fuse.search(pattern));
    setPattern("");
  }, [runFuse]);

  useEffect(async () => {
    const curFuseSearch = fuse.search(pattern);
    console.log("CFS: " + JSON.stringify(curFuseSearch));
    let fuseResultsMod = [];
    if (pattern) {
      curFuseSearch.map((card, index) => {
        let curName = card.item.cardName;
        //TODO: Figure out if more complex search results are necessary
        //let curNameNum = card.item.cardName + " - " + card.item.cardNum;
        if (!fuseResultsMod.includes({key: curName, text: curName, value: curName})) {
          fuseResultsMod.push({key: curName, text: curName, value: curName});
        }
      });
      setFuseResults(fuseResultsMod);
    }
    else {
      setFuseResults([]);
    }
    console.log(JSON.stringify(fuseResults));
    console.log("PAT: " + pattern);
  }, [pattern]);

  const handleSetPattern = (value) => {
    if (value === "" || !value) {
      setPattern("");
    }
    else {
      setPattern(value);
    }
  };

  function handleSetSearching(value, setSearching) {
    if (value === "" || value === undefined || !value) {
      setSearching(false);
    }
    else {
      setSearching(true);
    }
  }

  const handleSubmit = (e) => {
    setRunFuse(!runFuse);
    //handleSetSearching(pattern, props.setSearching);
  };

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/logo_words.svg"
            srcDark="/logo_words.svg"
            alt="Viridian Exchange"
          />
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <Link
                className={styles.link}
                // activeClassName={styles.active}
                to={x.url}
                key={index}
              >
                {x.title}
              </Link>
            ))}
          </nav>
          <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              onChange={(e) => {setPattern(e.target.value); setSearchString(e.target.value); setFuseResults([]);}}
              value={searchString}
              name="search"
              placeholder="Search"
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="20" />
            </button>
          </form>
          <Link
            className={cn("button-small", styles.button)}
            to="/upload-variants"
          >
            Upload
          </Link>
        </div>


        {/*<Notification className={styles.notification} />*/}


        {/*<Link*/}
        {/*  className={cn("button-small", styles.button)}*/}
        {/*  to="/upload-variants"*/}
        {/*>*/}
        {/*  Buy $VEXT*/}
        {/*</Link>*/}
        <Link
            className={cn("button-small", styles.button)}
            to="/BuyVEXT"
        >
          Buy $VEXT
        </Link>
        {/* <Link
          className={cn("button-stroke button-small", styles.button)}
          to="/connect-wallet"
        >
          Connect Wallet
        </Link> */}
        <User vextBalance={props.vextBalance} setVextBalance={props.setVextBalance} className={styles.user} account = {props.account} setAccount = {props.setAccount}
              connected = {props.connected} setConnected = {props.setConnected} userInfo = {props.userInfo} setUserInfo={props.setUserInfo}/>
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
};

export default withRouter(Headers);
