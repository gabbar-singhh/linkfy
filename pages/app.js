import React, { useContext, useState } from "react";
import { db } from "@/firebase";
import { collection, doc, setDoc} from "firebase/firestore/lite";
import generateCode from "@/utility/generateCode";
import { v4 as uuidv4 } from "uuid";
import UserContext from "@/context/UserContext";

const app = () => {
  const [url, setUrl] = useState("");
  const context = useContext(UserContext)

  const submitformhandler = async (e) => {
    e.preventDefault();
    const docsRandom = uuidv4();

    // await 
    console.log(context);
    await setDoc(doc(db, context.email, docsRandom), {
      originalURL: url,
      code: generateCode(),
      // email: context.email,
      // displayName: context.displayName
    });

    console.log('🧧',context);
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
