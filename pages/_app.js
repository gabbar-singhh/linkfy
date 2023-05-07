import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [dataContext, setDataContext] = useState({
    credential: "",
    token: "",
    displayName: "",
    email: "",
    photoURL: "",
    isLoggedIn: false,
  });

  return (
    <UserContext.Provider value={{ dataContext, setDataContext }}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
