import JobList from "@/components/JobCard";
import { useTheme } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const data = [
  {
    id: 1,
    pickup: "henny",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
  {
    id: 2,
    pickup: "Djibouti",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
  {
    id: 3,
    pickup: "Djibouti",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
  {
    id: 4,
    pickup: "Djibouti",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
  {
    id: 5,
    pickup: "Djibouti",
    dropoff: "Kality",
    loadType: "Ceramic",
    price: "80000",
  },
];

export default function myOrders() {
  const { styles, colors } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your orders</Text>
      <JobList data={data} />
    </View>
  );
}
