import { useTheme } from "@/constants/theme";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function AddCheckpoint() {
  const { styles, colors } = useTheme();
  const [location, setLocation] = useState("");
  return (
    <View style={[styles.jobCard, { minWidth: 320, shadowOpacity: 0 }]}>
      <Text style={styles.subtitle}>Add checkpoint</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g UNISA, Gelan"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity
        onPress={() =>
          Toast.show({
            type: "success",
            text1: "Checkpoint added",
            text2: "Don't forget to add more checkpoints every 6 hours",
          })
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}
