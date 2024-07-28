
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCuAtpSWjwWsGZmCsaatW4Tr3Xbkh6XwXs",
  authDomain: "space-chat-b2e26.firebaseapp.com",
  projectId: "space-chat-b2e26",
  storageBucket: "space-chat-b2e26.appspot.com",
  messagingSenderId: "955470760991",
  appId: "1:955470760991:web:01433229c4b3169b4f192a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();