import React, { useEffect, useState } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../Header";
import Footer from "../Footer";
import {tokenURI, ownerOfNoReq} from "../../smartContracts/ViridianNFTMethods";
import {tokenPackURI, ownerOfPackNoReq} from "../../smartContracts/ViridianPackMethods";
import ReactLoading from 'react-loading';
import Image from "../Image";

const Page = ({ users, ownedNFTs, ownedPacks, nfts, filteredNfts, setFilteredNFTs, children, account, setAccount, connected, setConnected, userInfo, setUserInfo, ethBalance, setEthBalance, vextBalance, setVextBalance }) => {
    const [initialLoaded, setInitialLoaded] = useState(false);

  const { pathname } = useLocation();
  const location = useLocation();
  const history = useHistory();

  useEffect(async () => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();

    //alert("PAGE: " + pathname);

      // if (!initialLoaded) {
      //     setInitialLoaded(true);
      //     history.replace(pathname, { state: "penis"});
      // }

      if (!location.state && account) {

          let savedPath = pathname;

          //alert(savedPath.includes("profile"));

          //alert(savedPath.split("/"))
          if (savedPath.includes("profile")) {
              //history.replace("/");

              //savedPath = pathname;
              //setInitialLoaded(true);


              //alert(savedPath.split("/")[2]);

              if (savedPath.split("/")[2] === account) {
                  history.replace(savedPath, {account: savedPath.split("/")[2]});
                  //alert("ACT: " + account);
                  //setInitialLoaded(true);
              } else {
                  //alert("ACT2: " + account);
                  users.map((x) => {
                      if (savedPath.split("/")[2] === x.username) {
                          setInitialLoaded(true);
                          history.replace(savedPath, {
                              nfts: nfts,
                              userInfo: JSON.stringify(userInfo),
                              //setUserInfo: props.setUserInfo,
                              ownedNFTs: ownedNFTs,
                              ownedPacks: ownedPacks,
                              //setOwnedNFTs: props.setOwnedNFTs,
                              users: users,
                              curAccount: savedPath.split("/")[2],
                              coverPhotoURL: x.coverPhotoURL, twitter: x.twitter,
                              profilePhotoURL: x.profilePhotoURL, bio: x.bio, username: x.username, website: x.website, account: savedPath.split("/")[2], displayName: x.displayName,
                              following: x.following, followers: x.followers, likes: x.likes
                          });

                          setInitialLoaded(true);
                      }
                  });

                  setInitialLoaded(true);
              }
          } else if (savedPath.includes("item")) {
              //TODO: Switch this to getting the item info here and then passing it in through the location state, probably also split up the url for packs and cards
              // nfts.map((item) => {
              //     alert(JSON.stringify(savedPath.split("/")[2]) === JSON.stringify(item.id))
              //     if (JSON.stringify(savedPath.split("/")[2]) === JSON.stringify(item.id)) {
              //         history.replace(savedPath, {
              //             //TODO: Pass in profile
              //             //curProfilePhoto: curProfilePhoto,
              //             isVNFT: item.isVNFT,
              //             listingId: item.listingId,
              //             price: item.price,
              //             uri: item.uri,
              //             id: item.id,
              //             nftOwner: item.owner,
              //             account: account,
              //             isListing: true,
              //             isPack: !item.isVNFT
              //         });
              //     }
              // });

              //alert(JSON.stringify(savedPath.split("/")))

              if (savedPath.split("/")[2] === "pack") {
                  let tokenId = Number.parseInt(savedPath.split("/")[3]);

                  //alert("onwer of pack");

                  let packURI = await tokenPackURI(tokenId);
                  let packOwner = await ownerOfPackNoReq(tokenId);

                  await fetch(packURI, {
                      mode: "cors",
                      method: "GET"
                  }).then(async res => {
                      if (res.ok) {
                          //alert("Owner OF: " + owner);
                          const resJson = await res.json();
                          //console.log(JSON.stringify(resJson));
                          //alert(JSON.stringify(resJson));
                          let item = {id: tokenId, uri: resJson, owner: packOwner};

                          //alert(JSON.stringify(savedPath.split("/")[2]))

                          setInitialLoaded(true);

                          history.replace(savedPath,
                              {
                                  //curProfilePhoto: curProfilePhoto,
                                  listingId: item.listingId,
                                  isVNFT: false,
                                  //price: item.price,
                                  uri: item.uri,
                                  id: item.id,
                                  nftOwner: item.owner,
                                  account: account,
                                  isListing: false,
                                  isPack: true
                              }
                          );

                          setInitialLoaded(true);
                      }
                      setInitialLoaded(true);
                  });
              } else if (savedPath.split("/")[2] === "vnft") {
                  let tokenId = Number.parseInt(savedPath.split("/")[3]);
                  let packURI = await tokenURI(tokenId);

                  //alert("onwer of nft");

                  let packOwner = await ownerOfNoReq(tokenId);

                  //alert("VNFT")

                  await fetch(packURI, {
                      mode: "cors",
                      method: "GET"
                  }).then(async res => {
                      //alert(JSON.stringify(res))
                      if (res.ok) {
                          //alert("Owner OF: " + owner);
                          const resJson = await res.json();
                          //console.log(JSON.stringify(resJson));
                          //alert(JSON.stringify(resJson));
                          let item = {id: tokenId, uri: resJson, owner: packOwner};

                          //alert(JSON.stringify(resJson))

                          setInitialLoaded(true);

                          history.replace(savedPath,
                              {
                                  //curProfilePhoto: curProfilePhoto,
                                  listingId: item.listingId,
                                  isVNFT: true,
                                  //price: item.price,
                                  uri: item.uri,
                                  id: item.id,
                                  nftOwner: item.owner,
                                  account: account,
                                  isListing: false,
                                  isPack: false
                              }
                          );

                          setInitialLoaded(true);
                      }
                      setInitialLoaded(true);
                  });
              }
          }
      }
      else if(!pathname.includes("item")) {
          setInitialLoaded(true);
      }
      //TODO: Do more work with handling loading

      //alert(JSON.stringify(location.state))

      // if (!initialLoaded) {
      //     //history.push("/");
      //     history.push(pathname);
      //     setInitialLoaded(true);
      // }

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

  }, [account, nfts]);

  //if (initialLoaded) {
      return (
          <div className={styles.page}>
              {/*{account}*/}
              {/*{JSON.stringify(location.state)}*/}
              {/*{JSON.stringify(nfts)}*/}
              {/*{JSON.stringify(initialLoaded)}*/}
              <Header users={users} nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs}
                      vextBalance={vextBalance} setVextBalance={setVextBalance} ethBalance={ethBalance} setEthBalance={setEthBalance} account={account}
                      setAccount={setAccount} connected={connected} setConnected={setConnected} userInfo={userInfo}
                      setUserInfo={setUserInfo}/>
              <div className={styles.inner}>{children}</div>
              <Footer/>
          </div>
      );
  //}
  // else {
  //     return (
  //         <div className={styles.page}>
  //             {account}
  //             {JSON.stringify(location.state)}
  //             {/*{JSON.stringify(nfts)}*/}
  //             {JSON.stringify(initialLoaded)}
  //             <Header nfts={nfts} filteredNfts={filteredNfts} setFilteredNFTs={setFilteredNFTs}
  //                     vextBalance={vextBalance} setVextBalance={setVextBalance} account={account}
  //                     setAccount={setAccount} connected={connected} setConnected={setConnected} userInfo={userInfo}
  //                     setUserInfo={setUserInfo}/>
  //             <div style={{display: 'flex',
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //                 position: 'relative',
  //                 marginTop: '20ex', marginBottom: '20ex'}}>
  //                 <ReactLoading type={'spin'} color={'#bf9a36'} height={'10%'} width={'10%'} />
  //             </div>
  //             <div style={{display: 'flex',
  //                 justifyContent: 'center',
  //                 position: 'absolute',
  //                 alignItems: 'center',
  //                 top: '26.3%',
  //                 left: '40.656%', transform: 'scale(.36, .36)'}}>
  //                 <Image
  //                     style={{maxWidth: '1ex', maxHeight: '1ex'}}
  //                     src="/logo.svg"
  //                     srcDark="/logo.svg"
  //                     alt="Viridian Exchange"
  //                 />
  //             </div>
  //             <Footer/>
  //         </div>
  //     )
  // }
};

export default withRouter(Page);
