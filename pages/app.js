import React, { useEffect, useState } from "react";
import styles from "@/styles/App.module.css";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore/lite";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import generateCode from "@/utility/generateCode";
import { v4 as uuidv4 } from "uuid";
import { Tooltip, Loading } from "@nextui-org/react";
import Image from "next/image";
import Table from "@/components/Table/Table";
import dateFormat from "dateformat";
import DashboardNav from "@/components/DashboardNav";

const app = () => {
  const [url, setUrl] = useState("");
  const [linkTxtCode, setLinkTxtCode] = useState("XXXXX");
  const [getLinkTooltipBtn, setGetLinkTooltipBtn] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [clipboardVal, setClipboardVal] = useState("Copy to Clipboard");

  // WHEN USER WILL CLIKC ON SEARCH-BTN
  const submitformhandler = async (e) => {
    const timestamp = new Date();
    const docsRandom = uuidv4();

    const userData = JSON.parse(localStorage.getItem("user"));
    const CODE = generateCode();

    const dbm = getFirestore();

    setShowLoading(true);

    try {
      const collectionRef = collection(dbm, `${userData.email}`);
      const accColRef = collection(dbm, "accumulated-data");
      onSnapshot(accColRef, (snapshot) => {
        setDoc(doc(db, userData.email, docsRandom), {
          id: snapshot.size,
          originalURL: url,
          code: CODE,
          date: dateFormat(timestamp, "isoDateTime"),
        });
      });
      onSnapshot(accColRef, (snapshot) => {
        setDoc(doc(db, "accumulated-data", CODE), {
          originalURL: url,
          code: CODE,
        });
      });
    } catch {
      const collectionRef = collection(dbm, "accumulated-data");
      onSnapshot(collectionRef, (snapshot) => {
        setDoc(doc(db, "accumulated-data", CODE), {
          originalURL: url,
          code: CODE,
        });
      });
    }

    setLinkTxtCode(CODE);
    setUrl("");
    setShowLoading(false);
  };

  // CLICK-TO-COPY
  const copyToClipboardBtnHandler = () => {
    navigator.clipboard.writeText(`localhost:3000/${linkTxtCode}`);
  };

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("users"));
    } catch {}
  }, []);

  return (
    <>
      <DashboardNav />
      <section className={styles.Main}>
        <form action="" onSubmit={submitformhandler} className={styles.Form}>
          <input
            type="url"
            placeholder="Enter url to shortened"
            className={styles.InputUrl}
            onChange={(e) => {
              setGetLinkTooltipBtn("");
              setUrl(e.target.value);
            }}
            value={url}
          />
          <Tooltip content={getLinkTooltipBtn}>
            <div
              onClick={() => {
                url
                  ? submitformhandler()
                  : setGetLinkTooltipBtn("URL not provided!");
              }}
              className={styles.GetLinkBtn}
            >
              {showLoading ? (
                <Loading className={styles.Loading} size="lg" color={"white"} />
              ) : (
                "Get Link"
              )}
            </div>
          </Tooltip>
        </form>

        <div className={styles.ShotenedLink}>
          <span className={styles.LinkTxt}>
            linkfy.web.app/ <span>{linkTxtCode}</span>
          </span>

          <span
            className={`shine-effect ${styles.CopyBtn}`}
            onClick={copyToClipboardBtnHandler}
          >
            <Tooltip
              content={clipboardVal}
              onClick={() => setClipboardVal("Link Copied!")}
            >
              <Image
                src="/copy-icon.png"
                alt="copy-img"
                width={35}
                height={35}
              />
            </Tooltip>
          </span>
        </div>
      </section>

      <section className={styles.TableSection}>
        <Table />
      </section>
    </>
  );
};

export default app;
