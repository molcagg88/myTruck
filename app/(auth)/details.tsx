import AccountTypeSelector from "@/components/AccountTypeSelector";
import { useTheme } from "@/constants/theme";
import { Storage } from "@/services/SecureStore";
import axios from "axios";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL_LOCAL = "localhost:8000";
const API_URL_PHONE = "192.168.1.3:8000";

export default function Details() {
  const { styles, colors } = useTheme();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const [accountType, setAccountType] = useState<string | null>(null);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pin, setPin] = useState("");
  const [conPin, setConpin] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrormessage] = useState("");

  const data = ["Customer", "Driver"];

  const router = useRouter();

  async function handleDetails() {
    setLoading(true);
    if (conPin != pin) {
      setLoading(false);
      setError(true);
      setErrormessage("Passwords must match!");
    }
    try {
      console.log({
        type: accountType,
        fname: fname,
        lname: lname,
        phone: params.get("phone") ?? "",
        pin: pin,
      });
      const response = await axios.post(`http://${API_URL_PHONE}/setdetails`, {
        type: accountType,
        fname: fname,
        lname: lname,
        phone: params.get("phone") ?? "",
        pin: pin,
      });
      if (response.data.success) {
        Storage.save("token", response.data.token);
        router.replace(
          `/?token=${response.data.token}&toast=Account created successfully`
        );
      }
    } catch (error: any) {
      setError(true);
      alert(error);
      setErrormessage(error);
      return;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitle}>Complete your account</Text>
      <AccountTypeSelector
        selected={accountType}
        onSelect={(item) => setAccountType(item)}
      />
      <TextInput
        style={styles.input}
        placeholder="First name"
        placeholderTextColor={colors.dim}
        value={fname}
        onChangeText={setFname}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        placeholderTextColor={colors.dim}
        value={lname}
        onChangeText={setLname}
      />
      <TextInput
        style={styles.input}
        editable={false}
        value={params.get("phone") ?? ""}
      />
      <TextInput
        style={styles.input}
        placeholder="PIN"
        value={pin}
        onChangeText={setPin}
      />
      <TextInput
        style={styles.input}
        placeholder="confirm PIN"
        value={conPin}
        onChangeText={setConpin}
      />
      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={handleDetails}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {error && <Text>{errorMessage}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
