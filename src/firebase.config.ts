import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "api-key",
//   authDomain: "project-id.firebaseapp.com",
//   databaseURL: "https://project-id.firebaseio.com",
//   projectId: "project-id",
//   storageBucket: "project-id.appspot.com",
//   messagingSenderId: "sender-id",
//   appId: "app-id",
//   measurementId: "G-measurement-id",
// };

const firebaseConfig = {
  apiKey: "AIzaSyA1zkP8KjO1Ln-w_8Z80YH7wGjOSBH_9r0",
  authDomain: "react-native-c5bdb.firebaseapp.com",
  projectId: "react-native-c5bdb",
  storageBucket: "react-native-c5bdb.appspot.com",
  messagingSenderId: "213221040154",
  appId: "1:213221040154:web:32a7adb67ceb093fb5f1a3",
  measurementId: "G-NB96K5MTGH",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const analytics = getAnalytics(FIREBASE_APP);
export const auth = getAuth(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
