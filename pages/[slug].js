import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "@/firebase";
import {
  onSnapshot,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";

const slug = () => {
  const router = useRouter();
  const { SLUG } = router.query;

  useEffect(() => {
    const colRef = collection(db, "links");

    // const q = query(colRef, where("code", "==", SLUG))

    onSnapshot(colRef, (snapshot) => {
      snapshot.docs;
    });
  }, []);

  return <div>{}</div>;
};

export default slug;
