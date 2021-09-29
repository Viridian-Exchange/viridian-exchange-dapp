import React, { useState } from "react";
import cn from "classnames";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import styles from "./Popular.module.sass";
import Add from "./Add";
import Icon from "../../../components/Icon";
import Dropdown from "../../../components/Dropdown";
import DropdownEmpty from "../../../components/DropdownEmpty";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const dateOptions = ["Today", "Morning", "Dinner", "Evening"];
const directionOptions = ["Sellers", "Buyers"];

const Popular = (props) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    adaptiveHeight: true,
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
        breakpoint: 1340,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
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

  const items = [
    {
      name: "Edd Harris",
      sign: "/images/content/cup.svg",
      number: "1",
      url: "/profile",
      color: "#3772FF",
      avatar: "/images/content/avatar-5.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Odell Hane",
      sign: "/images/content/donut.svg",
      number: "2",
      url: "/profile",
      color: "#9757D7",
      avatar: "/images/content/avatar-6.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Marlee Kuphal",
      sign: "/images/content/lightning.svg",
      number: "3",
      url: "/profile",
      color: "#45B26B",
      avatar: "/images/content/avatar-7.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Payton Kunde",
      sign: "/images/content/donut.svg",
      number: "4",
      url: "/profile",
      color: "#23262F",
      avatar: "/images/content/avatar-8.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Payton Buckridge",
      sign: "/images/content/donut.svg",
      number: "5",
      url: "/profile",
      color: "#777E90",
      avatar: "/images/content/avatar-9.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Edd Harris",
      sign: "/images/content/cup.svg",
      number: "1",
      url: "/profile",
      color: "#3772FF",
      avatar: "/images/content/avatar-5.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Odell Hane",
      sign: "/images/content/donut.svg",
      number: "2",
      url: "/profile",
      color: "#9757D7",
      avatar: "/images/content/avatar-6.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Marlee Kuphal",
      sign: "/images/content/lightning.svg",
      number: "3",
      url: "/profile",
      color: "#45B26B",
      avatar: "/images/content/avatar-7.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Edd Harris",
      sign: "/images/content/cup.svg",
      number: "1",
      url: "/profile",
      color: "#3772FF",
      avatar: "/images/content/avatar-5.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Odell Hane",
      sign: "/images/content/donut.svg",
      number: "2",
      url: "/profile",
      color: "#9757D7",
      avatar: "/images/content/avatar-6.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Marlee Kuphal",
      sign: "/images/content/lightning.svg",
      number: "3",
      url: "/profile",
      color: "#45B26B",
      avatar: "/images/content/avatar-7.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Payton Kunde",
      sign: "/images/content/donut.svg",
      number: "4",
      url: "/profile",
      color: "#23262F",
      avatar: "/images/content/avatar-8.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Payton Buckridge",
      sign: "/images/content/donut.svg",
      number: "5",
      url: "/profile",
      color: "#777E90",
      avatar: "/images/content/avatar-9.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Edd Harris",
      sign: "/images/content/cup.svg",
      number: "1",
      url: "/profile",
      color: "#3772FF",
      avatar: "/images/content/avatar-5.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Odell Hane",
      sign: "/images/content/donut.svg",
      number: "2",
      url: "/profile",
      color: "#9757D7",
      avatar: "/images/content/avatar-6.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
    {
      name: "Marlee Kuphal",
      sign: "/images/content/lightning.svg",
      number: "3",
      url: "/profile",
      color: "#45B26B",
      avatar: "/images/content/avatar-7.jpg",
      reward: "/images/content/reward-1.svg",
      price: "<span>2.456</span> ETH",
    },
  ];



  const [date, setDate] = useState(dateOptions[0]);
  const [direction, setDirection] = useState(directionOptions[0]);

  return (
    <div className={cn("section-bg", styles.section)}>
      {/*{JSON.stringify(props.users)}*/}
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.box}>
            <div className={styles.stage}>Popular</div>
            <DropdownEmpty
              className={styles.dropdown}
              value={direction}
              setValue={setDirection}
              options={directionOptions}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.label}>timeframe</div>
            <Dropdown
              className={styles.dropdown}
              value={date}
              setValue={setDate}
              options={dateOptions}
            />
          </div>
        </div>
        <div className={styles.wrapper}>
          {/*{"ONTE: " + JSON.stringify(props.ownedNFTs)}*/}
          <Slider className="popular-slider" {...settings}>
            {/*{JSON.stringify(items[2])}*/}
            {props.users.map((x, index) => (
              <div className={styles.slide} key={index}>
                <div className={styles.item}>
                  <div className={styles.head}>
                    {/*<div*/}
                    {/*  className={styles.rating}*/}
                    {/*  //style={{ backgroundColor: items[index].color }}*/}
                    {/*>*/}
                    {/*  <div className={styles.icon}>*/}
                    {/*    <img src={items[index].sign} alt="Rating" />*/}
                    {/*  </div>*/}
                    {/*  <div className={styles.number}>#{items[index].number}</div>*/}
                    {/*</div>*/}
                    <div className={styles.control}>
                      <Add className={styles.button} />
                      <Link className={styles.button} to={{ pathname: `/profile/${x.username}`,
                        state: {
                          nfts: props.nfts,
                          userInfo: JSON.stringify(props.userInfo),
                          //setUserInfo: props.setUserInfo,
                          ownedNFTs: props.ownedNFTs,
                          ownedPacks: props.ownedPacks,
                          //setOwnedNFTs: props.setOwnedNFTs,
                          users: props.users,

                        curAccount: props.account, profilePhotoURL: x.profilePhotoURL, bio: x.bio, coverPhotoURL: x.coverPhotoURL, website: x.website, twitter: x.twitter,
                          username: x.username, account: x.username, displayName: x.displayName, following: x.following, followers: x.followers, likes: x.likes} }}>
                        <Icon name="arrow-expand" size="24" />
                      </Link>
                    </div>
                  </div>
                  <div className={styles.body}>
                    <div className={styles.avatar}>
                      <img src={x.profilePhotoURL} alt="Avatar" />
                      <div className={styles.reward}>
                        {/*<img src={items[index].reward} alt="Reward" />*/}
                      </div>
                    </div>
                    <div className={styles.name}>{x.displayName}</div>
                    {/*<div*/}
                    {/*  className={styles.price}*/}
                    {/*  dangerouslySetInnerHTML={{ __html: items[index].price }}*/}
                    {/*/>*/}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Popular;
