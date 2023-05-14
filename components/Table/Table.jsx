import styles from "./Table.module.css";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { db } from "@/firebase";
import React, { useState, useEffect } from "react";
import {
  doc,
  onSnapshot,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  deleteDoc,
  QuerySnapshot,
} from "firebase/firestore";
import { Table, Text, Col, Row, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { IconButton } from "./IconButton";

export default function App() {
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState({ user: "NOTSHOW" });
  const [localStorageData, setLocalStorageData] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    setLocalStorageData(userData);
    // const dataArray = [];

    const fetchData = async () => {
      // setData([])
      const dbm = getFirestore();
      const collectionRef = collection(dbm, `${userData.email}`);

      const gettingData = onSnapshot(collectionRef, (snapshot) => {
        snapshot.docs.map((doc) => {
          console.log("🧨🎉", doc.data());
          console.log("🎈🎈", doc.data());
          if (snapshot.size === 0) {
            setShowTable({ user: "NOTSHOW" });
          } else {
            setShowTable({ user: "SHOW" });
            const CODE_VAL = doc.data().code;
            const FULL_URL = doc.data().originalURL;
            const DATE = doc.data().date;
            const ID = doc.data().id;
            setData((prevData) => [...prevData, doc.data()]);
          }
        });
        // setData(doc.data());
        console.log("lolo", data);
      });
    };
    try {
      if (userData.isLoggedIn) {
        fetchData();
      }
    } catch {
      setShowTable({ user: "NOTSHOW" });
    }
  }, []);

  return showTable.user === "SHOW" ? (
    <section className={styles.Main}>
      <h2>👉 Previous Shortened Links</h2>
      <Table
        aria-label="All Shortened URLS with their Full URLS"
        selectionMode="none"
        className={styles.Table}
      >
        <Table.Header>
          <Table.Column className={styles.ColumnHead} key="full_url">
            FULL URL
          </Table.Column>
          <Table.Column className={styles.ColumnHead} key="shortened_url">
            SHORTENED UEL
          </Table.Column>
          <Table.Column className={styles.ColumnHead} key="date">
            TIME
          </Table.Column>
          <Table.Column className={styles.ColumnHead} key="actions">
            ACTION
          </Table.Column>
        </Table.Header>

        <Table.Body
          items={data
            .filter(
              (item, index, self) =>
                index === self.findIndex((t) => t.code === item.code)
            )
            .sort((a, b) => new Date(b.date) - new Date(a.date))}
          className={styles.TableBody}
        >
          {(item) => (
            <Table.Row textValue="" key={item.id}>
              <Table.Cell
                key={item.id}
                css={{ padding: "1em 2.5em" }}
                className={styles.TableCell}
              >
                <textarea
                  readOnly
                  value={item.originalURL}
                  resize="none"
                  rows={1}
                  className={styles.FullUrl}
                />
              </Table.Cell>

              <Table.Cell
                key={item.id}
                css={{ padding: "1em 2.5em" }}
                className={styles.TableCell}
              >
                <Tooltip content="click to copy">
                  <Col
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `linkfy.web.app/${item.code}`
                      )
                    }
                  >
                    <Row>
                      <Text>{""}</Text>
                    </Row>
                    <Row>
                      <Text
                        className={styles.ShortenedUrl}
                      >{`linkfy.web.app/${item.code}`}</Text>
                    </Row>
                  </Col>
                </Tooltip>
              </Table.Cell>

              <Table.Cell
                key={item.id}
                css={{ padding: "1em 2.5em" }}
                className={styles.TableCell}
              >
                <Text className={styles.Date}>
                  {formatDistanceToNowStrict(new Date(item.date), {
                    addSuffix: true,
                  })}
                </Text>
              </Table.Cell>

              <Table.Cell
                key={item.Code}
                css={{ padding: "1em 2.5em" }}
                className={styles.TableCell}
              >
                <Row justify="space-between" gap="0.5" align="center">
                  <Col>
                    <IconButton
                      key={item.code}
                      onClick={() => console.log("View user", item.id)}
                    >
                      <Image
                        src={"/qr.svg"}
                        width={20}
                        height={20}
                        alt="rq-code-icon"
                      />
                    </IconButton>
                  </Col>
                  <Col>
                    <IconButton
                      onClick={() => {
                        const dbm = getFirestore();

                        const docRef = doc(
                          dbm,
                          localStorageData.email,
                          item.code
                        );

                        deleteDoc(docRef)
                          .then(() => {
                            console.log(
                              "Document successfully deleted!",
                              item.code
                            );
                          })
                          .catch(() => {
                            console.log(" 🧨🧨🧨 ");
                          });
                      }}
                    >
                      <DeleteIcon size={20} fill="#FF0080" />
                    </IconButton>
                  </Col>
                </Row>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      {/* <p>
        {Object.keys(data).map((key) => (
          <p key={key}>{`${key}: ${data[key]}`}</p>
        ))}
      </p> */}
    </section>
  ) : (
    <></>
  );
}
