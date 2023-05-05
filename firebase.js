import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCI8tuIfGHiD6-5xgKArvLXbQ2FC9pfx-k",
  authDomain: "linkify-8869d.firebaseapp.com",
  projectId: "linkify-8869d",
  storageBucket: "linkify-8869d.appspot.com",
  messagingSenderId: "844529416878",
  appId: "1:844529416878:web:5d6412cdfe2ccfd6990b3f",
  measurementId: "G-S8B3M3CC4J",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
