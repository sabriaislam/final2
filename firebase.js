import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAr4rwuMZmHbExAxIdpl44kXFtsheI_8a4",
    authDomain: "final-project-a29d0.firebaseapp.com",
    projectId: "final-project-a29d0",
    storageBucket: "final-project-a29d0.firebasestorage.app",
    messagingSenderId: "599206501989",
    appId: "1:599206501989:web:aef33c15fefc4e8b82f08c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);