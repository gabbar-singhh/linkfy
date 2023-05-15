import { useState } from "react";
import Navbar from "components/Navbar.jsx";
import Head from "next/head";

export default function ContactForm() {
  return (
    <>
      <Head>
        <title> Contact Us</title>
      </Head>
      <Navbar />
      <section style={{ margin: "1em 2em" }}>
        If you found any Bugs or have any suggestion regarding Linkfy.
        <br />
        <br />
        Email me at: himanshup1308@gmail.com
        <br />
        <br />
        Twitter: @garadiya0
        <br />
        <br />
        Instagram: @codexhimanshu
      </section>
    </>
  );
}
