// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBb5usIEabQ6VkDevjzJ8gouK8nr_Kh9zc',
  authDomain: 'toyvideoapp.firebaseapp.com',
  projectId: 'toyvideoapp',
  storageBucket: 'toyvideoapp.appspot.com',
  messagingSenderId: '702475759132',
  appId: '1:702475759132:web:bfb7fec516749ad61e39d9',
  measurementId: 'G-QD66SCZZ62',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB, 'users');
