import CustomHeader from "@/components/CustomHeader";
import { useTheme } from "@/constants/theme";
import { Storage } from "@/services/SecureStore";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import axios from "axios";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;

export default function signin() {
  const { styles, colors } = useTheme();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState<string | string[]>("");
  const router = useRouter();
  const { phoneRedirect } = useLocalSearchParams();
  const [userType, setUserType] = useState<"customer" | "driver">("customer");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (phoneRedirect) {
      console.log(phoneRedirect);
      setPhone(phoneRedirect);
    }
  }, []);

  const handleValueChange = (event: any) => {
    // This is the new index of the selected segment
    const newIndex = event.nativeEvent.selectedSegmentIndex;
    setSelectedIndex(newIndex);
    setUserType(selectedIndex == 0 ? "driver" : "customer");
  };

  async function handleSignin() {
    setLoading(true);
    try {
      console.log(userType, phone, pin);
      const response = await axios.post(`${BASE_URL}/auth/signin`, {
        user_type: userType,
        phone: phone,
        pin: pin,
      });
      console.log(response.data);
      if (response.data.data.success) {
        const token = response.data.token;
        Storage.save("token", token);
        router.replace(`/(app)/${userType}`);
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
      <CustomHeader title="Sign-in" backTo={"/(auth)"} />
      <SegmentedControl
        style={{
          padding: 10,
          height: 50,
          justifyContent: "center",
          marginVertical: 10,
        }}
        values={["Customer", "Driver"]}
        selectedIndex={selectedIndex}
        onChange={handleValueChange}
      />
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
