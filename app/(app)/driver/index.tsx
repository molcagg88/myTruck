import { AuthContext } from "@/app/hooks/AuthContext";
import JobCardDriver from "@/components/JobCardDriver";
import { Tablet } from "@/components/Tablet";
import { JobType, MockData } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { FlatList, Text, View } from "react-native";

interface JobCardProps {
  data: JobType[];
}

type JobStatus =
  | "unassigned"
  | "assigned"
  | "pickedUp"
  | "complete"
  | "confirmed";

const data = MockData;

export default function home() {
  const { styles, colors } = useTheme();
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const renderItem = ({ item }: { item: JobType }) => (
    <JobCardDriver data={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello driver</Text>
      <Tablet text="logout" onClick={logout} type={3} size={18} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
