import { Storage } from "@/services/SecureStore";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

// This hook checks for a token and redirects the user accordingly.
export default function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await Storage.getValueFor("token");

      // Check if the user is in an auth screen group
      const inAuthGroup = segments[0] === "(auth)";
      // If no token and not in the auth group, redirect to sign-in.
      if (token == null && !inAuthGroup) {
        router.replace("/(auth)/signup"); // Or your specific sign-in route
      }
      // If there is a token and the user is in the auth group, redirect to the app.
      else if (token && inAuthGroup) {
        router.replace("/(app)");
      }
    };

    checkAuth();
  }, [segments, router]);
  return {};
}
