import React, { useState, useEffect } from "react";
import cn from "classnames";
import Slider from "react-slick";
import styles from "./HotBid.module.sass";
import Icon from "../Icon";
import NFT from "../NFT";
import Pack from "../Pack";

// data

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const Hot = (props, { classSection }) => {
  // useEffect(async () => {
  //   alert(JSON.stringify(props.listings))
  // }, []);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 1179,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className={cn(classSection, styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrapper}>
          <h3 className={cn("h3", styles.title)}>Hot listings</h3>
          <div className={styles.inner}>
            <Slider className="bid-slider" {...settings}>
              {props.nfts.map((x, index) => {
                if (x.isVNFT) {
                  return (<NFT key={index} className={styles.card} item={x} isListing={true} account={props.account}/>);
                }
                else {
                  return (<Pack key={index} className={styles.card} item={x} isListing={true} account={props.account}/>);
                }
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hot;
