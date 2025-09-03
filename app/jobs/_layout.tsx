import { useTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Slot, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function JobsLayout() {
  const router = useRouter();
  const { styles, colors } = useTheme();
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" color={colors.primary} size={30} />
        </TouchableOpacity>

        <Slot />
      </View>
    </>
  );
}
