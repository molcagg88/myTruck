import AccountTypeSelector from "@/components/AccountTypeSelector";
import CustomHeader from "@/components/CustomHeader";
import { UserType } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import { Storage } from "@/services/SecureStore";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router/build/hooks";
import { jwtDecode } from "jwt-decode";
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

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;

export default function Details() {
  const { styles, colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState<UserType | null>(null);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pin, setPin] = useState("");
  const [conPin, setConpin] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrormessage] = useState("");
  const [plateNo, setPlateNo] = useState<string | undefined>("");
  const [isFnameValid, setFnameValid] = useState(true);
  const [islnameValid, setlnameValid] = useState(true);
  const [isPinValid, setPinValid] = useState(true);

  const [modalVis, setModalVis] = useState(false);

  const data = ["customer", "driver"];

  const router = useRouter();

  async function handleDetails() {
    setLoading(true);

    if (conPin !== pin) {
      setLoading(false);
      setError(true);
      setErrormessage("PINs must match!");
      setModalVis(false);
      return;
    }

    try {
      console.log({
        type: accountType,
        fname: fname,
        lname: lname,
        pin: pin,
      });

      // The hardcoded token is kept as requested.
      const tempToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMjUxNTU1NTU1NTU1IiwiZXhwIjoxNzU4MDc2OTEyLjAzNDU3Mn0.IoxisOPPgseBrPXZNhIlk_PkvUUjsSp1n1T5SnoWiTc";

      const response = await axios.post(
        `${BASE_URL}/auth/setdetails`,
        {
          type: accountType,
          fname: fname,
          lname: lname,
          pin: pin,
          plate_no: accountType == "driver" ? plateNo : null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        await Storage.deleteValue("tempToken");
        await Storage.save("token", response.data.token);

        const type = jwtDecode(response.data.token);
        console.log(type);
        // router.replace(
        //   `/(app)/${type.startsWith("c") ? "driver" : "customer"}?token=${
        //     response.data.token
        //   }&toast=Account created successfully`
        // );
      }
    } catch (error: any) {
      console.log(`error: ${error}`);
      setError(true);
      alert(error);
      setErrormessage(error);
      return;
    }
  }

  function checkFields() {
    let isValid = true;
    setErrormessage("");

    if (!accountType) {
      setErrormessage("Please select an account type.");
      isValid = false;
    } else if (fname.trim().length < 2) {
      setFnameValid(false);
      setErrormessage("First name must be at least 2 characters.");
      isValid = false;
    } else {
      setFnameValid(true);
    }

    if (lname.trim().length < 2) {
      setlnameValid(false);
      if (isValid) setErrormessage("Last name must be at least 2 characters.");
      isValid = false;
    } else {
      setlnameValid(true);
    }

    if (pin.length !== 4 || isNaN(Number(pin))) {
      setPinValid(false);
      if (isValid) setErrormessage("PIN must be a 4-digit number.");
      isValid = false;
    } else {
      setPinValid(true);
    }

    if (
      accountType === UserType.driver &&
      (!plateNo || plateNo.trim() === "")
    ) {
      // You can add more specific validation for plate numbers if needed
      if (isValid) setErrormessage("Please enter your plate number.");
      isValid = false;
    }

    if (isValid) {
      setModalVis(true);
    } else {
      setError(true);
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
        error={!isFnameValid}
      />
      <HelperText type="error" visible={!isFnameValid}>
        First name must be at least 2 characters.
      </HelperText>
      <TextInput
        label={"Last name"}
        mode="outlined"
        outlineColor={colors.primarySoft}
        activeOutlineColor={colors.primary}
        value={lname}
        onChangeText={setLname}
        error={!islnameValid}
      />
      <HelperText type="error" visible={!islnameValid}>
        Last name must be at least 2 characters.
      </HelperText>

      <TextInput
        label={"PIN (4-digits)"}
        mode="outlined"
        outlineColor={colors.primarySoft}
        activeOutlineColor={colors.primary}
        maxLength={4}
        value={pin}
        onChangeText={(text) => setPin(text.replace(/[^0-9]/g, ""))} // only allow numbers
        keyboardType="numeric"
        error={!isPinValid}
      />
      <HelperText type="error" visible={!isPinValid}>
        PIN must be a 4-digit number.
      </HelperText>
      <TextInput
        label={"Repeat pin"}
        mode="outlined"
        outlineColor={colors.primarySoft}
        activeOutlineColor={colors.primary}
        value={conPin}
        onChangeText={(text) => setConpin(text.replace(/[^0-9]/g, ""))} // only allow numbers
        keyboardType="numeric"
        error={error && errorMessage === "PINs must match!"}
      />

      {accountType === UserType.driver && (
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
        onPress={checkFields}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {error && <Text style={{ color: colors.secondary }}>{errorMessage}</Text>}
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
            <Text style={styles.body}>First Name: {fname}</Text>
            <Text style={styles.body}>Last Name: {lname}</Text>
            <Text style={styles.body}>PIN: {pin}</Text>
            {accountType === UserType.driver && (
              <Text style={styles.body}>Plate number: {plateNo}</Text>
            )}
            <TouchableOpacity onPress={handleDetails} style={styles.button}>
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
