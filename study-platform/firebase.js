// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQoQSz33dmN5tEMq94XqloXx4PjEHjhYk",
  authDomain: "studybuddy-85940.firebaseapp.com",
  projectId: "studybuddy-85940",
  storageBucket: "studybuddy-85940.appspot.com",
  messagingSenderId: "214443855894",
  appId: "1:214443855894:web:37a01467ba50ccfffbe537",
  measurementId: "G-612VVR2GVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);