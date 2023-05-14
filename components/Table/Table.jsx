import styles from "./Table.module.css";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { db } from "@/firebase";
import React, { useState, useEffect } from "react";
import { doc, onSnapshot, collection, getFirestore } from "firebase/firestore";
import { Table, Text, Col, Row } from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { IconButton } from "./IconButton";

export default function App() {
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState({ user: "NOTSHOW" });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const fetchData = async () => {
      const dbm = getFirestore();
      const collectionRef = collection(dbm, `${userData.email}`);

      const gettingData = onSnapshot(collectionRef, (snapshot) => {
        snapshot.docs.map((doc) => {
          console.log("🎈🎈", doc.data());
          if (snapshot.size === 0) {
            setShowTable({ user: "NOTSHOW" });
          } else {
            setShowTable({ user: "SHOW" });
            const CODE_VAL = doc.data().code;
            const FULL_URL = doc.data().originalURL;
            const DATE = doc.data().date;
            const ID = doc.data().id;

            setData((prevData) => [prevData, doc.data()]);
          }
        });
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

  const columns = [
    { name: "FULL URL", uid: "full_url" },
    { name: "SHORTENED URL", uid: "shortened_url" },
    { name: "TIME", uid: "date" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "full_url":
        return (
          <textarea
            readOnly
            value={user.originalURL}
            resize="none"
            rows={1}
            className={styles.FullUrl}
          />
        );

      case "shortened_url":
        return (
          <Col
            onClick={() =>
              navigator.clipboard.writeText(`linkfy.web.app/${user.code}`)
            }
          >
            <Row>
              <Text>{cellValue}</Text>
            </Row>
            <Row>
              <Text
                className={styles.ShortenedUrl}
              >{`linkfy.web.app/${user.code}`}</Text>
            </Row>
          </Col>
        );

      case "date":
        return (
          <Text className={styles.Date}>
            {formatDistanceToNowStrict(new Date(user.date), {
              addSuffix: true,
            })}
          </Text>
        );

      case "actions":
        return (
          <Row justify="space-between" gap="0.5" align="center">
            <Col>
              <IconButton onClick={() => console.log("View user", user.id)}>
                <Image
                  src={"/qr.svg"}
                  width={20}
                  height={20}
                  alt="rq-code-icon"
                />
              </IconButton>
            </Col>
            <Col>
              <IconButton onClick={() => console.log("Delete user", user.id)}>
                <DeleteIcon size={20} fill="#FF0080" />
              </IconButton>
            </Col>
          </Row>
        );

      default:
        return cellValue;
    }
  };

  return showTable.user === "SHOW" ? (
    <section className={styles.Main}>
      <h2>👉 Previous Shortened Links</h2>
      <Table
        aria-label="All Shortened URLS with their Full URLS"
        selectionMode="none"
        className={styles.Table}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              className={styles.ColumnHead}
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>

        <Table.Body items={data} className={styles.TableBody}>
          {(item) => (
            <Table.Row textValue="">
              {/* key={item.id} */}
              {(columnKey) => (
                <Table.Cell
                  key={item.id}
                  css={{ padding: "1em 2.5em" }}
                  className={styles.TableCell}
                >
                  {renderCell(item, columnKey)}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </section>
  ) : (
    <></>
  );
}
