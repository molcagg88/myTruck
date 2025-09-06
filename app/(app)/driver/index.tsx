import JobCardDriver from "@/components/JobCardDriver";
import { JobType, MockData } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

interface JobCardProps {
  data: JobType[];
}

type JobStatus =
  | "unassigned"
  | "assigned"
  | "pickedUp"
  | "complete"
  | "confirmed";

const data = MockData;

export default function home() {
  const { styles, colors } = useTheme();
  const router = useRouter();

  const renderItem = ({ item }: { item: JobType }) => (
    <JobCardDriver data={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello driver</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
