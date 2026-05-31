// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3mmF7J6eKt4BuJZbFNrzeE8JmDwY1Niw",
  authDomain: "ena-pain.firebaseapp.com",
  projectId: "ena-pain",
  storageBucket: "ena-pain.firebasestorage.app",
  messagingSenderId: "919570684459",
  appId: "1:919570684459:web:82330c33a136a49f21286e",
  measurementId: "G-K90GE88RMN",
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);

// Firestore インスタンスをエクスポート
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
