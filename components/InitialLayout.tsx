import { useProtectedRoute } from "@/app/hooks/useProtectedRoute";
import { Storage } from "@/services/SecureStore";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

export default function InitialLayout() {
  const segments = useSegments();
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [isSignedin, setIsSignedin] = useState(false);
  useProtectedRoute();
  useEffect(() => {
    const checkAuth = async () => {
      const stored = await Storage.getValueFor("token");
      if (stored) {
        setToken(stored);
        console.log(token);
        setIsSignedin(true);
      } else {
        setIsSignedin(false);
      }
    };
    checkAuth();
    console.log(`IsSignedIn: ${isSignedin}, segment: ${segments[0]}`);
    if (!isSignedin && segments[0] != "(auth)") {
      router.replace("/(auth)");
    } else if (isSignedin && segments[0] == "(auth)") {
      router.replace(`/(app)?token=${token}`);
    }
  }, [segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
