import { ReviewDriver } from "@/components/ReviewDriver";
import { useTheme } from "@/constants/theme";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Reusable Review Component

// Main Component
const RideDetails = () => {
  const { styles } = useTheme();

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.container}>
        {/* Picture */}
        <Image
          source={{
            uri: "https://s.abcnews.com/images/International/cocaine-uruguay-gty-aa-191228_hpMain_16x9_992.jpg",
          }}
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
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/001/234/721/non_2x/portrait-of-a-young-black-man-vector.jpg",
            }}
            style={localStyles.driverImage}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.subtitle}>Johnny Doe</Text>
            <Text style={styles.body}>📞 +251 911 234 567</Text>
          </View>
        </View>
        <TextInput />
        {/* Review Driver */}
        <ReviewDriver
          onSubmit={(rating, review) => console.log(rating, review)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 12,
    height: 200,
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
