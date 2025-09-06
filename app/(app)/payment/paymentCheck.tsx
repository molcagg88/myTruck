import CustomHeader from "@/components/CustomHeader";
import { useTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function paymentCheck() {
  const { styles, colors } = useTheme();
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader forUser="customer" title="Payment status" />
      <View
        style={{
          alignItems: "center",
          marginVertical: "auto",
          justifyContent: "center",
        }}
      >
        <Ionicons name="checkmark-circle" size={100} color={colors.primary} />
        <Text style={styles.subtitle}>Payment confirmed!</Text>
      </View>
      <TouchableOpacity
        onPress={() => router.replace("/(app)/customer")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
