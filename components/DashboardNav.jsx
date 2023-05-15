import React, { useState, useEffect } from "react";
import styles from "./DashboardNav.module.css";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { Dropdown, Text, Avatar } from "@nextui-org/react";

const DashboardNav = () => {
  const [userData, setUserData] = useState({
    credential: "",
    token: "",
    displayName: "",
    email: "",
    photoURL: "",
    isLoggedIn: false,
  });

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
          isLoggedIn: true,
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            credential: credential,
            token: token,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            isLoggedIn: true,
          })
        );
        window.location.reload();
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

  const menuBtnHandler = (keyVal) => {
    if (keyVal === "logout") {
      signOut(auth)
        .then(() => {
          setUserData({
            credential: "",
            token: "",
            displayName: "",
            email: "",
            photoURL: "",
            isLoggedIn: false,
          });
          localStorage.removeItem("user");
          console.log("signed out succesfully");
          window.location.reload();
        })
        .catch((error) => {
          // An error happened.
        });
    } else if (keyVal === "home") {
      window.location.replace("https://linkfy.vercel.app/");
    }
  };

  useEffect(() => {
    const prevSignInDetails = JSON.parse(localStorage.getItem("user"));
    if (prevSignInDetails) {
      setUserData(prevSignInDetails);
    }
  }, []);

  return (
    <section className={styles.HeaderSection}>
      <div className={styles.LeftSideSection}>
        <span className={styles.LogoTxt}>
          {`👋 hello ${userData.displayName}`}
        </span>
      </div>

      <div className={styles.RightSideSection}>
        {userData.isLoggedIn ? (
          <Dropdown>
            <Dropdown.Trigger className={styles.wrapper}>
              <Avatar
                className={styles.Avatar}
                src={userData.photoURL}
                color={"error"}
                squared
                bordered
              />
            </Dropdown.Trigger>
            <Dropdown.Menu
              color="primary"
              aria-label="User Actions"
              onAction={menuBtnHandler}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {userData.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item textValue="" key="home">
                Home
              </Dropdown.Item>
              <Dropdown.Item textValue="" key="logout" color="error">
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

export default DashboardNav;
