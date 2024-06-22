import AppSplashScreen from "@/components/shared/AppSplashScreen";
import { auth } from "@/firebase.config";
import { retrieveUser } from "@/lib/firebase/auth";
import { Profile } from "@/lib/types/schema";
import { url } from "@/utils/fetch";
import axios, { AxiosInstance } from "axios";
import { router, useSegments } from "expo-router";
import { User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

interface AuthContextProps {
  user: User | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
  ready?: boolean;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  getProfile: () => Promise<void>;
  AuthApi?: AxiosInstance;
  userProfile?: Profile;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setToken: () => {},
  setUser: () => {},
  token: null,
  ready: false,
  getProfile: () => Promise.resolve(),
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const useAuth = () => useContext(AuthContext);
export const whiteList = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/verify-phone",
];

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<any>(undefined);
  const [ready, setReady] = useState(true);
  const segments = useSegments();

  const AuthApi = axios.create({
    baseURL: url,
    headers: {
      Authorization: token,
    },
  });

  const replace = (path: string) => {
    if (Platform.OS === "ios") {
      setTimeout(() => {
        router.replace(path);
      }, 1);
    } else {
      setImmediate(() => {
        router.replace(path);
      });
    }
  };

  // get profile to initialize user and also validating him
  const getProfile = async () => {
    // console.log("getting profile", isAuthPage);
    const user = await retrieveUser();
    console.log("retrieveUser", user);
  };

  useEffect(() => {
    console.log();

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      // console.log("currentUser", currentUser);
      setUser(currentUser);
    });
    getProfile();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)" || segments.length === 0;
    const isLanding = segments[0] === "landing";

    // segments length is 0 when on the landing page. ot '/'
    // if (segments.length === 0) return;
    if (isLanding) return;

    if (
      // If the token is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      console.log("has tkn segments", segments);
      // Redirect to the login page. For more info see https://github.com/expo/router/issues/740
      replace("/login");
    } else if (user && inAuthGroup) {
      // Redirect away from the login page.
      console.log("tabs", segments);
      replace("/(tabs)");
    }
  }, [user, segments]);

  // if (!ready) return <AppSplashScreen />;

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
        token,
        setToken,
        ready,
        getProfile,
        AuthApi,
      }}
    >
      {ready ? props.children : <AppSplashScreen />}
    </AuthContext.Provider>
  );
}
