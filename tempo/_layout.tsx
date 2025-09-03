import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  //   useProtectedRoute();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Stack>
          {/* <Stack.Screen name="(auth)" /> */}
          <Stack.Screen name="(app)" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
