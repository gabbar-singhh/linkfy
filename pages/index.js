import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";

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
      <Navbar />
      <main className={`${styles.main}`}></main>
    </>
  );
}
