// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmBYhDcHN7tHd2p-Djfh-TVxVo-pqQXw4",
  authDomain: "shoppingapp-452cd.firebaseapp.com",
  projectId: "shoppingapp-452cd",
  storageBucket: "shoppingapp-452cd.appspot.com",
  messagingSenderId: "121830040522",
  appId: "1:121830040522:web:72b966eb624d53b9822533",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
