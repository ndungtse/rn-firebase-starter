import { auth, db } from "@/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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
