import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "final-project-a29d0.firebaseapp.com",
    projectId: "final-project-a29d0",
    storageBucket: "final-project-a29d0.firebasestorage.app",
    messagingSenderId: "599206501989",
    appId: "1:599206501989:web:aef33c15fefc4e8b82f08c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);