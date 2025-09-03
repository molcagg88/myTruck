import { useTheme } from "@/constants/theme";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL_PHONE = "192.168.1.3:8000";
const API_URL_LOCAL = "localhost:8000";

const { styles, colors } = useTheme();

export default function PhoneInputScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 9) {
      Alert.alert("Invalid phone number", "Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://${API_URL_PHONE}/send-otp`, {
        phone: phone,
      });

      alert("short code sent");
      router.push(`/otp?phone=${encodeURIComponent(phone)}`); // Navigate to OTP screen with phone
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitle}>Enter your phone number:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. +251912345678"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSendOtp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Sending..." : "Send OTP"}{" "}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
