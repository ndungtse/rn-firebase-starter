import { auth, db } from "@/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

type Params = { email: string; password: string } & { [key: string]: any };

export const createUser = async (data: Params) => {
  const { email, password, ...rest } = data;
  try {
    const userCreds = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCreds.user;
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      displayName: user.displayName,
      email: user.email,
      ...rest,
    });
    console.log("user created", user);
  } catch (error) {
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    } else {
      return null; // Or throw an error if a user with that UID should always exist
    }
  } catch (error) {
    console.error("Error getting user:", error);
    return null; // Or re-throw the error
  }
};
