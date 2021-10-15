import React, { useState, useEffect } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";
import { useLocation, useHistory } from "react-router-dom";
import Fuse from "fuse.js";
import SearchDropdown from "../SearchDropdown";

// const nav = [
//   {
//     url: "/search01",
//     title: "Discover",
//   },
//   {
//     url: "/about",
//     title: "About",
//   },
//   {
//     url: "/faq",
//     title: "FAQ",
//   },
//
//   {
//     url: "/BuyVEXT",
//     title: "Buy $VEXT",
//   },
//   {
//     url: "/profile",
//     title: "Profile",
//   },
// ];

const Headers = (props) => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [pattern, setPattern] = useState("");
  const [searchString, setSearchString] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [visible, setVisible] = useState([]);
  const [fuse, setFuse] = useState("");

  const location = useLocation();
  const history = useHistory();

  let dropdownOptionsTemp = [];

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
      "uri.name",
      "uri.year",
      "uri.grade",
      "uri.set",
      "uri.grade",
      "id",
      "displayName",
      "username",
      "twitter"
    ]
  };

  useEffect(async () => {
    let tempNFTs = [...props.nfts];
    let tempUsers = [...props.users];
    let combined = tempNFTs.concat(tempUsers);

    //await setDropdownOptions(combined);

    //alert(JSON.stringify(tempUsers));

    setFuse(new Fuse(combined, options));

    //alert(JSON.stringify(fuse));
  }, [props.nfts, props.users]);


  const handleSubmit = (e) => {

    //alert(JSON.stringify(searchString))
    if (searchString && !location.pathname.includes("search01")) {
      //alert("hI")
      history.push('/search01/?search=' + location.search);
    }
  };

  const handleChange = (input) => {
    setSearchString(input);

    //alert(JSON.stringify(fuse));

    if (fuse !== "") {
      const result = fuse.search(input);

      result.map((item) => {
        let option = item.item;
        if (option.displayName) {
          dropdownOptionsTemp.push({label: option.displayName, image: option.profilePhotoURL, address: option.username});
        }
        else if (option.uri) {
          dropdownOptionsTemp.push({label: option.uri.name, image: option.uri.image, id: option.id, isVNFT: option.isVNFT});
        }
      });

      setDropdownOptions(dropdownOptionsTemp);

      //console.log(result);
    }

    setVisible(true);

  }

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
            <Link
                className={styles.link}
                activeClassName={styles.active}
                to="/search01"
                key={0}
            >
              Discover
            </Link>
            <a
                className={styles.link}
                // activeClassName={styles.active}
                href="https://viridianexchange.com"
                // key={0}
            >
              About
            </a>
            <Link
                className={styles.link}
                activeClassName={styles.active}
                to="/faq"
                key={1}
            >
              Help
            </Link>

            {/*{nav.map((x, index) => (*/}
            {/*  <a*/}
            {/*    className={styles.link}*/}
            {/*    // activeClassName={styles.active}*/}
            {/*    href="https://viridianexchange.com"*/}
            {/*    // key={index}*/}
            {/*  >*/}
            {/*    {x.title}*/}
            {/*  </a>*/}
            {/*))}*/}
          </nav>
          <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
                autoComplete="off"
              className={styles.input}
              type="text"
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              value={searchString}
              name="search"
              placeholder="Search"
              required
            />
            <SearchDropdown //className={styles.dropdown}
                            //value={option}
                            //setValue={setOption}
                            options={dropdownOptions}
                            visible={visible}
                            setVisible={setVisible}

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
          Buy Crypto
        </Link>
        {/* <Link
          className={cn("button-stroke button-small", styles.button)}
          to="/connect-wallet"
        >
          Connect Wallet
        </Link> */}
        <User ethBalance={props.ethBalance} setEthBalance={props.setEthBalance} vextBalance={props.vextBalance} setVextBalance={props.setVextBalance} className={styles.user} account = {props.account} setAccount = {props.setAccount}
              connected = {props.connected} setConnected = {props.setConnected} userInfo = {props.userInfo} setUserInfo={props.setUserInfo}/>
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}>
        </button>
      </div>
    </header>
  );
};

export default withRouter(Headers);
