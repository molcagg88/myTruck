import CustomHeader from "@/components/CustomHeader";
import JobCardDriver from "@/components/JobCardDriver";
import { MockData } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";

const JobDetailsScreen = () => {
  const { styles, colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  //Simulating data query
  const item = MockData.filter((job) => job.id == id)[0];
  const [bidAmount, setBidAmount] = useState(item.price.toString());

  function handleAmountInput(
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    const newAmount = e.nativeEvent.text;
    setBidAmount(newAmount);
  }
  function handleAfterApply() {
    router.replace("/(app)/driver");
  }
  return (
    <View style={styles.container}>
      <CustomHeader forUser="driver" title="Apply" />

      <JobCardDriver data={item} applyPage={true} />
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.body, { flex: 1 }]}>Your bid:</Text>
          <TextInput
            style={[styles.input, { flex: 1, borderWidth: 3 }]}
            value={bidAmount}
            keyboardType="number-pad"
            onChange={handleAmountInput}
            maxLength={7}
          />
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.button, { minWidth: 200, alignSelf: "center" }]}
        >
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} transparent={true}>
        <Pressable
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onPress={handleAfterApply}
        >
          <View style={styles.card}>
            <View style={{ alignItems: "center", padding: 25 }}>
              <Ionicons name="checkmark" size={100} color={colors.primary} />
              <Text style={styles.subtitle}>Successfully applied</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleAfterApply}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default JobDetailsScreen;
