import CustomHeader from "@/components/CustomHeader";
import JobCardPayment from "@/components/JobCardPayment";
import { bids, BidType, MockData } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { toNumber } from "lodash";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface PaymentProps {
  item: BidType;
}

export default function Payment() {
  const { styles, colors } = useTheme();
  const { bidId } = useLocalSearchParams();
  const router = useRouter();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <CustomHeader backTo={() => router.back()} title="Payment" />
        </View>
        <JobCardPayment
          data={
            MockData.filter(
              (job) => job.id == bids.filter((bid) => bid.id == bidId)[0].job_id
            )[0]
          }
        />
        <View style={styles.jobCard}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          ></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              <Text style={[styles.body, { fontWeight: 600 }]}>
                Amount agreed upon:
              </Text>
            </View>
            <View>
              <Text style={[styles.body, { fontWeight: 600 }]}>
                {toNumber(bids.filter((bid) => bid.id == bidId)[0].amount)}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              <Text style={[styles.body, { fontWeight: 600 }]}>
                Servce fee:
              </Text>
            </View>
            <View>
              <Text style={[styles.body, { fontWeight: 600 }]}>
                {Math.round(
                  toNumber(bids.filter((bid) => bid.id == bidId)[0].amount) *
                    0.035 *
                    100
                ) / 100}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              <Text style={[styles.body, { fontWeight: 600 }]}>
                Total payment :
              </Text>
            </View>
            <View>
              <Text style={[styles.body, { fontWeight: 600 }]}>
                {toNumber(bids.filter((bid) => bid.id == bidId)[0].amount) *
                  1.035}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/(app)/payment/paymentCheck")}
          style={[styles.button, { maxWidth: 200, alignSelf: "center" }]}
        >
          <Text style={styles.buttonText}>Proceed to payment</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
