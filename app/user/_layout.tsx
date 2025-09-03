import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function UserLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Stack>
          <Stack.Screen name="progress" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
