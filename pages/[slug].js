import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore/lite";

const slug = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "accumulated-data"));

      querySnapshot.forEach((doc) => {
        console.log("🎃", doc.data().originalURL);

        if (doc.id == slug) {
          console.log("Redirecting Soon✅", slug);
          window.location.replace(doc.data().originalURL);
        }
      });
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  return <div>{}</div>;
};

export default slug;
