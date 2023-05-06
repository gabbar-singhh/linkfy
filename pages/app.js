import React, { useState } from "react";
import { db } from "@/firebase";
import { doc, setDoc} from "firebase/firestore/lite";
import generateCode from "@/utility/generateCode";
import { v4 as uuidv4 } from "uuid";

const app = () => {
  const [url, setUrl] = useState("");

  const submitformhandler = async (e) => {
    e.preventDefault();
    const docsRandom = uuidv4();

    await setDoc(doc(db, "links", docsRandom), {
      originalURL: url,
      code: generateCode(),
    });

    alert("This is your url - https://localhost:3000/");
  };

  return (
    <section>
      <form action="" onSubmit={submitformhandler}>
        <input type="text" onChange={(e) => setUrl(e.target.value)} />
        <button type="submit">get link</button>
      </form>
    </section>
  );
};

export default app;
