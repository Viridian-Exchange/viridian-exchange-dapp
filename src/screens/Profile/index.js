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
import { useLocation, useHistory } from "react-router-dom";
import ImageUpload from "../../ImageUpload";
import S3FileUpload from "react-s3";
import s3config from "../../config";
import {getOffersFromUser} from "../../smartContracts/ViridianExchangeMethods";
import ReactTooltip from 'react-tooltip';

// data
import { bids } from "../../mocks/bids";
import { isStepDivisible } from "react-range/lib/utils";
import vNFTJSON from '../../abis/ViridianNFT.json';
import vpJSON from '../../abis/ViridianPack.json';
import vTJSON from '../../abis/ViridianToken.json';
import {HandleUpdateUser} from "../../apis/UserAPI";
import RemoveSale from "../../components/RemoveSale";
import Modal from "../../components/Modal";


let web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");


const navLinks = [
  "VNFTs",
  "Packs",
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
  const oNftsCopy = [];
  const packsCopy = [];
  const oPacksCopy = [];
  const [ownedListings, setOwnedListings] = useState([]);
  const [offers, setOffers] = useState([]);
  const [otherNFTs, setOtherNFTs] = useState([]);
  const [otherPacks, setOtherPacks] = useState([]);
  const [files, setFiles] = useState([]);
  const [coverPhotoURL, setCoverPhotoURL] = useState(props.userInfo.coverPhotoURL);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [followed, setFollowed] = useState(false);



  // TODO: THIS WILL SET DIFFERENTLY DEPENDING ON WHETHER ITS ON CURRENT USER PROFILE OR ANOTHER USERS PROFILE PAGE
  const [followersInfo, setFollowersInfo] = useState([]);
  //TODO: do current followers info
  const [followingInfo, setFollowingInfo] = useState([]);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const location = useLocation();
  const history = useHistory();

  async function getFollowers(isOtherAccount) {
    if (!isOtherAccount) {
      let userList = props.users;
      let followers = props.userInfo.followers;

      if (followers) {
        userList.reduce((acc, val) => {
          if (!!followers.find(user => user === val.username)) {
            acc.push(val);
          }
          setFollowersInfo(acc);
          return acc;
        }, [])
      }
    }
    else {
      let userList = props.users;
      let followers = location.state.followers;
      console.log("Following: " + following);

      if (followers) {
        userList.reduce((acc, val) => {
          if (!!followers.find(user => user === val.username)) {
            acc.push(val);
          }
          setFollowersInfo(acc);
          return acc;
        }, [])
      }
    }

  }


  async function getFollowing(isOtherAccount) {
    if (!isOtherAccount) {
      let userList = props.users;
      let following = props.userInfo.following;
      console.log("Following: " + following);

      if (following) {
        userList.reduce((acc, val) => {
          if (!!following.find(user => user === val.username)) {
            acc.push(val);
          }
          setFollowingInfo(acc);
          return acc;
        }, [])
      }
    }
    else {
      let userList = props.users;
      let following = location.state.following;
      console.log("Following: " + following);

      if (following) {
        userList.reduce((acc, val) => {
          if (!!following.find(user => user === val.username)) {
            acc.push(val);
          }
          setFollowingInfo(acc);
          return acc;
        }, [])
      }
    }
  }


  async function getOtherOwnedNFTs() {
    //alert('gettingOwnedNFTs');

    //console.log(JSON.stringify(vNFTJSON));

    // NFT Contract Calls
    const vnftContractAddress = config.dev_contract_addresses.vnft_contract;
    let vnftABI = new web3.eth.Contract(vNFTJSON['abi'], vnftContractAddress);
    //alert(JSON.stringify(vnftABI.methods));
    //alert(location.state.account)
    if(location.state) {
      if (location.state) {
        if (location.state.account) {
          //alert(location.state.account)
          let nftIds = await vnftABI.methods.getOwnedNFTs().call({from: location.state.account});
          let nfts = [];
          //alert(JSON.stringify(vnftABI.methods));

          // await console.log(JSON.stringify(vNFTJSON['abi']));
          console.log(vnftContractAddress);
          console.log("test");

          if (nftIds) {
            //alert(JSON.stringify(nftIds));
            for (let i = 0; i < nftIds.length; i++) {
              let nftId = nftIds[i]
              let uri = await vnftABI.methods.tokenURI(nftId).call();
              //console.log("XXX: " + uri);
              nfts.push({id: nftId, uri: uri});
            }

            //alert(nfts);
          }

          if (location) {
            if (location.state.account) {
              setOffers(await getOffersFromUser(location.state.account));
            } else {
              setOffers(await getOffersFromUser(props.account));
            }
          }

          //alert(JSON.stringify(offers));
          //alert(nftIds);
          //await console.log(vnftABI.methods);

          //alert(JSON.stringify(nfts));

          setOtherNFTs(nfts);
        }
      }
    }
    else {

    }
  }

  async function getOtherOwnedPacks() {
    //alert('gettingOwnedNFTs');

    //console.log(JSON.stringify(vNFTJSON));

    // NFT Contract Calls
    const vpContractAddress = config.dev_contract_addresses.vp_contract;
    let vpABI = new web3.eth.Contract(vpJSON['abi'], vpContractAddress);
    //alert(JSON.stringify(vnftABI.methods));
    //alert(location.state.account)
    if(location.state) {
      if (location.state.account) {
        let nftIds = await vpABI.methods.getOwnedNFTs().call({from: location.state.account});
        let nfts = [];
        //alert(JSON.stringify(vnftABI.methods));

        // await console.log(JSON.stringify(vNFTJSON['abi']));
        console.log(vpContractAddress);
        console.log("test");

        if (nftIds) {
          //alert(JSON.stringify(nftIds));
          for (let i = 0; i < nftIds.length; i++) {
            let nftId = nftIds[i]
            let uri = await vpABI.methods.tokenURI(nftId).call();
            //console.log("XXX: " + uri);
            nfts.push({id: nftId, uri: uri});
          }

          //alert(JSON.stringify(nfts));
        }

        setOtherPacks(nfts);
      }
    }
    else {

    }
  }

  function getOwnedListings() {
    let curNFTs = props.nfts;

    //alert("CNFTS: " + JSON.stringify(curNFTs));

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

    // let curPacks = props.packs;
    //
    // //alert("CNFTS: " + JSON.stringify(curNFTs));
    //
    // // TODO: Filter listings not owned by the current wallet, maybe write a tool for filtering listings to help
    // //  with the search bar
    // // curNFTs.forEach((nft, index) =>  {
    // //   //if (nft.owner != )
    // //   curNFTs.splice(index, 1);
    // // });
    //
    // curPacks.forEach((pack) => {
    //   //alert(JSON.stringify(props.account) + " vs " + JSON.stringify(nft.owner));
    //   if (pack.owner.toLowerCase() === props.account) {
    //     ol.push(pack);
    //   }
    // });
    //
    // alert(JSON.stringify(ol))

    setOwnedListings(ol);
  }

  useEffect(async () => {
    getOwnedListings();
  }, [props.nfts])

  useEffect(async () => {
    if (location.state) {
      if (location.state.account !== props.account) {
        if (otherNFTs.length === 0) {
          await getOtherOwnedNFTs();
        }
      }
    }
    }, [location.state, otherNFTs, otherPacks]);

  useEffect(async () => {
    if (otherPacks.length === 0) {
      await getOtherOwnedPacks();
    }
  }, [otherNFTs, otherNFTs])

  useEffect(async () => {
    if(props.ownedNFTs[0]) {
      if (!props.ownedNFTs[0].uri.name) {
        if (location.state) {
          console.log(JSON.stringify(props.nfts));
          //getOwnedListings();
          console.log(ownedListings);

          // if (otherNFTs.length === 0) {
          //   await getOtherOwnedNFTs();
          // }
          // if (otherPacks.length === 0) {
          //   await getOtherOwnedPacks();
          // }

          if (!location.state) {
            // await setInitialLoaded(true);
            // await history.push("/");
            // await history.push(location.pathname);
          }


          //console.log('Getting owned NFTs');
          //if (!fetchedAndParsed) {
          //setOwnedNFTs(await getOwnedNFTs());
          //alert(ownedNFTs);


          if (otherNFTs.length > 0) {
            for (let i = 0; i < otherNFTs.length; i++) {
              // await ownedNFTs.forEach((nft, i) => {
              //   extractMetadata(nft, i)
              // });
              //alert(JSON.stringify(ownedNFTs[i]));
              await extractMetadata(oNftsCopy, otherNFTs[i], i, false);

              await console.log(oNftsCopy);
            }
            await setOtherNFTs(oNftsCopy);
          }

            if (otherPacks.length > 0) {
              for (let i = 0; i < otherPacks.length; i++) {
                // await ownedNFTs.forEach((nft, i) => {
                //   extractMetadata(nft, i)
                // });
                //alert(JSON.stringify(ownedNFTs[i]));
                await extractMetadata(oPacksCopy, otherPacks[i], i, true);

                //await alert(JSON.stringify(oPacksCopy));
              }
              await setOtherPacks(oPacksCopy);
            //await alert("OTHERNFTS: " + JSON.stringify(oNftsCopy));

          }

          if (props.ownedNFTs.length > 0) {
            for (let i = 0; i < props.ownedNFTs.length; i++) {
              await extractMetadata(nftsCopy, props.ownedNFTs[i], i, false);
            }

            if (nftsCopy[0]) {
              if (nftsCopy[0].uri.image) {
                //alert("NFTC " + JSON.stringify(nftsCopy))
                // if (!props.ownedNFTs[0].owner) {
                  //alert("hi")
                  await props.setOwnedNFTs(nftsCopy);
                //}
              }
            }
          }

          if (props.ownedPacks.length > 0) {
            //alert("EXTRACT")
            for (let i = 0; i < props.ownedPacks.length; i++) {
              await extractMetadata(packsCopy, props.ownedPacks[i], i, true);
            }

            if (packsCopy[0]) {
              if (packsCopy[0].uri.image) {
                //alert("PC " + JSON.stringify(packsCopy))
                await props.setOwnedPacks(packsCopy);
              }
            }
          }
        }
      }
    }
    if (location) {
      if (location.state.account === props.account) {
        getFollowing(false);
        getFollowers(false);
      }
      else {
        //TODO: SEE IF THIS WORKS
        getFollowing(true);
        getFollowers(true);
      }
    }
  }, [props.ownedNFTs, props.nfts, props.ownedPacks, location]);


  async function ownerOf(tokenId, isPack) {
    const vNFTContractAddress = config.dev_contract_addresses.vnft_contract;
    const vpContractAddress = config.dev_contract_addresses.vp_contract;

    let vNFTABI = new web3.eth.Contract(vNFTJSON['abi'], vNFTContractAddress);
    let vpABI = new web3.eth.Contract(vNFTJSON['abi'], vpContractAddress);
    await console.log("ABIMETHODSPROF: " + tokenId);
    let owner
    if (!isPack) {
      owner = vNFTABI.methods.ownerOf(tokenId).call();
    }
    else {
      owner = vpABI.methods.ownerOf(tokenId).call();
    }

    //alert(nft);

    return owner;
  }

  async function extractMetadata(nftc, nft, i, isPack) {
    console.log('Fetching from uri: ' + nft.uri);
    //const extractedObject =
    await fetch(nft.uri, {
      mode: "cors",
      method: "GET"
    }).then(async res => {
      console.log(res);
      console.log(res.status);
      await ownerOf(nft.id, isPack).then(async (owner) => {
        if (res.ok) {
          //alert("Owner OF: " + owner);
          const resJson = await res.json();
          console.log(JSON.stringify(resJson));
          //alert(JSON.stringify(resJson));
          const newNFT = {id: nft.id, uri: resJson, owner: owner}
          console.log(newNFT);

          await nftc.push(newNFT);
        }
      });
    });
    //console.log("JSON: " + JSON.stringify(extractedObject));
    // nft['uri'] = await extractedObject;
    // nftCopy[i] = nft;
  }


  const s3Upload = async (files) => {

    let file = files[0];
    let blob = file.slice(0, file.size, 'image/png');
    let newFile = new File([blob], props.account + "_cover" + '.png', {type: 'image/png'});
    // if (JSON.stringify(props.userInfo) == "{}") {
    //   await HandleAddUserSimple(props.setUserInfo, props.account);
    // }
    let data = await S3FileUpload.uploadFile(newFile, s3config.s3);
    setCoverPhotoURL(data.location);
    return data.location;

  }



  const addCoverToS3PlusDB = async () => {
    if (files.length != 0) {
      //alert("there is a file here!!");
      await s3Upload(files).then(async(res) => {
        setCoverPhotoURL(res);
        await updateUser(res);
      });
      // await s3Upload(files).then(async () => {
      //   await updateUser();
      // });
    }
    else {
      await updateUser(coverPhotoURL);
    }
  };

  const updateUser = async (coverPhotoURL) => {
    let res = await HandleUpdateUser(props.setUserInfo, props.account, props.userInfo.displayName, props.userInfo.bio, props.userInfo.website, props.userInfo.twitter, props.userInfo.profilePhotoURL,
        coverPhotoURL, props.userInfo.following, props.userInfo.followers, props.userInfo.likes);

    // if (res.status === 204) {
    //   setSuccessMessage(true);
    // }
    //alert("Success!:" + JSON.stringify(res));

  }

  //TODO: UPLOAD THEIR DEFAULT COVER TO S3 THEN PASS THE URL INTO HANDLEADDUSERSIMPLE SO IT SHOWS UP BY DEFAULT
  if (location) {
    if (location.state) {
      if (location.state.account === props.account) {
        return (
            <div className={styles.profile}>
              {/*{JSON.stringify(props.cameFromHome)}*/}
              {/*{JSON.stringify(props.ownedNFTs)}*/}
              <div
                  className={cn(styles.head, {[styles.active]: visible})}
                  style={{
                    backgroundImage: "url(" + props.userInfo.coverPhotoURL + "?" + new Date().getTime() + ")",
                    webkitBackfaceVisibility: 'hidden',
                    mozBackfaceVisibility:    'hidden',
                    msBackfaceVisibility:     'hidden'
                  }}
              >
                <div className={cn("container", styles.container)}>
                  <div className={styles.btns}>
                    <button
                        className={cn("button-stroke button-small", styles.button)}
                        onClick={() => setVisible(true)}
                    >
                      <span>Edit cover photo</span>
                      <Icon name="edit" size="16"/>
                    </button>
                    <Link
                        className={cn("button-stroke button-small", styles.button)}
                        to={{pathname: "/profile-edit", state: {userInfo: props.userInfo}}}
                    >
                      <span>Edit profile</span>
                      <Icon name="image" size="16"/>
                    </Link>

                    <div
                        className={cn("button-stroke button-small", styles.button)}
                    >
                      <button data-tip data-for='refresh' onClick={() => props.setFetchedAndParsed(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"/></svg>
                      </button>
                      <ReactTooltip id='refresh' effect='solid' type='dark'>
                        <span>Refresh if NFTs haven't shown up</span>
                      </ReactTooltip>
                    </div>
                  </div>
                  <div className={styles.file}>
                    <input className={styles.load} type="file" onChange={(e) => {
                      setFiles(e.target.files);
                    }}/>
                    <div className={styles.wrap}>
                      <Icon name="upload-file" size="48"/>
                      <div className={styles.info}>Drag and drop your photo here</div>
                      <div className={styles.text}>or click to browse</div>
                      <div className={styles.text}>{(files.length != 0) ? files[0].name : ""}</div>
                    </div>
                    <button
                        className={cn("button-small", styles.button)}
                        onClick={(e) => {
                          addCoverToS3PlusDB(e).then(setVisible(false));
                        }}
                    >
                      Save photo
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.body}>
                {/*{JSON.stringify(props)}*/}
                {/*{JSON.stringify(initialLoaded)}*/}
                <div className={cn("container", styles.container)}>
                  <User className={styles.user} item={socials} account={props.account} userInfo={props.userInfo} isCurrentUser={true}/>
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
                    {/*<div>{JSON.stringify(location.state)}</div>*/}
                    <div className={styles.group}>
                      <div className={styles.item}>
                        {activeIndex === 0 && (
                            <Items class={styles.items} nfts={props.ownedNFTs} isListing={false} account={location}
                                   curProfilePhoto = {props.userInfo.profilePhotoURL} userInfo = {props.userInfo} />
                        )}
                        {activeIndex === 1 && (
                            <Items class={styles.items} packs={props.ownedPacks} isListing={false} account={location}
                                   curProfilePhoto = {props.userInfo.profilePhotoURL} userInfo = {props.userInfo}/>
                        )}
                        {activeIndex === 2 && [
                          // <div>{JSON.stringify(ownedListings)}</div>,
                          <Items class={styles.items} nfts={ownedListings} isListing={true} account={props.account}
                                 curProfilePhoto = {props.userInfo.profilePhotoURL} userInfo = {props.userInfo}/>
                        ]}
                        {activeIndex === 3 && [
                          //<div>{JSON.stringify(offers)}</div>,
                            <Items users={props.users} class={styles.items} offers={offers} curProfilePhoto = {props.userInfo.profilePhotoURL}
                            curDisplayName={props.userInfo.displayName} userInfo = {props.userInfo}/>
                        ]}
                        {activeIndex === 4 && (
                            <Items class={styles.items} items={[]} userInfo = {props.userInfo}/>
                        )}
                        {activeIndex === 5 && (
                            <Followers className={styles.followers} items={followingInfo}/>
                        )}
                        {activeIndex === 6 && (
                            <Followers className={styles.followers} items={followersInfo}/>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
      } else {
        return (
            <div className={styles.profile}>
              {/*{JSON.stringify(props.ownedNFTs)}*/}
              <Modal
                  visible={visibleOfferBuilder}
                  onClose={() => setVisibleOfferBuilder(false)}
                  width="100ex"
                  style={{minWidth: '200ex'}}
              >
                <div>
                  <OfferBuilder class={styles.items} nfts={props.ownedNFTs} packs={props.ownedPacks} otherNFTs={otherNFTs} otherPacks={otherPacks} account={props.account} curAccount={location.state.curAccount}
                  to={location.state.account}/>
                  {/*<OfferBuilder class={styles.items} nfts={location.state.ownedNFTs} otherNfts={otherNFTs} account={props.account}/>*/}
                </div>
              </Modal>
              <div
                  className={cn(styles.head, {[styles.active]: visible})}
                  style={{
                    backgroundImage: "url(" + location.state.coverPhotoURL + "?" + new Date().getTime() +")",
                    webkitBackfaceVisibility: 'hidden',
                    mozBackfaceVisibility:    'hidden',
                    msBackfaceVisibility:     'hidden'
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
                  </div>
                  <div className={styles.file}>
                    <input className={styles.load} type="file" onChange={(e) => {
                      setFiles(e.target.files);
                    }}/>
                    <div className={styles.wrap}>
                      <Icon name="upload-file" size="48"/>
                      <div className={styles.info}>Drag and drop your photo here</div>
                      <div className={styles.text}>or click to browse</div>
                      <div className={styles.text}>{(files.length != 0) ? files[0].name : ""}</div>
                    </div>
                    <button
                        className={cn("button-small", styles.button)}
                        onClick={(e) => {
                          addCoverToS3PlusDB(e).then(setVisible(false));
                        }}
                    >
                      Save photo
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.body}>
                {/*{JSON.stringify(location.state)}*/}
                <div className={cn("container", styles.container)}>
                  {/*{location.state.profilePhotoURL}*/}
                  <User className={styles.user} item={socials} userInfo = {props.userInfo} curUser={location.state.curAccount} curUserInfo = {props.userInfo} account={location.state.account}
                        otherUserInfo={{
                          username: location.state.account,
                          displayName: location.state.displayName,
                          bio: location.state.bio,
                          following: location.state.following,
                          followers: location.state.followers,
                          likes: location.state.likes,
                          profilePhotoURL: location.state.profilePhotoURL,
                          coverPhotoURL: location.state.coverPhotoURL,
                          twitter: location.state.twitter,
                          website: location.state.website
                        }}
                        isCurrentUser={false} setUserInfo={props.setUserInfo} followed = {followed} setFollowed = {setFollowed}/>
                  <div className={styles.wrapper}>
                    <div className={styles.nav}>
                      {navLinks.map((x, index) => {
                            if (index !== 2 && index !== 3) {
                              return (<button
                                  className={cn(styles.link, {
                                    [styles.active]: index === activeIndex,
                                  })}
                                  key={index}
                                  onClick={() => setActiveIndex(index)}
                              >
                                {x}
                              </button>)
                            }
                          },
                      )}
                    </div>
                    {/*{JSON.stringify(props.ownedNFTs[0].uri.image)}*/}
                    {/*<div>{JSON.stringify(props.nfts)}HI</div>*/}
                    <div className={styles.group}>
                      {/*<div>{JSON.stringify(location.state.ownedNFTs)}</div>*/}
                      <div className={styles.item}>
                        {activeIndex === 0 && [
                            <Items class={styles.items} nfts={otherNFTs} isListing={false} account={location.state.account} userInfo = {props.userInfo}/>
                        ]}
                        {activeIndex === 1 && [
                          <Items class={styles.items} packs={otherPacks} isListing={false} account={props.account} userInfo = {props.userInfo}/>
                        ]}
                        {activeIndex === 2 && [
                          <Items class={styles.items} nfts={ownedListings} isListing={true} account={props.account} userInfo = {props.userInfo}/>
                        ]}
                        {activeIndex === 3 && [
                          // <div>HIHIHI{"USRS: " + JSON.stringify(props.users)}</div>,
                          <Items class={styles.items} users={props.users} offers={offers} curProfilePhoto = {props.userInfo.profilePhotoURL} userInfo = {props.userInfo}/>
                        ]}
                        {activeIndex === 4 && (
                            <Items class={styles.items} items={[]} userInfo = {props.userInfo}/>
                        )}
                        {activeIndex === 5 && (
                            <Followers className={styles.followers} items={followingInfo}/>
                        )}
                        {activeIndex === 6 && (
                            <Followers className={styles.followers} items={followersInfo} userInfo = {props.userInfo} followed = {followed}/>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
      }
    }
    else {
      return "EMPTY"; //JSON.stringify(location);
    }
  }

};

export default Profile;
