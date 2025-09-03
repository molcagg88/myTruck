import { useTheme } from "@/constants/theme";
import React from "react";
import { View } from "react-native";
import { Progress } from "../../components/progress";
export default function progressPage() {
  const { styles, colors } = useTheme();
  return (
    <View style={styles.container}>
      <Progress job_id="1" />
    </View>
  );
}
