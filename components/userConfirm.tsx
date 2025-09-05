import DriverCard from "@/components/DriverCard";
import { ReviewDriver } from "@/components/ReviewDriver";
import { useTheme } from "@/constants/theme";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Reusable Review Component

// Main Component
const UserConfirm = () => {
  const { styles } = useTheme();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styling.inner}>
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
          <DriverCard />

          {/* Review Driver */}
          <ReviewDriver
            onSubmit={(rating, review) => console.log(rating, review)}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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

const styling = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default UserConfirm;
