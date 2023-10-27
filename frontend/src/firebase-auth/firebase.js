
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDIq8qBAY83cCeXeXOhjAjGSLpH8cQ4rY",
  authDomain: "kwiz-auth.firebaseapp.com",
  projectId: "kwiz-auth",
  storageBucket: "kwiz-auth.appspot.com",
  messagingSenderId: "196732677170",
  appId: "1:196732677170:web:4cb4c76fb89f668f15602b",
  measurementId: "G-X0GB1N5H1D"
};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)


