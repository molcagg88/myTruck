import LoadForm from "@/components/LoadForm";
import { Tablet } from "@/components/Tablet";
import ToastComponent from "@/components/ToastMessage";
import { useTheme } from "@/constants/theme";
import { Storage } from "@/services/SecureStore";
import {
  useLocalSearchParams,
  useRouter,
  useSearchParams,
} from "expo-router/build/hooks";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

interface TokenPayload {
  type: "customer" | "driver";
  active: boolean;
  fname: string;
  lname: string;
  phone: string;
}

type HomeSearchParams = {
  token: string;
};

export default function home() {
  const params = useSearchParams();
  const { token } = useLocalSearchParams<HomeSearchParams>();
  const { styles, colors } = useTheme();
  const toast = params.get("toast") ?? null;
  const router = useRouter();
  function handleLogout() {
    Storage.deleteValue("token");
    router.replace("/(auth)");
  }

  if (token != "") {
    console.log(token);
    // const user = jwtDecode(token);
    // console.log(user);
  }

  return (
    <ScrollView style={styles.container}>
      {toast != null && <ToastComponent message={toast} />}
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={handleLogout}
      >
        <Tablet text="logout" type={3} size={18} />
      </TouchableOpacity>
      <Text style={[styles.title, { fontSize: 30, fontWeight: "400" }]}>
        Hello
        {/* {user.fname} */}
      </Text>
      <LoadForm />
    </ScrollView>
  );
}
