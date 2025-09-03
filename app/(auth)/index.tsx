import { useTheme } from "@/constants/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const { styles, colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ backgroundColor: colors.primarySoft }}>
        <Text
          style={[
            styles.title,
            {
              paddingTop: 50,
              fontSize: 40,
              alignSelf: "center",
              color: colors.primary,
            },
          ]}
        >
          my truck{" "}
          <FontAwesome6 name="truck-fast" size={30} color={colors.primary} />
        </Text>

        <Image
          style={{
            alignSelf: "center",
            width: 350,
            height: 350,
            paddingBottom: 40,
            maxHeight: 350,
          }}
          source={require("../../assets/images/truck.png")}
          resizeMode="cover"
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.buttonText}>Create an account</Text>
        </TouchableOpacity>
        <Text style={[styles.body, { alignSelf: "center" }]}>or</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/signin")}
        >
          <Text style={styles.buttonText}>Sign-in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
