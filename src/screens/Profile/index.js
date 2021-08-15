import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Profile.module.sass";
import Icon from "../../components/Icon";
import User from "./User";
import Items from "./Items";
import Followers from "./Followers";
import OfferBuilder from "../../components/OfferBuilder"
//import VEAbi from '../../abis/ViridianExchange.json';
import Web3 from "web3";
import config from "../../local-dev-config";
import { useLocation } from "react-router-dom";

// data
import { bids } from "../../mocks/bids";
import { isStepDivisible } from "react-range/lib/utils";
import vNFTJSON from '../../abis/ViridianNFT.json';
import vTJSON from '../../abis/ViridianToken.json';
import RemoveSale from "../../components/RemoveSale";
import Modal from "../../components/Modal";


let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");


const navLinks = [
  "VNFTs",
  "On Sale",
  "Offers",
  "Likes",
  "Following",
  "Followers",
];

const socials = [
  {
    title: "twitter",
    url: "https://twitter.com/ui8",
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/ui8net/",
  },
  {
    title: "facebook",
    url: "https://www.facebook.com/ui8.net/",
  },
];

const following = [
  {
    name: "Sally Fadel",
    counter: "161 followers",
    avatar: "/images/content/avatar-5.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
  {
    name: "Aniya Harber",
    counter: "161 followers",
    avatar: "/images/content/avatar-6.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
    ],
  },
  {
    name: "Edwardo Bea",
    counter: "161 followers",
    avatar: "/images/content/avatar-7.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-4.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-6.jpg",
    ],
  },
  {
    name: "Reymundo",
    counter: "161 followers",
    avatar: "/images/content/avatar-8.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
    ],
  },
  {
    name: "Jeanette",
    counter: "161 followers",
    avatar: "/images/content/avatar-9.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
];

const followers = [
  {
    name: "Sally Fadel",
    counter: "161 followers",
    avatar: "/images/content/avatar-5.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
  {
    name: "Aniya Harber",
    counter: "161 followers",
    avatar: "/images/content/avatar-6.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
    ],
  },
  {
    name: "Edwardo Bea",
    counter: "161 followers",
    avatar: "/images/content/avatar-7.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-4.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-6.jpg",
    ],
  },
  {
    name: "Reymundo",
    counter: "161 followers",
    avatar: "/images/content/avatar-8.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
    ],
  },
  {
    name: "Jeanette",
    counter: "161 followers",
    avatar: "/images/content/avatar-9.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
];

const Profile = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [visibleOfferBuilder, setVisibleOfferBuilder] = useState(false);
  //const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [listedNFTs, setListedNFTs] = useState([]);
  const [fetchedAndParsed, setFetchedAndParsed] = useState(false);
  const nftsCopy = [];
  const [ownedListings, setOwnedListings] = useState([]);
  const [ownedOffers, setOwnedOffers] = useState([]);

  function getOwnedListings() {
    let curNFTs = props.nfts;

    // TODO: Filter listings not owned by the current wallet, maybe write a tool for filtering listings to help
    //  with the search bar
    // curNFTs.forEach((nft, index) =>  {
    //   //if (nft.owner != )
    //   curNFTs.splice(index, 1);
    // });

    let ol = []

    curNFTs.forEach((nft) => {
      //alert(JSON.stringify(props.account) + " vs " + JSON.stringify(nft.owner));
      if (nft.owner.toLowerCase() === props.account) {
        ol.push(nft);
      }
    });

    setOwnedListings(ol);
  }

  useEffect(async() => {
    console.log(JSON.stringify(props.nfts));
    getOwnedListings();
    console.log(ownedListings);

    //console.log('Getting owned NFTs');
    if (!fetchedAndParsed) {
      //setOwnedNFTs(await getOwnedNFTs());
      //alert(ownedNFTs);

      if (props.ownedNFTs.length > 0) {
        for (let i = 0; i < props.ownedNFTs.length; i++) {
          // await ownedNFTs.forEach((nft, i) => {
          //   extractMetadata(nft, i)
          // });
          //alert(JSON.stringify(ownedNFTs[i]));
          await extractMetadata(props.ownedNFTs[i], i);
        }
        props.setOwnedNFTs(nftsCopy);
      }

      setFetchedAndParsed(true);
    }
  }, [props.ownedNFTs]);

  async function ownerOf(tokenId) {
    const vNFTContractAddress = config.dev_contract_addresses.vnft_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    await console.log("ABIMETHODS: " + tokenId);
    let owner = vNFTABI.methods.ownerOf(tokenId).call();

    //alert(nft);

    return owner;
  }


  const location = useLocation();

  async function extractMetadata(nft, i) {
    console.log('Fetching from uri: ' + nft.uri);
    //const extractedObject =
    await fetch(nft.uri, {
      mode: "cors",
      method: "GET"
    }).then(async res => {
      console.log(res);
      console.log(res.status);
      await ownerOf(nft.id).then(async (owner) => {
        if (res.ok) {
          //alert("Owner OF: " + owner);
          const resJson = await res.json();
          //alert(JSON.stringify(resJson));
          const newNFT = {id: nft.id, uri: resJson, owner: owner}
          console.log(newNFT);
          nftsCopy.push(newNFT);
        }
      });
    });
    //console.log("JSON: " + JSON.stringify(extractedObject));
    // nft['uri'] = await extractedObject;
    // nftCopy[i] = nft;
  }


  return (
    <div className={styles.profile}>
      <Modal
          visible={visibleOfferBuilder}
          onClose={() => setVisibleOfferBuilder(false)}
          width="100ex"
      >
        <div>
          <OfferBuilder class={styles.items} nfts={props.ownedNFTs} otherNfts={[]} account={props.account} />
        </div>
      </Modal>
      <div
        className={cn(styles.head, { [styles.active]: visible })}
        style={{
          backgroundImage: "url(/images/content/bg-profile.jpg)",
        }}
      >
        <div className={cn("container", styles.container)}>
          <div className={styles.btns}>
            <button
                className={cn("button", styles.button)}
                onClick={() => setVisibleOfferBuilder(true)}
                // type="button" hide after form customization
                type="button"
            >
              <span>Make Offer</span>
            </button>
            <button
              className={cn("button-stroke button-small", styles.button)}
              onClick={() => setVisible(true)}
            >
              <span>Edit cover photo</span>
              <Icon name="edit" size="16" />
            </button>
            <Link
              className={cn("button-stroke button-small", styles.button)}
              to="profile-edit"
            >
              <span>Edit profile</span>
              <Icon name="image" size="16" />
            </Link>
          </div>
          <div className={styles.file}>
            <input type="file" />
            <div className={styles.wrap}>
              <Icon name="upload-file" size="48" />
              <div className={styles.info}>Drag and drop your photo here</div>
              <div className={styles.text}>or click to browse</div>
            </div>
            <button
              className={cn("button-small", styles.button)}
              onClick={() => setVisible(false)}
            >
              Save photo
            </button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        {JSON.stringify(props)}
        <div className={cn("container", styles.container)}>
          <User className={styles.user} item={socials} account = {location.state.account}/>
          <div className={styles.wrapper}>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                >
                  {x}
                </button>
              ))}
            </div>
            {/*{JSON.stringify(props.ownedNFTs[0].uri.image)}*/}
            <div className={styles.group}>
              <div className={styles.item}>
                {activeIndex === 0 && (
                    <Items class={styles.items} nfts={props.ownedNFTs} isListing={false} account={props.account} />
                )}
                {activeIndex === 1 && [
                  <Items class={styles.items} nfts={ownedListings} isListing={true} account={props.account}/>
                ]}
                {activeIndex === 2 && (
                  <Items class={styles.items} offers={['1', '2', '3']} />
                )}
                {activeIndex === 3 && (
                    <Items class={styles.items} items={[]} />
                )}
                {activeIndex === 4 && (
                  <Followers className={styles.followers} items={following} />
                )}
                {activeIndex === 5 && (
                  <Followers className={styles.followers} items={followers} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
