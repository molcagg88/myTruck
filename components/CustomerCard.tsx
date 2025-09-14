import { User } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { toArray } from "lodash";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface CustomerCardProps {
  item: User;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ item }) => {
  const { styles, colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        localStyles.customerCard,
        {
          backgroundColor: colors.layerBackground,
          padding: 10,

          borderColor: colors.text,
          borderWidth: 0,
          marginLeft: -10,
          height: 80,
        },
      ]}
    >
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/001/234/721/non_2x/portrait-of-a-young-black-man-vector.jpg",
        }}
        style={localStyles.customerImage}
      />
      <View
        style={{
          marginLeft: 15,
          marginTop: 12,
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Text style={[styles.subtitle, { marginBottom: -3 }]}>
          {item.fname} {toArray(item.lname)[0]}.
        </Text>
        <Text style={styles.body}>
          <Ionicons name="star" />
          <Ionicons name="star" />
          <Ionicons name="star" />
        </Text>
      </View>
    </View>
  );
};
export default CustomerCard;
const localStyles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 12,
    height: 120,
  },
  customerCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  customerImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
});
