import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSuf60Hnf4HIEh34jIscp7QF0kmf14YUM",
  authDomain: "dripdeskapp.firebaseapp.com",
  projectId: "dripdeskapp",
  storageBucket: "dripdeskapp.firebasestorage.app",
  messagingSenderId: "661451519784",
  appId: "1:661451519784:web:79ab1c84f321b5503b421d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);