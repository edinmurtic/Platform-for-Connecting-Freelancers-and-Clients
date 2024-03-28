// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDKEUtTOxjRsYRjqtm0mC0VQxre6V8alfA",
  authDomain: "myjob-c95a8.firebaseapp.com",
  projectId: "myjob-c95a8",
  storageBucket: "myjob-c95a8.appspot.com",
  messagingSenderId: "200685982112",
  appId: "1:200685982112:web:5cbf6b4b9198b8852f94c5",
  measurementId: "G-Y1F5SY0PW9"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)