import { useTheme } from "@/constants/theme";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Reusable Review Component
export const ReviewDriver = ({ onPress }: { onPress?: () => void }) => {
  const { styles, colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <Text style={[styles.buttonText]}>Review Driver</Text>
    </TouchableOpacity>
  );
};

// Main Component
const RideDetails = () => {
  const { styles, colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Picture */}
      <Image
        source={{ uri: "https://via.placeholder.com/400x200" }}
        style={localStyles.image}
      />

      {/* Location and Time */}
      <View style={{ marginVertical: 12 }}>
        <Text style={styles.subtitle}>Location: Bole, Addis Ababa</Text>
        <Text style={styles.body}>Time: 10:30 AM, Sept 2, 2025</Text>
      </View>

      {/* Driver Profile Card */}
      <View style={[styles.card, localStyles.driverCard]}>
        <Image
          source={{ uri: "https://via.placeholder.com/80" }}
          style={localStyles.driverImage}
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.subtitle}>John Doe</Text>
          <Text style={styles.body}>📞 +251 911 234 567</Text>
        </View>
      </View>

      {/* Review Driver */}
      <ReviewDriver onPress={() => console.log("Review driver pressed")} />
    </View>
  );
};

const localStyles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default RideDetails;
