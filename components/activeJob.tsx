import { useTheme } from "@/constants/theme";
import React from "react";
import { View } from "react-native";
import AddCheckpoint from "./addCheckpoint";
import { Progress } from "./progress";

export default function ActiveJob() {
  const { styles, colors } = useTheme();

  return (
    <View style={{ alignItems: "center" }}>
      <Progress job_id="1" />
      <AddCheckpoint />
    </View>
  );
}
