import AccountTypeSelector from "@/components/AccountTypeSelector";
import CustomHeader from "@/components/CustomHeader";
import { UserType } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import { Storage } from "@/services/SecureStore";
import axios from "axios";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL_LOCAL = "localhost:8000";
const API_URL_PHONE = "192.168.1.3:8000";

export default function Details() {
  const { styles, colors } = useTheme();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const [accountType, setAccountType] = useState<UserType | null>(null);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pin, setPin] = useState("");
  const [conPin, setConpin] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrormessage] = useState("");
  const [plateNo, setPlateNo] = useState<string | undefined>();
  const [isFnameValid, setFnameValid] = useState(true);
  const [islnameValid, setlnameValid] = useState(true);
  const [isPinValid, setPinValid] = useState(true);

  const [modalVis, setModalVis] = useState(false);

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

  function checkFields() {
    if (fname == "" || lname == "") {
      return;
    }
  }
  return (
    <SafeAreaView style={[styles.container, { gap: 18 }]}>
      <CustomHeader backTo={"/"} back={false} title="Complete your account" />
      <AccountTypeSelector
        selected={accountType}
        onSelect={(item) => setAccountType(item)}
      />
      <TextInput
        value={fname}
        onChangeText={setFname}
        label={"First name"}
        mode="outlined"
        outlineColor={colors.primarySoft}
        activeOutlineColor={colors.primary}
      />
      <HelperText type="error" visible={!isPinValid}>
        Name fields cannot be empty
      </HelperText>
      <TextInput
        label={"Last name"}
        mode="outlined"
        outlineColor={colors.primarySoft}
        activeOutlineColor={colors.primary}
        value={lname}
        onChangeText={setLname}
      />
      <TextInput
        label={"Phone number"}
        mode="outlined"
        outlineColor={colors.primary}
        editable={false}
        value={params.get("phone") ?? "+251*********"}
      />
      <TextInput
        label={"PIN (4-digits)"}
        mode="outlined"
        outlineColor={colors.primarySoft}
        activeOutlineColor={colors.primary}
        maxLength={4}
        value={pin}
        onChangeText={setPin}
      />
      <TextInput
        label={"Repeat pin"}
        mode="outlined"
        outlineColor={colors.primarySoft}
        activeOutlineColor={colors.primary}
        value={conPin}
        onChangeText={setConpin}
      />
      {accountType == UserType.driver && (
        <TextInput
          label={"Plate number"}
          mode="outlined"
          outlineColor={colors.primarySoft}
          activeOutlineColor={colors.primary}
          maxLength={6}
          value={plateNo}
          onChangeText={setPlateNo}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={() => setModalVis(true)}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {error && <Text>{errorMessage}</Text>}
      <Modal visible={modalVis} transparent={true}>
        <Pressable
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onPress={() => setModalVis(false)}
        >
          <View style={[styles.jobCard, { minWidth: 300 }]}>
            <Text style={styles.subtitle}>Is this correct?</Text>
            <Text style={styles.body}>Account type: {accountType}</Text>
            <Text style={styles.body}>pin: {pin}</Text>
            {accountType == UserType.driver && (
              <Text style={styles.body}>Plate number: {plateNo}</Text>
            )}
            <TouchableOpacity
              onPress={() => handleDetails}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVis(false)}
              style={styles.buttonSecondary}
            >
              <Text style={styles.buttonSecondaryText}>No</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
