// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKxF_ey-byeU6cSjTQ5pq3ogL7byoY67o",
  authDomain: "science-hub-blog-2b481.firebaseapp.com",
  projectId: "science-hub-blog-2b481",
  storageBucket: "science-hub-blog-2b481.appspot.com",
  messagingSenderId: "411486743892",
  appId: "1:411486743892:web:575009edd240d3fdb7acc1",
  measurementId: "G-12S0J0QCE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
