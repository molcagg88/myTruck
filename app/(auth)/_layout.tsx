import { useTheme } from "@/constants/theme";
import { router, Stack, useSegments } from "expo-router";
import { useContext, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { AuthContext } from "../hooks/AuthContext";

export default function AuthLayout() {
  const { styles, colors } = useTheme();
  const { isAuth, loading } = useContext(AuthContext);
  const segments = useSegments();

  // useEffect to handle redirection
  useEffect(() => {
    // Check if the auth state has been loaded
    if (!loading && isAuth) {
      router.replace("/(app)");
    }
  }, [isAuth, loading]);
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            title: "My truck",
            headerShown: false,
            headerStyle: { backgroundColor: colors.primarySoft },
          }}
        />

        <Stack.Screen
          name="signup"
          options={{
            title: "Sign up",
            headerTintColor: colors.primary,
            headerStyle: { backgroundColor: colors.background },
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="signin"
          options={{
            title: "Sign in",
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.primary,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="otp"
          options={{
            title: "OTP",
            headerTintColor: colors.primary,
            headerTransparent: true,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="details"
          options={{
            title: "Details",
            headerTintColor: colors.primary,
            headerTransparent: true,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
      <Toast />
    </SafeAreaProvider>
  );
}
