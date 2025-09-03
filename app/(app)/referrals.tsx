import ToastComponent from "@/components/ToastMessage";
import { useTheme } from "@/constants/theme";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface ReferredUser {
  id: string | number;
  name: string;
}
const referralCode: string = "2C564S";
const activeCount: number = 0;
const totalCount: number = 0;
const referredUsers: ReferredUser[] = [];

export default function ReferralsPage() {
  const { styles, colors } = useTheme();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referralCode);
    <ToastComponent message="Copied" />;
  };

  return (
    <View style={styles.container}>
      {/* Referral Code Card */}
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

      {/* Referred Users List */}
      <View style={{ marginTop: 16 }}>
        <Text style={styles.subtitle}>Users You Referred</Text>
        {referredUsers.length === 0 ? (
          <Text style={styles.body}>You haven’t referred anyone yet.</Text>
        ) : (
          <FlatList
            data={referredUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.card, { marginVertical: 4 }]}>
                <Text style={styles.body}>👤 {item.name}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
