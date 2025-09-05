import { useTheme } from "@/constants/theme";
import { FlatList, Text, View } from "react-native";
import CustomHeader from "./CustomHeader";

// Job Details Screen to show bids for a specific job
interface JobDetailsProps {
  jobId: number;
  bids: BidType[];
}

interface BidType {
  job_id: number;
  amount: string | number;
  bidder_id: string | number;
}

export const JobDetails: React.FC<JobDetailsProps> = ({ jobId, bids }) => {
  const { styles, colors } = useTheme();

  const jobBids = bids.filter((bid) => bid.job_id === jobId);

  return (
    <View style={[styles.container, { padding: 16 }]}>
      <CustomHeader title={`Order #${jobId}`} />
      <Text style={styles.title}>Bids for Job #{jobId}</Text>
      {jobBids.length === 0 ? (
        <Text style={styles.body}>No bids yet.</Text>
      ) : (
        <FlatList
          data={jobBids}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.body}>💰 Amount: ${item.amount}</Text>
              <Text style={styles.body}>👤 Bidder: {item.bidder_id}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};
