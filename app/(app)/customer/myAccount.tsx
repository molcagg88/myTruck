import { useTheme } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const name: string = "Esrom";
const phone: string = "+251987654321";
const profilePic: string | null = null;
const verified: boolean = false;
function onChangePIN() {}
function onDeactivate() {}

function MyAccountPage() {
  const { styles, colors } = useTheme();

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {/* User Info Card */}
      <View style={[styles.card, { alignItems: "center", padding: 20 }]}>
        <Image
          source={
            profilePic
              ? { uri: profilePic }
              : require("@/assets/images/truck.png")
          }
          style={{
            width: 120,
            height: 120,
            borderRadius: 50,
            marginBottom: 16,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Text style={[styles.subtitle, { fontSize: 20 }]}>{name}</Text>
          {verified && (
            <MaterialIcons
              name="verified"
              size={20}
              color={colors.primary}
              style={{ marginLeft: 6 }}
            />
          )}
        </View>

        <Text style={styles.body}>{phone}</Text>

        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={onChangePIN}
        >
          <Text style={styles.buttonText}>Change PIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonSecondary, { marginTop: 12 }]}
          onPress={onDeactivate}
        >
          <Text style={styles.buttonSecondaryText}>Deactivate Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MyAccountPage;
