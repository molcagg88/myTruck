import { BidType } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "./CustomHeader";
import DriverCard from "./DriverCard";

// Job Details Screen to show bids for a specific job
interface JobDetailsProps {
  jobId: number;
  bids: BidType[];
}

export const JobDetails: React.FC<JobDetailsProps> = ({ jobId, bids }) => {
  const { styles, colors } = useTheme();
  const router = useRouter();
  const jobBids = bids.filter((bid) => bid.job_id === jobId);
  function handleAccept(item: BidType) {
    router.push(`/(app)/payment/Payment?bidId=${item.id}`);
  }
  return (
    <View style={[styles.container, { padding: 0 }]}>
      <CustomHeader forUser="customer" title={`Bids for job #${jobId}`} />

      {jobBids.length === 0 ? (
        <Text style={styles.body}>No bids yet.</Text>
      ) : (
        <FlatList
          data={jobBids}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.jobCard}>
              <DriverCard />
              <Text style={styles.body}>💰 Amount: ${item.amount}</Text>
              <Text style={styles.body}>👤 Bidder: {item.bidder_id}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  onPress={() => handleAccept(item)}
                  style={[styles.button, { flexDirection: "row" }]}
                >
                  <Ionicons name="checkmark" size={18} color={colors.primary} />

                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttonTeritary, { flexDirection: "row" }]}
                >
                  <Ionicons
                    size={18}
                    color={colors.teritary}
                    name="arrow-down"
                  />

                  <Text style={styles.buttonTeritaryText}>Lower price</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};
