import { router, Stack } from "expo-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "./hooks/AuthContext";
import { AuthProvider } from "./providers/AuthProvider";

function RootNavigation() {
  const { isAuth, loading } = useContext(AuthContext);

  // Log the values from the context every time this component renders
  console.log("RootNavigation: isAuth:", isAuth, "loading:", loading);

  useEffect(() => {
    console.log(
      "RootNavigation useEffect: isAuth:",
      isAuth,
      "loading:",
      loading
    );
    if (!loading) {
      if (isAuth) {
        console.log("Redirecting to / (app) because user is authenticated.");

        // If the user is authenticated, redirect them to the main app screen.
        router.replace("/(app)");
      } else {
        console.log(
          "Redirecting to / (auth) because user is not authenticated."
        );

        // If the user is not authenticated, redirect them to the sign-in screen.
        router.replace("/(auth)");
      }
    }
  }, [isAuth, loading]);

  // This will render the Stack navigator as a child of the AuthProvider
  return <Stack />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
