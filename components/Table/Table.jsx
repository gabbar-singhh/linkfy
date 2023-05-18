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
  deleteDoc,
} from "firebase/firestore";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Table,
  Col,
  Tooltip,
} from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { IconButton } from "./IconButton";
import { useQRCode } from "next-qrcode";

export default function App() {
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState({ user: "NOTSHOW" });
  const { Canvas } = useQRCode();
  const [clickedUrl, setClickedUrl] = useState("");

  // MODAL VARIABLES
  const [visible, setVisible] = useState(false);
  const handler = () => {
    console.log("🤐🤐 eww");
    setVisible(true);
  };
  const closeHandler = () => {
    setVisible(false);
  };

  const fetchData = async () => {
    setData([]);
    const userData = JSON.parse(localStorage.getItem("user"));
    const dbm = getFirestore();
    const collectionRef = collection(dbm, `${userData.email}`);

    const gettingData = onSnapshot(collectionRef, (snapshot) => {
      setData([]);
      snapshot.docs.map((doc) => {
        if (snapshot.size === 0) {
          setShowTable({ user: "NOTSHOW" });
        } else {
          setShowTable({ user: "SHOW" });
          setData((prevData) => [...prevData, doc.data()]);
        }
      });
    });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    try {
      if (userData.isLoggedIn) {
        fetchData();
      }
    } catch {
      console.log("wow");
      setShowTable({ user: "NOTSHOW" });
    }
  }, []);

  return showTable.user === "SHOW" ? (
    <>
      {/* QR-Code MODAL */}
      <Modal onClose={closeHandler} closeButton open={visible}>
        <Modal.Header>
          <Text b size={20}>
            SCAN THIS!
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Canvas
            text={clickedUrl}
            options={{
              level: "L",
              margin: 2,
              scale: 4,
              width: 350,
              color: {
                dark: "#232323",
                light: "#fff",
              },
            }}
          />
        </Modal.Body>
        <Modal.Footer
          css={{
            d: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            icon
            auto
            color="error"
            onPress={() => console.log("😓😓 You pressed download btn")}
          >
            Download
          </Button>
        </Modal.Footer>
      </Modal>

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
              SHORTENED URL
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
              <Table.Row textValue="" key={item.code}>
                <Table.Cell
                  key={item.code}
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
                  key={item.code}
                  css={{ padding: "1em 2.5em" }}
                  className={styles.TableCell}
                >
                  <Tooltip content="click to copy">
                    <Col
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `linkfy.vercel.app/${item.code}`
                        )
                      }
                    >
                      <Row>
                        <Text>{""}</Text>
                      </Row>
                      <Row>
                        <Text
                          className={styles.ShortenedUrl}
                        >{`linkfy.vercel.app/${item.code}`}</Text>
                      </Row>
                    </Col>
                  </Tooltip>
                </Table.Cell>

                <Table.Cell
                  key={item.code}
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
                        onClick={() => {
                          setClickedUrl(`linkfy.vercel.app/${item.code}`);
                          setVisible(true);
                        }}
                        key={item.code}
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
                          const userData = JSON.parse(
                            localStorage.getItem("user")
                          );

                          const docRef1 = doc(dbm, userData.email, item.code);
                          const docRef_2 = doc(
                            dbm,
                            "accumulated-data",
                            item.code
                          );

                          deleteDoc(docRef1).then(() => {
                            console.log(
                              "Document successfully deleted!",
                              item.code
                            );

                            fetchData()
                              .then(() => {
                                console.log("fetch completed!");
                              })
                              .catch((error) => {
                                console.log("fetch didnt happen!", error);
                              });
                          });

                          deleteDoc(docRef_2).then(() => {
                            console.log(
                              "Document successfully deleted! from accumulated-data",
                              item.code
                            );
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
      </section>
    </>
  ) : (
    <></>
  );
}
