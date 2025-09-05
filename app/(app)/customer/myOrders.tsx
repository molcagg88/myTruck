import JobCard from "@/components/JobCard";
import { MockData } from "@/constants/data";
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

interface JobType {
  id: string | number;
  status: JobStatus;
  pickup: string;
  dropoff: string;
  loadType: string;
  price: string | number;
}

const data = MockData;

export default function myOrders() {
  const { styles, colors } = useTheme();
  const router = useRouter();

  const renderItem = ({ item }: { item: JobType }) => <JobCard data={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your orders</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
