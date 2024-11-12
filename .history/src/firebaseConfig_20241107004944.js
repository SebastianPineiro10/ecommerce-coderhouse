import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5Se1O4vN5LkJy_RH-D4cGwR73BkMs0XU",
  authDomain: "backend-ecommercecoderhouse.firebaseapp.com",
  projectId: "backend-ecommercecoderhouse",
  storageBucket: "backend-ecommercecoderhouse.firebasestorage.app",
  messagingSenderId: "500308526062",
  appId: "1:500308526062:web:fb10676cea4e305534c4ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

