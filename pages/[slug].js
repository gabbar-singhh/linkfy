import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRouter } from "next/router";
import { db } from "@/firebase";
import { onSnapshot, getDocs, collection, doc } from "firebase/firestore/lite";

// import { collection } from "firebase/firestore/lite";

const slug = () => {
  const colRef = collection(db, "links");

  const [data, setData] = useState([]);
  const router = useRouter();
  const {par} = useParams()

  useEffect(() => {
    const code = router.query.slug;
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "links"));
      const dataArray = [];
      querySnapshot.forEach((doc) => {
        // console.log('🍌', slug)
        // console.log('🍎🍎', par);
        dataArray.push({ code: doc.code, originalURL: doc.originalURL });

        const CODE_VAL = doc.data().code;
        const FULL_URL = doc.data().originalURL;

        if (!slug == CODE_VAL) {
          console.log("Not Found⛔");
        } else {
          console.log("Redirecting Soon✅", par);
        }
      });
      setData(dataArray);
    };
    fetchData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.code}>
          {item.originalURL}
          {""}
        </div>
      ))}
    </div>
  );
};

export default slug;
