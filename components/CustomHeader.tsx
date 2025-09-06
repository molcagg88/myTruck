import { useTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  forUser: "customer" | "driver";
}

const CustomHeader: React.FC<HeaderProps> = ({ title, forUser }) => {
  const { styles, colors } = useTheme();
  const router = useRouter();

  const handleGoBack = () => {
    router.push(`/${forUser == "customer" ? "customer/myOrders" : "driver"}`);
  };

  return (
    <View style={styles.subtitle}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
const stylesh = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  backButton: {
    paddingRight: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: "blue",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
