// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnwRO4op_gD-x6JFo3I6Gj8frfWIgBsVg",
  authDomain: "water-base-project.firebaseapp.com",
  databaseURL: "https://water-base-project-default-rtdb.firebaseio.com",
  projectId: "water-base-project",
  storageBucket: "water-base-project.appspot.com",
  messagingSenderId: "341493471981",
  appId: "1:341493471981:web:a2c70c8c9e7cf57e3f0ae4",
  measurementId: "G-28XH7VFBMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

module.exports = database;
