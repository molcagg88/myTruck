import { JobDetails } from "@/components/JobDetails"; // wherever you put it
import UserConfirm from "@/components/userConfirm";
import { bids, MockData } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import { useLocalSearchParams } from "expo-router";
import { toNumber } from "lodash";
import React from "react";
import { View } from "react-native";

const JobDetailsScreen = () => {
  const { styles, colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  //Simulating data query
  const item = MockData.filter((order) => order.id == id)[0];
  console.log(item.status);
  if (item.status == "unassigned") {
    console.log("reached");
    return (
      <View style={{ flex: 1 }}>
        <JobDetails jobId={toNumber(id)} bids={bids} />
      </View>
    );
  } else if (item.status == "complete") {
    return (
      <View style={{ flex: 1 }}>
        <UserConfirm />
      </View>
    );
  }
};

export default JobDetailsScreen;
