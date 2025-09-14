import { JobType, MockUsers, bids } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface BidType {
  job_id: string | number;
  amount: string | number;
  bidder_id: string | number;
}

interface JobCardProps {
  data: JobType;
  applyPage?: boolean;
}

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import CustomerCard from "./CustomerCard";

const JobCardDriver: React.FC<JobCardProps> = ({ data, applyPage }) => {
  const [saved, setsaved] = useState(false);

  const { styles, colors } = useTheme();
  const router = useRouter();

  const JobCard = ({ item }: { item: JobType }) => (
    <View
      style={[styles.jobCard, applyPage && { margin: -15, shadowOpacity: 0 }]}
    >
      <Text style={[styles.subtitle, { marginBottom: 10 }]}>
        Order #{item.id}
      </Text>
      <CustomerCard item={MockUsers[0]} />

      <View style={{ marginTop: 4, marginBottom: 10 }}>
        <View style={{ flexDirection: "row", marginBottom: 4 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="location-outline"
              size={16}
              color={colors.text}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.body, { marginLeft: 4 }]}>Pickup:</Text>
          </View>
          <Text style={[styles.body, { flex: 1 }]}>{item.pickup}</Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 4 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="location-outline"
              size={16}
              color={colors.text}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.body, { marginLeft: 4 }]}>Drop-off:</Text>
          </View>
          <Text style={[styles.body, { flex: 1 }]}>{item.dropoff}</Text>
        </View>

        {/* Load Type */}
        <View style={{ flexDirection: "row", marginBottom: 4 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="mail-outline"
              size={16}
              color={colors.text}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.body, { marginLeft: 4 }]}>Load Type:</Text>
          </View>
          <Text style={[styles.body, { flex: 1 }]}>{item.loadType}</Text>
        </View>

        {/* Price */}
        <View style={{ flexDirection: "row", marginBottom: 4 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="pricetag-outline"
              size={16}
              color={colors.text}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.body, { marginLeft: 4 }]}>Price:</Text>
          </View>
          <Text style={[styles.body, { flex: 1 }]}>${item.price}</Text>
        </View>

        {/*Number of bids*/}
        {(applyPage == null || applyPage == false) && (
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons
                name="person-outline"
                size={16}
                color={colors.text}
                style={{ marginBottom: 12 }}
              />
              <Text style={[styles.body, { marginLeft: 4 }]}>
                Current bids:
              </Text>
            </View>
            <Text
              style={[
                styles.body,
                { flex: 1, fontWeight: "700", color: colors.primary },
              ]}
            >
              {`${bids
                .filter((bid) => bid.job_id == item.id)
                .length.toString()}`}
            </Text>
          </View>
        )}
        {(applyPage == null || applyPage == false) && (
          //(for homepage use) only display buttons if driver hasn't applied to the job
          // (driverData.bids.active.filter(bid=>bid.jobId==item.id).length==0) &&(
          <View style={{ flexDirection: "row", gap: 15 }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => router.push(`/driverJobs/${item.id}`)}
                style={[styles.button, { flexDirection: "row", gap: 5 }]}
              >
                <Ionicons
                  style={{ paddingTop: 2 }}
                  name="send-outline"
                  size={18}
                  color={colors.primary}
                />
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  const newState = !saved;
                  setsaved(newState);
                  Toast.show({
                    type: newState ? "success" : "error",
                    text1: newState ? "Saved" : "Removed from saved",
                  });
                }}
                style={[
                  styles.buttonTeritary,
                  { flexDirection: "row", gap: 5 },
                ]}
              >
                <Ionicons
                  style={{ paddingTop: 2 }}
                  name={saved ? "bookmark" : "bookmark-outline"}
                  size={18}
                  color={colors.teritary}
                />
                <Text style={styles.buttonTeritaryText}>
                  {saved ? "Saved" : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  return <JobCard item={data} />;
};

// Job Details Screen to show bids for a specific job

export default JobCardDriver;
