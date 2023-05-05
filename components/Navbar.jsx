import React from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { Grid, Button } from "@nextui-org/react";

const Navbar = () => {
  const GITHUB_REPO_LINK = "https://github.com/dev-himanshu-01/linkify";
  const signBtnHandler = () => {};

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
        <div
          className={`${styles.SignInBtn} shineEff`}
          onClick={signBtnHandler}
        >
          Sign In
        </div>
      </div>
    </section>
  );
};

export default Navbar;
