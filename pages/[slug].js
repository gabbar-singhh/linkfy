import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore/lite";

const slug = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "all-urls-list"));

        const dataArray = [];
        querySnapshot.forEach((doc) => {
          const CODE_VAL = doc.data().code;
          const FULL_URL = doc.data().url;

          if (slug === CODE_VAL) {
            console.log("Redirecting Soon✅", slug);
            dataArray.push({ code: CODE_VAL, originalURL: FULL_URL });
            window.location.replace(FULL_URL);
          }
        });
        setData(dataArray);
      } catch {
        const querySnapshot = await getDocs(collection(db, "accumulated-data"));
        const dataArray = [];
        querySnapshot.forEach((doc) => {
          const CODE_VAL = doc.data().code;
          const FULL_URL = doc.data().originalURL;

          if (slug === CODE_VAL) {
            console.log("Redirecting Soon✅", slug);
            dataArray.push({ code: CODE_VAL, originalURL: FULL_URL });
            window.location.replace(FULL_URL);
          }
        });
        setData(dataArray);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  return <div>{}</div>;
};

export default slug;
