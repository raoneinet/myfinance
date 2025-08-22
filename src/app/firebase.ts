
import { initializeApp } from "firebase/app"
import {getAuth} from "firebase/auth"

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbOvmBM1ImUJLFwtgV4NsJnrWqkojEtKc",
  authDomain: "myfinance-33dc6.firebaseapp.com",
  projectId: "myfinance-33dc6",
  storageBucket: "myfinance-33dc6.firebasestorage.app",
  messagingSenderId: "1029037212234",
  appId: "1:1029037212234:web:fe904466a63a0b75b51cb3"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)