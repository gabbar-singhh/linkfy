import React from "react";
import styles from "@/styles/About.module.css";
import Navbar from "@/components/Navbar.jsx";
import Head from "next/head";

const about = () => {
  const openTwitterAcc = () => {
    window.open("https://twitter.com/garadiya0");
  };

  const openLink = () => {
    window.open("https://10daywebbuild.netlify.app/");
  };
  return (
    <>
      <Head>
        {" "}
        <title> About Me</title>
      </Head>

      <Navbar />

      <section className={styles.Main}>
        <h2>Hello Folks! 👋</h2>
        <div className={styles.Content}>
          <p>
            Hello there! I’m Himanshu, a final-year BCA student who enjoys
            building simple and useful web tools. Recently, I worked on my PBL
            project under Prof. Abhijeet Kokare, and it took about three weeks
            from idea to completion.
          </p>
          <p>
            The problem I wanted to solve was simple: long and messy URLs are
            inconvenient to share. To address this, I built Linkfy, a tool that
            quickly turns any long link into a short and clean one.
          </p>
          <p>
            Here’s how it works. You paste a long URL, click a button, and get a
            shortened link instantly. Each user has their own login, so their
            shortened URLs stay private and accessible only to them. There’s
            also a one-tap copy option that makes sharing easy. The system
            stores everything neatly in the background, keeping each user’s
            links organised.
          </p>
          <p>
            My motivation was to build something small, purposeful, and easy for
            anyone to use. The project helped me improve my thinking, structure,
            and ability to ship a complete product within a timeline.
          </p>

          <p>
            Grateful to MIT-WPU and Prof. Kokare for the guidance and support
            throughout the project.
          </p>
        </div>
      </section>
    </>
  );
};

export default about;
