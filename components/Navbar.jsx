import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";
import { Avatar, User } from "@nextui-org/react";

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
          <Avatar
            onClick={signBtnHandler}
            size="lg"
            src={userData.photoURL}
            style={{ cursor: "pointer" }}
            name={userData.displayName}
            color="error"
            bordered
            zoomed
          />
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
