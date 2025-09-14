import CustomHeader from "@/components/CustomHeader";
import JobCardDriver from "@/components/JobCardDriver";
import { MockData } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import React from "react";
import { View } from "react-native";

export default function SavedJobs() {
  const { styles, colors } = useTheme();

  return (
    <View style={styles.container}>
      <CustomHeader title="Saved Jobs" backTo={"/(app)/driver/myJobs"} />
      <JobCardDriver data={MockData[1]} />
    </View>
  );
}
