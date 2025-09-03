import { useTheme } from "@/constants/theme";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL_PHONE = "192.168.1.4:8000";
const API_URL_LOCAL = "localhost:8000";

export default function OtpScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>(); // Access phone number from search params
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrormessage] = useState("");
  const { styles, colors } = useTheme();
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "OTP must be 6 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`http://${API_URL_PHONE}/verify-otp`, {
        phone: phone,
        otp: otp,
      });

      console.log(response.data);

      if (response.data == 102) {
        Alert.alert("Error", "Short code was not sent. Try again");
        router.replace("/signup");
      }
      if (response.data == 103) {
        Alert.alert("Error", "Short code is expired. Try again");
        router.replace("/signup");
      }

      if (response.data.status == 400) {
        setLoading(false);
        // Alert.alert("OTP incorrect");
        setError(true);
        setErrormessage("OTP is incorrect");
      }

      if (response.data.verified) {
        Alert.alert("Success", "Phone number verified!");
        router.replace(`/details?phone=${phone}`);
      } else {
        Alert.alert("Error", "Invalid OTP. Try again.");
      }
    } catch (error) {
      console.error(error);

      Alert.alert("Error", "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.body}>Enter the OTP sent to {phone}:</Text>
      <TextInput
        style={styles.input}
        placeholder="6-digit OTP"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
      />
      <Button
        title={loading ? "Verifying..." : "Verify OTP"}
        onPress={handleVerifyOtp}
        disabled={loading}
      />
      {error && (
        <Text
          style={{
            color: "#eb4646ff",
            marginVertical: 10,
            alignSelf: "center",
          }}
        >
          {errorMessage}
        </Text>
      )}
    </SafeAreaView>
  );
}
