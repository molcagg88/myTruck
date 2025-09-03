import { useTheme } from "@/constants/theme";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoadForm = () => {
  const { styles, colors } = useTheme();

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [loadSize, setLoadSize] = useState("");
  const [loadType, setLoadType] = useState("Fragile");
  const [price, setPrice] = useState("100");

  const [showTypePicker, setShowTypePicker] = useState(false);
  const [showPricePicker, setShowPricePicker] = useState(false);

  const handleSubmit = () => {
    const formData = { pickup, dropoff, loadSize, loadType, price };
    console.log("Form Data:", formData);
    // TODO: send data to backend
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.title}>Create a Load Request</Text>

      <TextInput
        style={styles.input}
        placeholder="Pickup Location"
        placeholderTextColor={colors.dim}
        value={pickup}
        onChangeText={setPickup}
      />

      <TextInput
        style={styles.input}
        placeholder="Drop-off Location"
        placeholderTextColor={colors.dim}
        value={dropoff}
        onChangeText={setDropoff}
      />

      <TextInput
        style={styles.input}
        placeholder="Load Size (kg)"
        placeholderTextColor={colors.dim}
        keyboardType="numeric"
        value={loadSize}
        onChangeText={setLoadSize}
      />

      {/* Trigger Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowTypePicker(true)}
      >
        <Text style={styles.buttonText}>Select Type of Load ({loadType})</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowPricePicker(true)}
      >
        <Text style={styles.buttonText}>Set Price (${price})</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Load Type Picker Modal */}
      <Modal visible={showTypePicker} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
            paddingBottom: 50,
          }}
        >
          <View style={[styles.card, { padding: 0 }]}>
            <Picker
              selectedValue={loadType}
              onValueChange={(itemValue) => setLoadType(itemValue)}
              dropdownIconColor={colors.text}
              style={{ color: colors.text }}
            >
              <Picker.Item label="Fragile" value="Fragile" />
              <Picker.Item label="Perishable" value="Perishable" />
              <Picker.Item label="Heavy Machinery" value="Heavy" />
              <Picker.Item label="Electronics" value="Electronics" />
              <Picker.Item label="Furniture" value="Furniture" />
            </Picker>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowTypePicker(false)}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Price Picker Modal */}
      <Modal visible={showPricePicker} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
            paddingBottom: 50,
          }}
        >
          <View style={[styles.card, { padding: 0 }]}>
            <Picker
              selectedValue={price}
              onValueChange={(itemValue) => setPrice(itemValue)}
              dropdownIconColor={colors.text}
              style={{ color: colors.text }}
            >
              <Picker.Item label="$100" value="100" />
              <Picker.Item label="$200" value="200" />
              <Picker.Item label="$500" value="500" />
              <Picker.Item label="$1000" value="1000" />
            </Picker>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowPricePicker(false)}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default LoadForm;
