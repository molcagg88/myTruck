import { useTheme } from "@/constants/theme";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function AuthLayout() {
  const { styles, colors } = useTheme();

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
