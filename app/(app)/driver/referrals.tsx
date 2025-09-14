import CustomerCard from "@/components/CustomerCard";
import CustomHeader from "@/components/CustomHeader";
import { MockUsers, Users } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const referralCode: string = "2C564S";

const referredUsers: Users = MockUsers;
const activeCount: number = referredUsers.length;
const totalCount: number = referredUsers.length;
export default function ReferralsPage() {
  const { styles, colors } = useTheme();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referralCode);
    Toast.show({ type: "success", text1: "Copied" });
  };

  return (
    <View style={styles.container}>
      <CustomHeader back={false} backTo={"/"} title={"Referrals"} />

      <View style={{ flex: 1, marginTop: 16 }}>
        {referredUsers.length === 0 ? (
          <Text style={styles.body}>You haven’t referred anyone yet.</Text>
        ) : (
          <FlatList
            ListHeaderComponent={
              <>
                <View style={styles.card}>
                  <Text style={styles.subtitle}>Your Referral Code</Text>
                  <Text
                    style={[
                      styles.body,
                      { marginVertical: 8, fontSize: 18, fontWeight: "600" },
                    ]}
                  >
                    {referralCode}
                  </Text>
                  <Text style={styles.body}>
                    Share this code with friends to get rewards!
                  </Text>
                  <TouchableOpacity
                    style={[styles.button, { marginTop: 10 }]}
                    onPress={copyToClipboard}
                  >
                    <Text style={styles.buttonText}>Copy Code</Text>
                  </TouchableOpacity>
                </View>
                {/* Referral Counts */}
                <View
                  style={[
                    styles.card,
                    { flexDirection: "row", justifyContent: "space-between" },
                  ]}
                >
                  <View>
                    <Text style={styles.body}>Active Referrals</Text>
                    <Text style={[styles.subtitle, { textAlign: "center" }]}>
                      {activeCount}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.body}>Total Referrals</Text>
                    <Text style={[styles.subtitle, { textAlign: "center" }]}>
                      {totalCount}
                    </Text>
                  </View>
                </View>
                <Text style={styles.subtitle}>Users You Referred</Text>
              </>
            }
            data={referredUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CustomerCard item={item} />}
          />
        )}
      </View>
    </View>
  );
}
