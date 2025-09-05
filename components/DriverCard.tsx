import { useTheme } from "@/constants/theme";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function DriverCard() {
  const { styles, colors } = useTheme();
  return (
    <View
      style={[
        styles.card,
        localStyles.driverCard,
        {
          backgroundColor: colors.background,
          borderColor: colors.text,
          borderWidth: 1,
        },
      ]}
    >
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/001/234/721/non_2x/portrait-of-a-young-black-man-vector.jpg",
        }}
        style={localStyles.driverImage}
      />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.subtitle}>John Doe</Text>
        <Text style={styles.body}>📞 +251 911 234 567</Text>
      </View>
    </View>
  );
}

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
