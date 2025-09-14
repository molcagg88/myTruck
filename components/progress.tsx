import { Tablet } from "@/components/Tablet";
import { useTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface ProgressProps {
  job_id: string;
}

export const Progress: React.FC<ProgressProps> = ({ job_id }) => {
  const { styles, colors } = useTheme();

  // Example static data (you can replace with your fetched log)
  const locationLog = [
    { location: "Dukem, Finfinne", time: "9:30 PM" },
    { location: "Bole Airport, Addis Ababa", time: "9:00 PM" },
    { location: "Dukem, Finfinne", time: "9:30 PM" },
    { location: "Bole Airport, Addis Ababa", time: "9:00 PM" },
  ];

  return (
    <View>
      {/* Location log timeline */}
      <View
        style={[
          styles.card,
          { marginTop: 30, padding: 20, alignSelf: "center", minWidth: 320 },
        ]}
      >
        <Text style={styles.subtitle}>Location log</Text>

        {locationLog.map((item, index) => (
          <View key={index} style={{ flexDirection: "row", marginTop: 0 }}>
            {/* Left column with line + icon */}
            <View style={{ alignItems: "center", width: 30 }}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={colors.primary}
              />
              {index !== locationLog.length - 1 && (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    backgroundColor: colors.primary,
                  }}
                />
              )}
            </View>

            {/* Right column with text */}
            <View style={{ flex: 1 }}>
              <Text style={styles.body}>
                {item.location}
                {"  "}
                {index == locationLog.length - 1 && (
                  <Tablet text="Pick-up" type={3} />
                )}
              </Text>

              <Text
                style={[
                  styles.body,
                  { fontSize: 12, color: colors.textSecondary },
                ]}
              >
                {item.time}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
