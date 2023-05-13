import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const GITHUB_PROFILE_PIC =
    "https://avatars.githubusercontent.com/u/110885026?v=4";

  const openTwitter = () => {
    window.open("https://twitter.com/garadiya0", "_target");
  };

  const openInsta = () => {
    window.open("https://www.instagram.com/codexhimanshu/", "_target");
  };

  return (
    <>
      <Head>
        <title>LINKFY</title>
        <meta
          name="description"
          content="Linkfy allows you to create shortened URLs for clean sharing"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/link.svg" />
      </Head>

      {/* NAVIGATION BAR */}
      <Navbar />

      <herosection className={styles.Herosection}>
        <div className={styles.LeftsideSection}>
          <div className={styles.Heading}>LINKFY</div>
          <div className={styles.Desc}>
            Shorten your URLs for Clean and Easy Sharing 😎
          </div>
        </div>
        <div className={styles.RightsideSection}>
          <Image
            src="/hero-img.png"
            alt="bored uncle with a laptop"
            width={350}
            height={350}
          />
        </div>
      </herosection>

      <introsection className={styles.Introsection}>
        <div className={styles.LeftsideSection}>
          <div className={styles.img_1}>
            <span>Without Linkfy 😞❌</span>
            <img
              src="/chat_without.png"
              width={230}
              height={400}
              alt="chat between a boss & empolye"
            />
          </div>
          <div className={styles.img_2}>
            <span>With Linkfy 😊✅</span>
            <img
              src="/chat_with.png"
              width={230}
              height={400}
              alt="chat between a boss & empolye"
            />
          </div>
        </div>
        <div className={styles.RightsideSection}>
          <div className={styles.Text}>
            <span>Long, messy URLs tiring to read and remember?</span>
            <span>Shorten with Linkfy!</span>
          </div>
          <div className={styles.Button}>
            <Link href="/app" className={`${styles.TryNowBtn} shineEff`}>
              <span>TRY NOW</span>
            </Link>
          </div>
        </div>
      </introsection>

      <working className={styles.Working}>
        <ul className={styles.BenefitList}>
          <h2>WHY LINKFY?</h2>
          <li>👉 Shorten any URL with just a click</li>
          <li>👉 Clean, Easy and Fast experience</li>
          <li>👉 Improve SEO by using clean and concise links</li>
        </ul>
        <img
          src="/linkfy-video.gif"
          alt="working video"
          height="350"
          width="auto"
        />
      </working>

      <developer className={styles.Developer}>
        <h2 className={styles.DevTxt}>FOLLOW YOUR DEV!</h2>
        <div className={styles.ImgBox}>
          <img src={'/profile-pic.png'} width={250} height={250} alt="" />
        </div>
        <div className={styles.SelfPromo}>
          17 y/o — Self Taught Web Developer and Designer 👨‍💻
        </div>
        <div className={styles.Button}>
          <div
            className={styles.TwitterBtn}
            name="TwitterBtn"
            onClick={openTwitter}
          >
            <span>Follow me on twitter! </span>
            <img src="/twitter-icon.svg" alt="twitter-icon" height={35} />
          </div>
          <div className={styles.InstaBtn} name="InstaBtn" onClick={openInsta}>
            <span>Follow me on insta! </span>
            <img src="/instagram-icon.svg" alt="insta-icon" height={35} />
          </div>
        </div>
      </developer>
    </>
  );
}
