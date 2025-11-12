import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore/lite";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Slug.module.css";
import Navbar from "@/components/Navbar.jsx";
import { Loading } from "@nextui-org/react";

const slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [showErrorPage, setShowErrorPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "accumulated-data"));

      querySnapshot.forEach((doc) => {
        if (doc.id == slug) {
          console.log("Redirecting Soon✅", doc.data().originalURL);
          window.location.replace(doc.data().originalURL);
          setShowErrorPage(false);
        } else {
          setShowErrorPage(true);
        }
      });
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  return showErrorPage ? (
    <>
      <Head>
        <title>OOPS! </title>
      </Head>
      <Navbar />
      <section className={styles.Main}>
        <Image
          src={"/error-img.webp"}
          height={350}
          width={350}
          alt="robot performing yogo"
          priority
        />
        <div className={styles.Txt}>
          <p>Oops!</p>
          <p>Page Not Found</p>
        </div>
      </section>
    </>
  ) : (
    <>
      <section className={styles.Main}>
        <Loading type="default" size="xl" color="error" textColor="error">
          Please Wait...
        </Loading>
      </section>
    </>
  );
};

export default slug;
