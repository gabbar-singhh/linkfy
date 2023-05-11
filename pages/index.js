import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";

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
          <Image
            src="/link-cut.jpg"
            width={200}
            height={200}
            alt="link is shortening by a scissor"
          />
        </div>
        <div className={styles.RightsideSection}>
          Are you tired of sharing long, messy URLs that are difficult to read
          and remember? Say hello to Linkfy - the app that lets you shorten your
          URLs for clean and easy sharing.
        </div>
      </introsection>
    </>
  );
}
