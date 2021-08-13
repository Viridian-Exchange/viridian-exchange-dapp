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
import {HandleAddUserSimple, HandleUpdateUser} from "../../apis/UserAPI";

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
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  // const [coverPhotoURL, setCoverPhotoURL] = useState("");
  const [profilePhotoURL, setProfilePhotoURL] = useState("");

  const [files, setFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  // const [following, setFollowing] = useState([]);
  // const [followers, setFollowers] = useState([]);
  // const [likes, setLikes] = useState([]);
  //TODO: IF USER DOESNT UPLOAD IMAGE, IT FUCKS UP, FIX THIS
  // USER INFO IS ALSO NOT SETTING

  const s3Upload = async (files, e) => {
    let file = files[0];
    let blob = file.slice(0, file.size, 'image/png');
    let newFile = new File([blob], props.account + '.png', {type: 'image/png'});
    if (JSON.stringify(props.userInfo) == "{}") {
      await HandleAddUserSimple(props.setUserInfo, props.account);
    }
    await S3FileUpload.uploadFile(newFile, config.s3)
        .then(async(data) => {setProfilePhotoURL(data.location); alert((data.location));});

  };

  const addCardToS3PlusDB = async (e) => {
    await s3Upload(files, e).then(async () => {
      await updateUser();
    });
  };

  const updateUser = async () => {
    if (profilePhotoURL !== "") {
      await HandleUpdateUser(props.setUserInfo, props.account, displayName, bio, website, twitter, profilePhotoURL,
          props.userInfo.coverPhotoURL, props.userInfo.following, props.userInfo.followers, props.userInfo.likes).then(setSuccessMessage(true));
    }

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
    await updateUser();
    alert(JSON.stringify(props.userInfo));

    // alert(JSON.stringify(userInfo.displayName));

  }, [profilePhotoURL]);




  return (
    <div className={styles.page}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.top}>
            <h1 className={cn("h2", styles.title)}>Edit profile</h1>
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
                  <img src={props.userInfo.profilePhotoURL} alt="Avatar" />
                </div>
                <div className={styles.details}>
                  <div className={styles.stage}>Profile photo</div>
                  <div className={styles.text}>
                    We recommend an image of at least 400x400. Gifs work too{" "}
                    <span role="img" aria-label="hooray">
                      🙌
                    </span>
                  </div>
                  <div className={styles.file}>
                    <button
                      className={cn(
                        "button-stroke button-small",
                        styles.button
                      )}
                    >
                      Upload
                    </button>
                    {JSON.stringify(profilePhotoURL)}
                    <ImageUpload fileName = {props.account + 'png'} files = {files} setFiles = {setFiles} />
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
                      placeholder="Enter your display name"
                      required
                    />
                    <TextArea
                      className={styles.field}
                      label="Bio"
                      name="Bio"
                      placeholder="About yourselt in a few words"
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
                      placeholder="Enter URL"
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
