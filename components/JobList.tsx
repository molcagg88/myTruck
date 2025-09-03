import { useTheme } from "@/constants/theme";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface JobType {
  id: string | number;
  pickup: string;
  dropoff: string;
  loadType: string;
  price: string | number;
}

interface BidType {
  job_id: string | number;
  amount: string | number;
  bidder_id: string | number;
}

interface JobListProps {
  data: JobType[];
}

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const JobList: React.FC<JobListProps> = ({ data }) => {
  const { styles, colors } = useTheme();
  const router = useRouter();

  const renderItem = ({ item }: { item: JobType }) => (
    <View style={styles.card}>
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
          <Text
            style={[
              styles.body,
              { flex: 1, fontWeight: "700", color: colors.primary },
            ]}
          >
            ${item.price}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => router.push(`/jobs/${item.id}`)}
      >
        <Text style={styles.buttonText}>Show Bids</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

// Job Details Screen to show bids for a specific job

export default JobList;
