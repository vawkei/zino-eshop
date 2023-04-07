
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyD_PHRILFgAGBNgq79AYPiugFabZmr7Hdw",
  authDomain: "eshop-a1c11.firebaseapp.com",
  projectId: "eshop-a1c11",
  storageBucket: "eshop-a1c11.appspot.com",
  messagingSenderId: "153480385907",
  appId: "1:153480385907:web:3587cc2be6720f1f17e106"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;