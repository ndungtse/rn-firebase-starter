import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

console.log("getReactNativePersistence", getReactNativePersistence);

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIRE_API_KEY,
  authDomain: "react-native-c5bdb.firebaseapp.com",
  projectId: "react-native-c5bdb",
  storageBucket: "react-native-c5bdb.appspot.com",
  messagingSenderId: "213221040154",
  appId: process.env.EXPO_PUBLIC_FIRE_APP_ID,
  measurementId: "G-NB96K5MTGH",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(FIREBASE_APP);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
