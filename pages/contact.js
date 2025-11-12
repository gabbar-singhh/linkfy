import { useState } from "react";
import Navbar from "components/Navbar.jsx";
import Head from "next/head";
import styles from "@/styles/About.module.css";

export default function ContactForm() {
  return (
    <>
      <Head>
        <title> Contact Us</title>
      </Head>
      <Navbar />
      <section className={styles.Main}>
        <h2>Any Queries? 🧐</h2>
        <div className={styles.Content}>
          <p>
            If you have any queries, suggestions, or simply want to share your
            thoughts about this project, I’d be happy to hear from you. Whether
            it’s feedback that can help improve Linkfy or a question about how
            something works, feel free to reach out. I check my inbox regularly
            and try to respond as soon as possible. Clear communication always
            helps a project grow, and your input can make a real difference.
          </p>
          <p>
            You can connect / write to me anytime at{" "}
            <a style={{"textDecoration":"underline", "textUnderlineOffset":"5px"}} href="mailto:himanshu.pal@mitwpu.edu.in">
              himanshu.pal@mitwpu.edu.in
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
