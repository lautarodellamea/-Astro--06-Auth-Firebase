// https://firebase.google.com/?authuser=1&hl=es-419
// https://docs.astro.build/en/guides/authentication/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr7akcG_b9rzlZhzZIWLn641ATrdOPf2U",
  authDomain: "astro-authentication-48a2b.firebaseapp.com",
  projectId: "astro-authentication-48a2b",
  storageBucket: "astro-authentication-48a2b.appspot.com",
  messagingSenderId: "247295988535",
  appId: "1:247295988535:web:915355d27f5d5af6e800b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export const firebase = {
  app,
  auth,
}