import { JobDetails } from "@/components/JobDetails"; // wherever you put it
import { useTheme } from "@/constants/theme";
import { useLocalSearchParams } from "expo-router";
import { toNumber } from "lodash";
import React from "react";
import { View } from "react-native";
// import { bids } from "@/data/bids"; // your bids data source

const bids = [
  { job_id: 1, amount: 85000, bidder_id: 21 },
  { job_id: 1, amount: 85000, bidder_id: 22 },
];

const JobDetailsScreen = () => {
  const { styles, colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1 }}>
      <JobDetails jobId={toNumber(id)} bids={bids} />
    </View>
  );
};

export default JobDetailsScreen;
