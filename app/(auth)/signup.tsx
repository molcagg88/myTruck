import CustomHeader from "@/components/CustomHeader";
import { useTheme } from "@/constants/theme";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;

const { styles, colors } = useTheme();

export default function PhoneInputScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectModal, setRedirectModal] = useState(false);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 9) {
      Alert.alert("Invalid phone number", "Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    try {
      console.log(BASE_URL);
      const response = await axios.post(`${BASE_URL}/auth/send-otp`, {
        phone: phone,
      });

      console.log(response.data);

      if (response.data.internal == 102) {
        setRedirectModal(true);
        return;
      }
      if (response.data.success != true) {
        alert("Failed to send OTP. Try again.");
        return;
      }
      console.log("short code sent");
      router.push(`/otp?phone=${encodeURIComponent(phone)}`); // Navigate to OTP screen with phone
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Sign-up" backTo={"/(auth)"} />
      <Text style={styles.subtitle}>Enter your phone number:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. +251912345678"
        maxLength={12}
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
      <Modal visible={redirectModal} transparent={true}>
        <Pressable
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onPress={() => setRedirectModal(false)}
        >
          <View style={[styles.jobCard, { padding: 25 }]}>
            <Text style={styles.subtitle}>Error</Text>
            <Text style={styles.body}>
              Phone number is associated with an existing account. Would you
              like to sign-in?
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                router.push(`/(auth)/signin?phoneRedirect=${phone}`);
                setRedirectModal(false);
              }}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
