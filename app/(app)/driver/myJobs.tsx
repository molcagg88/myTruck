import ActiveJob from "@/components/activeJob";
import CustomHeader from "@/components/CustomHeader";
import { useTheme } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

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
      <CustomHeader title="Your jobs" backTo={"/"} back={false} />
      <ScrollView style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => {
              router.push("/(app)/(driverPages)/savedJobs");
            }}
            style={styles.buttonTeritary}
          >
            <Text style={styles.buttonTeritaryText}>Saved jobs</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.subtitle}>Current job</Text>
          <ActiveJob />
          {/* // <Text
          //   style={[styles.body, { marginVertical: 30, alignSelf: "center" }]}
          // >
          //   No active jobs. Go to home page to apply to jobs
          // </Text> */}
        </View>
      </ScrollView>
    </View>
  );
}
