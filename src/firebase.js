import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "placeholder",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "placeholder",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "placeholder",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "placeholder",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "placeholder",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "placeholder"
};

// Log warning if keys are missing
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    console.warn("Firebase API Key is missing. Please create a .env file and add your VITE_FIREBASE_API_KEY.");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
