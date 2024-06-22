import { auth } from "@/firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Auth,
  GoogleAuthProvider,
  User,
  signInWithCustomToken,
} from "firebase/auth";
import { getUser } from ".";

export const persistUser = async (user: User) => {
  try {
    const token = await user.getIdToken();
    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("userId", user.uid);
  } catch (error) {
    console.error("Error persisting user data:", error);
  }
};

export const retrieveUser = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const userId = await AsyncStorage.getItem("userId");
    if (token && userId) {
      // const userCredential = await signInWithCustomToken(auth, token);
      // const user = userCredential.user;
      const user = await getUser(userId);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userId");
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
    clearUser();
  } catch (error) {
    console.log("Error logging out: ", error);
  }
};

const fetchUserDetails = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.EXPO_PUBLIC_FIRE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            idToken: token,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        return data.users[0];
      } else {
        console.error("Error fetching user details:", response.status);
      }
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
};
