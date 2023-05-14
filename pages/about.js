import React from "react";
import styles from "@/styles/About.module.css";
import Navbar from "components/Navbar.jsx";
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
            Hello there! I'm Himanshu, a young and enthusiastic 17-year-old web
            developer and designer who is passionate about working in the tech
            industry. Recently, I developed a web application called Linkfy,
            which helps people shorten their long and messy URLs for clean and
            easy sharing. The project was built over the course of 10
            consecutive days, as part of a famous #10DayWebBuild challenge on
            Twitter. I'm proud to say that my everyday progress was visible on
            my Twitter feed at
            <span onClick={openTwitterAcc}> @garadiya0 </span>, which helped me
            stay accountable and motivated throughout the project.
          </p>
          <p>
            During the challenge, I learned a lot about web development and
            gained a great deal of confidence in my skills. I'm happy to say
            that I'm now a more skilled developer than I was before. My primary
            tools for building the project were Next Js and Firebase, and I
            found both to be extremely helpful in achieving my goals. As a young
            developer, I'm constantly seeking opportunities to learn and grow,
            and the <span onClick={openLink}> #10DayWebBuild</span> challenge
            was an excellent way to do just that. I'm thrilled with the results
            of the project and am eager to continue building my skills as a
            developer.
          </p>
          <p>
            Overall, I'm proud of what I accomplished with Linkfy, and I hope
            that it will help many people shorten their URLs and make sharing
            content online a more enjoyable experience. Thank you for taking the
            time to learn about my project! 😊🙌
          </p>
        </div>
      </section>
    </>
  );
};

export default about;
