import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./ProfileEdit.module.sass";
import Control from "../../components/Control";
import TextInput from "../../components/TextInput";
import TextArea from "../../components/TextArea";
import Icon from "../../components/Icon";
import ImageUpload from "../../ImageUpload";
import S3FileUpload from "react-s3";
import config from "../../config";
import {HandleAddUserSimple, HandleUpdateUser, FetchUser} from "../../apis/UserAPI";
import {set, update} from "immutable";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Edit Profile",
  },
];

//todo: pass setUser to here
// put all user setting/getting in app.js

const ProfileEdit = (props) => {

  //create consts for all user fields, then set them to the json in one function
  //TODO: Useeffect for when userInfo changes, sends to blockchain
  const [displayName, setDisplayName] = useState(props.userInfo.displayName);
  const [bio, setBio] = useState(props.userInfo.bio);
  const [website, setWebsite] = useState(props.userInfo.website);
  const [twitter, setTwitter] = useState(props.userInfo.twitter);
  // const [coverPhotoURL, setCoverPhotoURL] = useState("");
  const [profilePhotoURL, setProfilePhotoURL] = useState(props.userInfo.profilePhotoURL);
  const [refetch, setRefetch] = useState(false);
  const [files, setFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  // const [following, setFollowing] = useState([]);
  // const [followers, setFollowers] = useState([]);
  // const [likes, setLikes] = useState([]);
  //TODO: IF USER DOESNT UPLOAD IMAGE, IT FUCKS UP, FIX THIS
  // USER INFO IS ALSO NOT SETTING

  const s3Upload = async (files) => {

      let file = files[0];
      let blob = file.slice(0, file.size, 'image/png');
      let newFile = new File([blob], props.account + '.png', {type: 'image/png'});
      // if (JSON.stringify(props.userInfo) == "{}") {
      //   await HandleAddUserSimple(props.setUserInfo, props.account);
      // }
      let data = await S3FileUpload.uploadFile(newFile, config.s3);
      setProfilePhotoURL(data.location);
      return data.location;

    }



  const addCardToS3PlusDB = async () => {
    if (files.length != 0) {
      //alert("there is a file here!!");
      await s3Upload(files).then(async(res) => {
        setProfilePhotoURL(res);
        await updateUser(profilePhotoURL);
      });
      // await s3Upload(files).then(async () => {
      //   await updateUser();
      // });
    }
    else {
      await updateUser(props.userInfo.profilePhotoURL);
    }
  };

  const updateUser = async (profilePhotoURL) => {
      let res = await HandleUpdateUser(props.setUserInfo, props.account, displayName, bio, website, twitter, profilePhotoURL,
          props.userInfo.coverPhotoURL, props.userInfo.following, props.userInfo.followers, props.userInfo.likes);

      if (res) {
        if (res.status === 204) {
          setSuccessMessage(true);
        }
      }
      //alert("Success!:" + JSON.stringify(res));

  }


  const successfulMessage1 = () => {
    if (successMessage) {
      return "Profile Updated Successfully!";
    }
    else {
      return "Update Profile";
    }
  };

  const successfulMessage = () => {
    if (successMessage) {
      return <div className={styles.btns}>
        <button className={cn("button", styles.button)} onClick={(e) => {addCardToS3PlusDB(e)}}>
          Profile Updated Successfully!
        </button>
        <Icon name="check" size="18" fill={"#BF9A36"} />
      </div>
    }
    else {
      return <div className={styles.btns}>
        <button className={cn("button", styles.button)} onClick={(e) => {addCardToS3PlusDB(e)}}>
          Update Profile
        </button>
        <Link className={cn("button-stroke", styles.button)} to="/">Cancel</Link>
        {/*<button className={cn("button-stroke", styles.button)}>Cancel</button>*/}
      </div>
    }
  };



  useEffect(async () => {

    if (props.userInfo) {
      setDisplayName(props.userInfo.displayName);
      setBio(props.userInfo.bio);
      setWebsite(props.userInfo.website);
      setProfilePhotoURL(props.userInfo.profilePhotoURL);
      setTwitter(props.userInfo.twitter);
    }

    // await updateUser();
    // if (props.setUserInfo !== "{}") {
    //     alert("userinfo from fetch: "+ JSON.stringify(props.userInfo));
    //   });
    // }

    // alert(JSON.stringify(props.userInfo));

    // alert(JSON.stringify(userInfo.displayName));

  }, [props.userInfo]);




  return (
    <div className={styles.page}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.top}>
            <h1 className={cn("h2", styles.title)}>Edit profile</h1>
            {/*{JSON.stringify(props.userInfo)}*/}
            <div className={styles.info}>
              You can set preferred display name, create{" "}
              <strong>your profile URL</strong> and manage other personal
              settings.
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.user}>
                <div className={styles.avatar}>
                  <img src={props.userInfo.profilePhotoURL + "?" + new Date().getTime()} alt="Avatar" />
                </div>
                <div className={styles.details}>
                  <div className={styles.stage}>Profile photo</div>
                  <div className={styles.text}>
                    We recommend an image of at least 400x400.{" "}
                    {}
                    <span role="img" aria-label="hooray">
                      🙌
                    </span>
                  </div>
                  <div className={styles.file}>
                    {/*<button*/}
                    {/*  className={cn(*/}
                    {/*    "button-stroke button-small",*/}
                    {/*    styles.button*/}
                    {/*  )}*/}
                    {/*>*/}
                    {/*  Upload*/}
                    {/*</button>*/}
                    <button
                        className={cn(
                            "button-stroke button-small",
                            styles.button
                        )}
                    >
                      Upload

                    </button>


                    <input className={styles.load} type="file" onChange = { (e) => {setFiles(e.target.files);}}/>
                    {(files.length != 0) ? files[0].name:  ""}

                    {/*{JSON.stringify(files)}*/}
                    {/*<ImageUpload fileName = {props.account + 'png'} files = {files} setFiles = {setFiles} />*/}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>Account info</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="display name"
                      name="Name"
                      type="text"
                      onChange = {e => setDisplayName(e.target.value)}
                      placeholder={(props.userInfo.displayName === "") ? "Enter your desired display name" : props.userInfo.displayName}
                      required
                    />
                    <TextArea
                      className={styles.field}
                      label="Bio"
                      name="Bio"
                      placeholder={(props.userInfo.bio !== "") ? props.userInfo.bio: "About yourself in a few words"}
                      onChange = {e => setBio(e.target.value)}
                      required="required"
                    />
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Social</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="portfolio or website"
                      name="Portfolio"
                      type="text"
                      onChange={e => setWebsite(e.target.value)}
                      placeholder={(props.userInfo.website !== "") ? props.userInfo.website: "Enter URL"}
                      required
                    />
                    <div className={styles.box}>
                      <TextInput
                        className={styles.field}
                        label="twitter"
                        name="Twitter"
                        type="text"
                        onChange = {e => setTwitter(e.target.value)}
                        placeholder="@twitter username"
                        required
                      />
                      <button
                        className={cn(
                          "button-stroke button-small",
                          styles.button
                        )}
                      >
                        Verify account
                      </button>
                    </div>
                  </div>
                  <button
                    className={cn("button-stroke button-small", styles.button)}
                  >
                    <Icon name="plus-circle" size="16" />
                    <span>Add more social account</span>
                  </button>
                </div>
              </div>
              <div className={styles.note}>
                To update your settings you should sign message through your
                wallet. Click 'Update profile' then sign the message
              </div>
              {successfulMessage()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
