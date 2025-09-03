import { useTheme } from "@/constants/theme";
import { Storage } from "@/services/SecureStore";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL_PHONE = "192.168.1.3:8000";
const API_URL_LOCAL = "localhost:8000";

export default function signin() {
  const { styles, colors } = useTheme();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const router = useRouter();

  async function handleSignin() {
    setLoading(true);
    try {
      const response = await axios.post(`http://${API_URL_PHONE}/signin`, {
        phone: phone,
        pin: pin,
      });
      if (response.data.success) {
        const token = response.data.token;
        Storage.save("token", token);
        router.replace(`/?token=${token}`);
      } else {
        setLoading(false);
        Alert.alert("Sign-in failed, please try again.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setLoading(false);
          Alert.alert("Wrong password, please try again.");
        } else {
          setLoading(false);
          Alert.alert("Sign-in failed, please try again.");
        }
      } else {
        setLoading(false);
        Alert.alert("Sign-in failed, please try again.");
      }
    }

    return;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitle}>Sign-in</Text>
      <TextInput
        style={styles.input}
        inputMode="numeric"
        placeholder={"Phone number"}
        value={phone}
        onChangeText={setPhone}
        maxLength={12}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder={"PIN"}
        value={pin}
        onChangeText={setPin}
        maxLength={4}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Sending..." : "Send OTP"}{" "}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
