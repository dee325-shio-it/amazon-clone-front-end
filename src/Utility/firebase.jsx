import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoHaTMeuSntYg6FOkNDi4psbZsh84TRMk",
  authDomain: "clone-b624b.firebaseapp.com",
  projectId: "clone-b624b",
  storageBucket: "clone-b624b.appspot.com", // fixed domain
  messagingSenderId: "398000295739",
  appId: "1:398000295739:web:b5179032615f692ec3f11e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//  Initialize auth and db
const auth = getAuth(app);
const db = getFirestore(app);

//  Export them for use in other files
export { auth, db };

// // Initialize Firebase
// const app = Firebase.initializeApp(firebaseConfig);

// // Export auth and firestore from compat SDK
// export const auth = getAuth();
// export const db = app.firestore();
