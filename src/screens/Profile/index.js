import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Profile.module.sass";
import Icon from "../../components/Icon";
import User from "./User";
import Items from "./Items";
import Followers from "./Followers";
//import VEAbi from '../../abis/ViridianExchange.json';
import Web3 from "web3";
import config from "../../local-dev-config";
import { useLocation } from "react-router-dom";


// data
import { bids } from "../../mocks/bids";
import { isStepDivisible } from "react-range/lib/utils";
import vNFTJSON from '../../abis/ViridianNFT.json';
import vTJSON from '../../abis/ViridianToken.json';


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

async function getOwnedNFTs() {

  //console.log(JSON.stringify(vNFTJSON));

  // NFT Contract Calls
  const vnftContractAddress = config.dev_contract_addresses.vnft_contract;
  let vnftABI = new web3.eth.Contract(vNFTJSON['abi'], vnftContractAddress);
  let nftIds = await vnftABI.methods.getOwnedNFTs().call();
  let nfts = [];
  //alert(JSON.stringify(vnftABI.methods));

  // await console.log(JSON.stringify(vNFTJSON['abi']));
  console.log(vnftContractAddress);

  if (nftIds) {
    for (let i = 0; i < nftIds.length; i++) {
      let nftId = nftIds[i]
      let uri = await vnftABI.methods.tokenURI(nftId).call();
      console.log(uri);
      nfts.push({id: nftId, uri: uri});
    }
  }
  console.log(nfts);
  //await console.log(vnftABI.methods);


  //console.log(nfts);

  return nfts;
}

const Profile = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [ownedNFTs, setOwnedNFTs] = useState([]);
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

    setOwnedListings(curNFTs);
  }

  useEffect(() => {
    console.log(JSON.stringify(props.nfts));
    getOwnedListings();
    console.log(ownedListings);
  }, []);

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
    setFetchedAndParsed(true);
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

  useEffect(async () => {
    //alert('called');

    //console.log('Getting owned NFTs');
    if (!fetchedAndParsed) {
      setOwnedNFTs(await getOwnedNFTs());
      //console.log(ownedNFTs);

      if (ownedNFTs.length > 0) {
        for (let i = 0; i < ownedNFTs.length; i++) {
          // await ownedNFTs.forEach((nft, i) => {
          //   extractMetadata(nft, i)
          // });
          await extractMetadata(ownedNFTs[i], i);
        }
        setOwnedNFTs(nftsCopy);
      }
    }
  }, [ownedNFTs]);


  return (
    <div className={styles.profile}>
      <div
        className={cn(styles.head, { [styles.active]: visible })}
        style={{
          backgroundImage: "url(/images/content/bg-profile.jpg)",
        }}
      >
        <div className={cn("container", styles.container)}>
          <div className={styles.btns}>
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
            <div className={styles.group}>
              <div className={styles.item}>
                {activeIndex === 0 && (
                  <Items class={styles.items} nfts={ownedNFTs} isListing={false} account={props.account} />
                )}
                {activeIndex === 1 && [
                  <Items class={styles.items} nfts={ownedListings} isListing={true} account={props.account}/>
                ]}
                {activeIndex === 2 && (
                  <Items class={styles.items} items={[]} />
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
