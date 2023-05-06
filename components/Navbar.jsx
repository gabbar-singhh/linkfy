import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";
import {
  Avatar,
  User,
  Dropdown,
  Text,
  createTheme,
  Tooltip,
} from "@nextui-org/react";

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: "$green200",
      primaryLightHover: "$green300",
      primaryLightActive: "$green400",
      primaryLightContrast: "$green600",
      primary: "#4ADE7B",
      orange: "#ff8b37",
      skyblue: "#7ebdff",
      primaryBorder: "$green500",
      primaryBorderHover: "$green600",
      primarySolidHover: "$green700",
      primarySolidContrast: "$white",
      primaryShadow: "$green500",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",

      // you can also create your own color
      myColor: "#ff4ecd",

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

const Navbar = () => {
  const GITHUB_REPO_LINK = "https://github.com/dev-himanshu-01/linkify";

  const [userData, setUserData] = useState({
    credential: "",
    token: "",
    displayName: "",
    email: "",
    photoURL: "",
  });

  const [loginStatus, setLoginStatus] = useState(false);

  const signBtnHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("done :? you are signed in :D", result);

        console.log("👉 credential", credential);
        console.log("👉 token", token);
        console.log("👉 displayName", user.displayName);
        console.log("👉 email", user.email);
        console.log("👉 pic-url", user.photoURL);

        // user details be saved
        setUserData({
          credential: credential,
          token: token,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

        setLoginStatus(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // The email of the user's account used.
        const email = error.customData.email;

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <section className={styles.HeaderSection}>
      <div className={styles.LeftSideSection}>
        <img
          className={styles.Logo}
          src={"/link.png"}
          width={30}
          height={30}
          alt="linkify-logo"
        />
        <span className={styles.LogoTxt}>Linkfy</span>
      </div>

      <div className={styles.MiddleSideSection}>
        <ul>
          <li>
            <Link className={`${styles.ItemLi} highlightEff`} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={`${styles.ItemLi} highlightEff`} href="/app">
              Try Now
            </Link>
          </li>
          <li>
            <Link className={`${styles.ItemLi} highlightEff`} href={"/about"}>
              About
            </Link>
          </li>
          <li>
            <Link className={`${styles.ItemLi} highlightEff`} href={"/"}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.RightSideSection}>
        {loginStatus ? (
          <Dropdown>
            <Dropdown.Trigger className={styles.wrapper}>
              <img className={styles.photoURL} src={userData.photoURL} />
            </Dropdown.Trigger>
            <Dropdown.Menu color="primary" aria-label="User Actions">
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {userData.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="user_profile" withDivider>
                Profile
              </Dropdown.Item>
              <Dropdown.Item key="help_and_feedback">
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <div
            className={`${styles.SignInBtn} shineEff`}
            onClick={signBtnHandler}
          >
            Sign In
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;
