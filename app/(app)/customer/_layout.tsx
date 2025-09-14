import { useTheme } from "@/constants/theme";
import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function AppLayout() {
  const { styles, colors } = useTheme();
  return (
    <>
      <Tabs
        screenOptions={{
          headerTitle: "Customer mode",
          tabBarActiveBackgroundColor: colors.primarySoft,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.dim,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderColor: colors.background,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="myOrders"
          options={{
            title: "My orders",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome6 name="truck-fast" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="referrals"
          options={{
            title: "Referrals",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome5 name="user-friends" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="myAccount"
          options={{
            title: "My account",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
