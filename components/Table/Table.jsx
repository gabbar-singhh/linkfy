import { Table, Row, Col, Tooltip, Text } from "@nextui-org/react";
import { IconButton } from "./IconButton";
import { DeleteIcon } from "./DeleteIcon";
import styles from "./Table.module.css";
import { formatDistanceStrict } from "date-fns";
import Image from "next/image";

export default function App() {
  const columns = [
    { name: "FULL URL", uid: "full_url" },
    { name: "SHORTENED URL", uid: "shortened_url" },
    { name: "TIME", uid: "date" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const users = [
    {
      id: 0,
      originalURL: "https://github.com/AshmanSodhi/akshita_ka_janamdin.git",
      code: "JSK9S",
      date: "2023-05-05",
    },
    {
      id: 1,
      originalURL:
        "https://console.firebase.google.com/u/0/project/linkify-8869d/firestore/data/~2Fhimanshu01.dev@gmail.com~2F25d0561d-56c9-423a-b5cc-cd26de47ba55",
      code: "HS8R7",
      date: "2023-01-01",
    },
    {
      id: 2,
      originalURL: "https://web.whatsapp.com/",
      code: "BSJFU",
      date: "2020-09-28",
    },
  ];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    const date = new Date(user.date);
    switch (columnKey) {
      case "full_url":
        return <Text className={styles.FullUrl}>{user.originalURL}</Text>;

      case "shortened_url":
        return (
          <Col>
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
            {formatDistanceStrict(date, new Date(), { addSuffix: true })}
          </Text>
        );

      case "actions":
        return (
          <Row justify="space-between" gap="0.5" align="center">
            <Col>
              <Tooltip content="QR-Code">
                <IconButton onClick={() => console.log("View user", user.id)}>
                  <Image
                    src={"/qr.svg"}
                    width={20}
                    height={20}
                    alt="rq-code-icon"
                  />
                </IconButton>
              </Tooltip>
            </Col>
            <Col>
              <Tooltip
                content="Delete"
                color="error"
                onClick={() => console.log("Delete user", user.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );

      default:
        return cellValue;
    }
  };
  return (
    <>
      <section className={styles.Main}>
        <h2>👉 Previous Shortened Links</h2>
        <Table
          aria-label="Example table with custom cells"
          selectionMode="none"
          css={{}}
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

          <Table.Body items={users} className={styles.TableBody}>
            {(item) => (
              <Table.Row>
                {(columnKey) => (
                  <Table.Cell
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
    </>
  );
}
