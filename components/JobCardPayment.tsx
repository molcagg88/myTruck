import { useTheme } from "@/constants/theme";
import React from "react";
import { Text, View } from "react-native";

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

interface JobCardProps {
  data: JobType;
}

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const JobCardPayment: React.FC<JobCardProps> = ({ data }) => {
  const { styles, colors } = useTheme();
  const router = useRouter();

  const CardUnassigned = ({ item }: { item: JobType }) => (
    <View style={[styles.card, { minWidth: 250 }]}>
      <Text style={[styles.subtitle, { marginBottom: 10 }]}>
        Order #{item.id}
      </Text>

      <View style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: "row", marginBottom: 6 }}>
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

        <View style={{ flexDirection: "row", marginBottom: 6 }}>
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
        <View style={{ flexDirection: "row", marginBottom: 6 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="mail"
              size={16}
              color={colors.text}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.body, { marginLeft: 4 }]}>Load Type:</Text>
          </View>
          <Text style={[styles.body, { flex: 1 }]}>{item.loadType}</Text>
        </View>

        {/* Price */}
        <View style={{ flexDirection: "row", marginBottom: 6 }}>
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
      </View>
    </View>
  );

  return <CardUnassigned item={data} />;
};

// Job Details Screen to show bids for a specific job

export default JobCardPayment;
