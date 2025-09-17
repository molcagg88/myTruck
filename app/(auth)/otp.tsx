import CustomHeader from "@/components/CustomHeader";
import { useTheme } from "@/constants/theme";
import { Storage } from "@/services/SecureStore";
import axios from "axios";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;

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
      const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
        phone: phone,
        otp: otp,
      });

      console.log(response.data);

      if (response.data.internal == 102) {
        Alert.alert("Error", "Short code was not sent. Try again");
        router.replace("/(auth)/signup");
      }
      if (response.data.internal == 103) {
        Alert.alert("Error", "Short code is expired. Try again");
        router.replace("/(auth)/signup");
      }

      if (response.data.status == 400) {
        setLoading(false);
        // Alert.alert("OTP incorrect");
        setError(true);
        setErrormessage("OTP is incorrect");
      }

      if (response.data.success) {
        console.log(response.data.data.token);
        await Storage.save("tempToken", response.data.data.token);
        Toast.show({ type: "success", text1: "Successfully verified" });
        router.replace(`/(auth)/details`);
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
    <View style={styles.container}>
      <CustomHeader title="Confirm phone number" backTo={"/(auth)/signup"} />
      <Text style={styles.body}>Enter the OTP sent to {phone}:</Text>
      <TextInput
        style={styles.input}
        placeholder="6-digit OTP"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleVerifyOtp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Text>
      </TouchableOpacity>
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
    </View>
  );
}
