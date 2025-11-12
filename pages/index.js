import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar.jsx";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

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
          <div className={styles.Heading}>
            Shorten Links.<br></br> Simplify Sharing.
          </div>
          <div className={styles.Desc}>
            Create short URLs, generate QR codes, and track basic analytics —
            all in a clean, seamless interface powered by Next.js and Firebase.
          </div>
        </div>
        <div className={styles.RightsideSection}>
          <Image
            src="/hero-img.webp"
            priority
            alt="bored uncle with a laptop"
            width={420}
            height={420}
          />
        </div>
      </herosection>

      <introsection className={styles.Introsection}>
        <div className={styles.LeftsideSection}>
          <div className={styles.img_1}>
            <span>Without Linkfy 😞❌</span>
            <img
              src="/chat_without.webp"
              width={230}
              height={400}
              alt="chat between a boss & empolye"
            />
          </div>
          <div className={styles.img_2}>
            <span>With Linkfy 😊✅</span>
            <img
              src="/chat_with.webp"
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
              <span>TRY NOW! ⚡</span>
            </Link>
          </div>
        </div>
      </introsection>

      <working className={styles.Working}>
        <ul className={styles.BenefitList}>
          <h2>why linkfy?</h2>
          <li>👉 &nbsp;&nbsp;Clean, Easy and Fast experience</li>
          <li>👉 &nbsp;&nbsp;Improve SEO by using clean and concise links</li>
          <li>👉 &nbsp;&nbsp;Built in QR Code for the URLs</li>
        </ul>
        <img
          src="/linkfy-video.gif"
          alt="working video"
          height="350"
          width="623.96"
        />
      </working>

      <developer className={styles.Developer}>
        <h2 className={styles.DevTxt}>
          Built By Himanshu Pal <br></br> (Final Year BCA Student)
        </h2>
        <div className={styles.ImgBox}>
          <img
            src={"/profile-pic.jpeg"}
            width={250}
            height={250}
            alt="developer's picture"
          />
        </div>
        <div className={styles.SelfPromo}>
          Grateful to MIT World Peace University <br/> and Prof. Abhijeet Kokare for guiding and
          supporting my Linkfy project.
        </div>
        <div className={styles.Button}>
          <Link className={styles.gmailBtn} name="" href={"emailto:himanshu.pal@mitwpu.edu.in"}>
            <span>write me an email</span>
            <img
              src="/email.png"
              alt="insta-icon"
              height={35}
              width={35}
            />
          </Link>
        </div>
      </developer>
    </>
  );
}
