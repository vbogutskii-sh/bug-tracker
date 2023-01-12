import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDciBx0LD55KYfGve75RTXy6rJKxUOQbVk",
  authDomain: "bugtracker-e33ca.firebaseapp.com",
  projectId: "bugtracker-e33ca",
  storageBucket: "bugtracker-e33ca.appspot.com",
  messagingSenderId: "26112839778",
  appId: "1:26112839778:web:86f0b4a9f90b8da059c13b",
  measurementId: "G-M5QE6SVQQD"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db)
export default db;
