import { useTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  backTo: Href | Function;
  back?: boolean;
  component?: React.ComponentType[];
}

const CustomHeader: React.FC<HeaderProps> = ({ title, backTo, back }) => {
  const { styles, colors } = useTheme();
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof backTo == "function") {
      backTo();
    } else {
      router.push(backTo);
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {back != false && (
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      )}

      <Text style={styles.subtitle}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
