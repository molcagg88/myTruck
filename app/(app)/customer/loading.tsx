import LoadingScreen from "@/components/LoadingScreen";
import { useTheme } from "@/constants/theme";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function loading() {
  const { styles, colors } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen
        title="Loading"
        subtitle="first time this has happened lol"
      />
    </SafeAreaView>
  );
}
