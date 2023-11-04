// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFireastore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAnQx1SoKX84z7_3RGfTWj4ndcXilhWLyE',
  authDomain: 'capstone-podcast.firebaseapp.com',
  projectId: 'capstone-podcast',
  storageBucket: 'capstone-podcast.appspot.com',
  messagingSenderId: '1060997855290',
  appId: '1:1060997855290:web:2c987bd1b95395f2b7dd03',
  measurementId: 'G-E4340NCKZH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
