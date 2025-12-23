import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// นำค่า config จากข้อ 2 มาใส่ตรงนี้
const firebaseConfig = {
  apiKey: "AIzaSyCkf91XjB4D3FsFfGaVVgP8AtOdCLxXQR4",
  authDomain: "gov-vehicle-booking.firebaseapp.com",
  projectId: "gov-vehicle-booking",
  storageBucket: "gov-vehicle-booking.firebasestorage.app",
  messagingSenderId: "342589399864",
  appId: "1:342589399864:web:b58c9a2ec8740d8ed057cd",
  measurementId: "G-EVE5BPVPHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services เพื่อนำไปใช้ในไฟล์อื่น
export const auth = getAuth(app);
export const db = getFirestore(app);
