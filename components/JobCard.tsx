import { bids } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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

interface BidType {
  job_id: string | number;
  amount: string | number;
  bidder_id: string | number;
}

interface JobCardProps {
  data: JobType;
}

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DeliveryProgress from "./DeliveryProgress";
import DriverCard from "./DriverCard";
import { Tablet } from "./Tablet";

const JobCard: React.FC<JobCardProps> = ({ data }) => {
  const { styles, colors } = useTheme();
  const router = useRouter();

  const CardUnassigned = ({ item }: { item: JobType }) => (
    <View style={styles.jobCard}>
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
        {/*Status*/}
        <View style={{ flexDirection: "row", marginBottom: 6 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="time"
              size={16}
              color={colors.text}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.body, { marginLeft: 4 }]}>Status:</Text>
          </View>
          <Text
            style={[
              styles.body,
              { flex: 1, fontWeight: "700", color: colors.primary },
            ]}
          >
            Waiting for driver offers
          </Text>
        </View>
      </View>
      {bids.filter((bid) => bid.job_id == item.id) && (
        <TouchableOpacity
          style={[styles.button, { marginTop: 10 }]}
          onPress={() => router.push(`/jobs/${item.id}`)}
        >
          <Text style={styles.buttonText}>
            Show Bids{" "}
            <Tablet
              text={`${bids
                .filter((bid) => bid.job_id == item.id)
                .length.toString()}`}
              type={2}
              size={10}
              circle={true}
            />
          </Text>
          {/* Show status*/}
          {/* Confirm as complete*/}
          {/* Show details*/}
        </TouchableOpacity>
      )}
    </View>
  );

  const CardAssigned = ({ item }: { item: JobType }) => (
    <View style={styles.jobCard}>
      <Text
        style={[
          styles.subtitle,
          {
            marginBottom: 10,
          },
        ]}
      >
        Order #{item.id}
        {"  "}
        {item.status == "complete" && <Tablet text="Completed" type={0} />}
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

        <DeliveryProgress
          currentStep={
            item.status == "pickedUp" || item.status == "assigned"
              ? item.status == "assigned"
                ? 0
                : 1
              : 2
          }
        />
        {item.status == "assigned" && (
          <Text style={styles.infoText}>
            A driver has been assigned and is on the way to pick-up
          </Text>
        )}
        {/* Assigned driver*/}
        <View style={{ flexDirection: "row", marginVertical: 6 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.body, { marginLeft: 4 }]}>
              Assigned driver:
            </Text>
          </View>
        </View>
        <DriverCard />
      </View>

      {item.status == "complete" && (
        <>
          <Text style={styles.infoText}>
            Click below to see picture of the delivered package and confirm the
            success of the delivery
          </Text>
          <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
            onPress={() => router.push(`/jobs/${item.id}`)}
          >
            <Text style={styles.buttonText}>Confirm delivery</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Show status*/}
      {/* Confirm as complete*/}
      {/* Show details*/}
    </View>
  );
  const CardConfirmed = ({ item }: { item: JobType }) => (
    <View style={styles.jobCard}>
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
            <Text style={[styles.body, { marginLeft: 4 }]}>Price paid:</Text>
          </View>
          <Text style={[styles.body, { flex: 1 }]}>${item.price}</Text>
        </View>
        {/*Status*/}
        <View style={{ flexDirection: "row", marginBottom: 6 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="time"
              size={16}
              color={colors.text}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.body, { marginLeft: 4 }]}>Completed at:</Text>
          </View>
          <Text style={styles.body}>9:22 PM, 12/02/2025</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 6 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="pricetag-outline"
              size={16}
              color={colors.text}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.body, { marginLeft: 4 }]}>Driver:</Text>
          </View>
        </View>
        <DriverCard />
      </View>

      {/* Show status*/}
      {/* Confirm as complete*/}
      {/* Show details*/}
    </View>
  );

  switch (data.status) {
    case "unassigned":
      return <CardUnassigned item={data} />;
    case "assigned":
    case "complete":
    case "pickedUp":
      return <CardAssigned item={data} />;
    case "confirmed":
      return <CardConfirmed item={data} />;
    default:
      return <CardUnassigned item={data} />;
  }
};

// Job Details Screen to show bids for a specific job

export default JobCard;
