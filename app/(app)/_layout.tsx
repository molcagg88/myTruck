import { Stack, router, useSegments } from "expo-router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../hooks/AuthContext";

export default function AppLayout() {
  const { isAuth, loading, user_type } = useContext(AuthContext);
  const segments = useSegments();

  // useEffect to handle redirection
  useEffect(() => {
    // Check if the auth state has been loaded
    if (!loading && !isAuth) {
      // Check if the user is not authenticated
      // Redirect to the login page if not authenticated
      router.replace("/(auth)");
    }
  }, [isAuth, loading]);

  // If the user is authenticated, render the children of this layout
  return <Stack />;
}
