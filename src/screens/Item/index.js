import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Users from "./Users";
import Control from "./Control";
import Options from "./Options";
import { useLocation, withRouter, useHistory } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {parseVextAmount} from "../../Utils";
import {FetchUserRet, FetchUser} from "../../apis/UserAPI";
import {
  useCryptoPrices,
  CryptoPriceProvider
} from "react-realtime-crypto-prices";
import ReactImageMagnify from 'react-image-magnify';
import CardInspector from "../../components/3DViewer";

const navLinks = ["Info", "Owners", "History", "Bids"];

const Item = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const [ownerUser, setOwnerUser] = useState({});
  //const {passedState} = props.location.state
  const location = useLocation();

  const prices = useCryptoPrices(["eth"]);

  useEffect(async () => {
    //alert(JSON.stringify(location));
    //history.push(location.pathname);
    if(location.state) {
      if (location.state.nftOwner) {
        let res = await FetchUserRet(location.state.nftOwner.toLowerCase());
        setOwnerUser(res);
      }
    }
    //alert(JSON.stringify(res));
  }, [location.state])

  if (location) {
    if (location.state) {
      const categories = [
        {
          category: "black",
          content: location.state.uri.type,
        },
        {
          category: "gold",
          content: location.state.uri.grade,
        },
        {
          category: "purple",
          content: location.state.uri.set,
        },
      ];

      const users = [
        {
          name: "Raquel Will",
          position: "Owner",
          avatar: location.state.curProfilePhoto,
          reward: "/images/content/reward-1.svg",
        },
      ];

  return (
    <>
      {/*<div>{JSON.stringify(location.state)}</div>*/}
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.bg}>
            <div style={{maxWidth: '55ex'}} className={styles.preview} onMouseEnter={() => setShowCategories(true)}
                 onMouseLeave={() => setShowCategories(false)}>
              {/*{!location.state.isPack &&*/}
              {/*  <Carousel showThumbs={false} style={{maxWidth: '55ex', textAlign: 'center'}}>*/}
              {/*      <div style={{maxWidth: '55ex', textAlign: 'center'}}>*/}
              {/*        <div className={styles.categories} >*/}
              {/*      {showCategories && categories.map((x, index) => (*/}
              {/*          <div*/}
              {/*              className={cn(*/}
              {/*                  { "status-black": x.category === "black" },*/}
              {/*                  { "status-purple": x.category === "purple" },*/}
              {/*                  { "status-gold": x.category === "gold" },*/}
              {/*                  { "status-blue": x.category === "blue" },*/}
              {/*                  styles.category*/}
              {/*              )}*/}
              {/*              key={index}*/}
              {/*          >*/}
              {/*            {x.content}*/}
              {/*          </div>*/}

              {/*      ))}*/}
              {/*    </div>*/}
              {/*    /!*<img style={{maxWidth: '10ex'}}*!/*/}
              {/*    /!*    //srcSet="/images/content/item-pic@2x.jpg 2x"*!/*/}
              {/*    /!*    src={location.state.uri.image}*!/*/}
              {/*    /!*    alt="Item"*!/*/}
              {/*/>*/}
              {/*    <ReactImageMagnify {...{*/}
              {/*      enlargedImagePosition: 'over',*/}
              {/*      smallImage: {*/}
              {/*        alt: 'Item',*/}
              {/*        isFluidWidth: true,*/}
              {/*        src: location.state.uri.image*/}
              {/*      },*/}
              {/*      largeImage: {*/}
              {/*        src: location.state.uri.image,*/}
              {/*        width: 1600,*/}
              {/*        height: 2200*/}
              {/*      }*/}
              {/*    }} />*/}

              {/*    </div>*/}
              {/*    <div style={{maxWidth: '55ex'}}>*/}
              {/*      <div className={styles.categories}>*/}
              {/*        {showCategories && categories.map((x, index) => (*/}
              {/*            <div*/}
              {/*                className={cn(*/}
              {/*                    { "status-black": x.category === "black" },*/}
              {/*                    { "status-purple": x.category === "purple" },*/}
              {/*                    { "status-gold": x.category === "gold" },*/}
              {/*                    { "status-blue": x.category === "blue" },*/}
              {/*                    styles.category*/}
              {/*                )}*/}
              {/*                key={index}*/}
              {/*            >*/}
              {/*              {x.content}*/}
              {/*            </div>*/}
              {/*        ))}*/}
              {/*      </div>*/}
              {/*      /!*<img style={{maxWidth: '10ex'}}*!/*/}
              {/*      /!*    //srcSet="/images/content/item-pic@2x.jpg 2x"*!/*/}
              {/*      /!*    src={location.state.uri.imageBack}*!/*/}
              {/*      /!*    alt="Item2"*!/*/}
                    {/*/>*/}

              {/*      <ReactImageMagnify {...{*/}
              {/*        enlargedImagePosition: 'over',*/}
              {/*        smallImage: {*/}
              {/*          alt: 'Item',*/}
              {/*          isFluidWidth: true,*/}
              {/*          src: location.state.uri.imageBack*/}
              {/*        },*/}
              {/*        largeImage: {*/}
              {/*          src: location.state.uri.imageBack,*/}
              {/*          width: 1200,*/}
              {/*          height: 1800*/}
              {/*        }*/}
              {/*      }} />*/}
              {/*    </div>*/}
              {/*  </Carousel>}*/}

              {!location.state.isPack && <div id='CI' style={{maxWidth: '55ex', maxHeight: '10ex', marginLeft:'-10ex'}}>
                    <CardInspector />
              </div>}
              {location.state.isPack &&
              <video autoPlay loop muted playsInline style={{maxWidth: '100ex', marginBottom: '12ex'}}>
                <source src={location.state.uri.image} type="video/mp4"/>
              </video> }
            </div>
            {/*{JSON.stringify(location.state)}*/}
          </div>
          <div style={{marginLeft: '10ex', marginTop: '5ex'}}>
          </div>
            <div className={styles.details}>
            <h1 className={cn("h3", styles.title)}>{location.state.uri.name}</h1>
            <div className={styles.cost}>
              {location.state.price && [<div className={cn("status-stroke-green", styles.price)}>
                {location.state.isETH ?
                    <div>{parseVextAmount(location.state.price)} ETH </div> : <div>{parseVextAmount(location.state.price)} USDC </div>
                }
              </div>,
                <div>{location.state.isETH && <div className={cn("status-stroke-black", styles.price)}>
                <>{prices.eth && <>${Math.round((prices.eth * parseVextAmount(location.state.price)) * 100) / 100}</>}</>
                </div>}</div>]}
              <div className={styles.counter} style={{marginLeft: '1ex'}}>#{location.state.id}</div>
            </div>

            {/*<div className={styles.info}>*/}
            {/*  This NFT Card will give you Access to Special Airdrops. To learn*/}
            {/*  more about UI8 please visit{" "}*/}
            {/*  <a*/}
            {/*    href="https://ui8.net"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*  >*/}
            {/*    https://ui8.net*/}
            {/*  </a>*/}
            {/*</div>*/}

            {/*<div className={styles.nav}>*/}
            {/*  {navLinks.map((x, index) => (*/}
            {/*    <button*/}
            {/*      className={cn(*/}
            {/*        { [styles.active]: index === activeIndex },*/}
            {/*        styles.link*/}
            {/*      )}*/}
            {/*      onClick={() => setActiveIndex(index)}*/}
            {/*      key={index}*/}
            {/*    >*/}
            {/*      {x}*/}
            {/*    </button>*/}
            {/*  ))}*/}
            {/*</div>*/}
            {/*{JSON.stringify(ownerUser)}*/}

            <Users account={props.account} className={styles.users} items={users} owner={location.state.nftOwner} ownerUser={ownerUser} />
            <Control setSuccess={props.setSuccess} setError={props.setError} isETH={location.state.isETH} isVNFT={location.state.isVNFT} isPack={location.state.isPack} price={location.state.price} className={styles.control} state={location.state} owner={location.state.nftOwner} account={props.account} isListing={location.state.isListing} />
              <Options setSuccess={props.setSuccess} setError={props.setError} className={styles.options} isETH={location.state.isETH} price={location.state.price} tokenId={location.state.id} id={location.state.listingId} owner={location.state.nftOwner} account={props.account} userInfo = {props.userInfo} setUserInfo = {props.setUserInfo} isListing={location.state.isListing} isPack = {location.state.isPack} />

            </div>
        </div>
      </div>
    </>
  );

    }
    else {
      return JSON.stringify(location);
    }
  }
  else {
    return JSON.stringify(location);
  }
}

export default withRouter(Item);
