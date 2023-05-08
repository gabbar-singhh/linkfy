import React, { useState } from "react";
import styles from "@/styles/App.module.css";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore/lite";
import generateCode from "@/utility/generateCode";
import { v4 as uuidv4 } from "uuid";
import { Tooltip, Loading } from "@nextui-org/react";
import Image from "next/image";
import dateFormat from "dateformat";
import Table from "@/components/Table/Table";

const app = () => {
  const [url, setUrl] = useState("");
  const [linkTxtCode, setLinkTxtCode] = useState("XXXXX");
  const [getLinkTooltipBtn, setGetLinkTooltipBtn] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [clipboardVal, setClipboardVal] = useState("Copy to Clipboard");

  // WHEN USER WILL CLIKC ON SEARCH-BTN
  const submitformhandler = async (e) => {
    const docsRandom = uuidv4();
    const now = new Date();

    const userData = JSON.parse(localStorage.getItem("user"));
    const CODE = generateCode();

    setShowLoading(true);
    await setDoc(doc(db, userData.email, docsRandom), {
      originalURL: url,
      code: CODE,
      date: dateFormat(now, "yyyy-mm-dd"),
    });

    setLinkTxtCode(CODE);
    setUrl("");
    setShowLoading(false);
  };

  // CLICK-TO-COPY
  const copyToClipboardBtnHandler = () => {
    navigator.clipboard.writeText(`localhost:3000/${linkTxtCode}`);
  };

  return (
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
          linkfy.web.app/ <cb>{linkTxtCode}</cb>
        </span>

        <span
          className={`shine-effect ${styles.CopyBtn}`}
          onClick={copyToClipboardBtnHandler}
        >
          <Tooltip
            content={clipboardVal}
            onClick={() => setClipboardVal("Link Copied!")}
          >
            <Image src="/copy-icon.png" alt="copy-img" width={35} height={35} />
          </Tooltip>
        </span>
      </div>

      <section className={styles.TableSection}>
        <Table />
      </section>
    </section>
  );
};

export default app;
