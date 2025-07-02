import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD62DzWdQEzK9dFFmqbKEtJiH80LIMeAYY",
  authDomain: "test-project-442a0.firebaseapp.com",
  projectId: "test-project-442a0",
  storageBucket: "test-project-442a0.firebasestorage.app",
  messagingSenderId: "576450700768",
  appId: "1:576450700768:web:801a5583ac0ac6ac1af785",
  measurementId: "G-GL00GQQLYS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);