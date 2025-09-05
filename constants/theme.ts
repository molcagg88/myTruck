// theme.ts
import { useMemo } from "react";
import { ColorSchemeName, StyleSheet, useColorScheme } from "react-native";

export type ThemeType = "light" | "dark";

const palette = {
  light: {
    background: "#FFFFFF",
    card: "#F1F3F4",
    primary: "#405a8a",
    secondary: "#7f4d6e",
    teritary: "#446155",
    accent: "#F4B400",
    text: "#202124",
    textSecondary: "rgba(57, 57, 57, 1)124",
    inputBackground: "#FFFFFF",
    buttonText: "#FFFFFF",
    backButton: "#E8EAED",
    dim: "#696969ff",
    primarySoft: "#e6f4fc",
    secondarySoft: "#fdeaf5",
    teritarySoft: "#e6f6e9",
    layerBackground: "#ffffffff",
  },
  dark: {
    background: "#202124",
    card: "#303134",
    primary: "#b5d4f0ff",
    secondary: "#d5aac4",
    teritary: "#8fc5a8",

    accent: "#FDD663",
    text: "#E8EAED",
    textSecondary: "#cdcdcdff",
    inputBackground: "#3C4043",
    buttonText: "#202124",
    backButton: "#5F6368",
    dim: "#ccccccff",
    primarySoft: "#308cfc36",
    secondarySoft: "#39162e",
    teritarySoft: "#0e2d1e",
    layerBackground: "#404040ff",
  },
};

// Core function to create styles
export function createTheme(mode: ThemeType = "light") {
  const colors = palette[mode];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "500",
      color: colors.text,
      marginBottom: 12,
    },
    body: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 22,
      marginBottom: 12,
    },
    button: {
      backgroundColor: colors.primarySoft,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 6,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    buttonSecondary: {
      backgroundColor: colors.secondarySoft,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 6,
      borderColor: colors.secondary,
      borderWidth: 1,
    },
    buttonText: { color: colors.primary, fontWeight: "600", fontSize: 16 },
    buttonSecondaryText: {
      color: colors.secondary,
      fontWeight: "600",
      fontSize: 16,
    },
    buttonTeritaryText: {
      color: colors.teritary,
      fontWeight: "600",
      fontSize: 16,
    },
    input: {
      backgroundColor: colors.inputBackground,
      color: colors.text,
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.card,
      marginBottom: 12,
      fontSize: 16,
    },
    backButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: colors.backButton,
      alignSelf: "flex-start",
      marginBottom: 16,
    },
    backButtonText: { color: colors.text, fontSize: 16, fontWeight: "600" },
    card: {
      backgroundColor: colors.primarySoft,
      padding: 20,
      borderRadius: 14,
      marginBottom: 12,
    },
    infoText: {
      backgroundColor: colors.teritarySoft,
      color: colors.teritary,
      borderRadius: 5,
      alignSelf: "center",
      padding: 10,
    },
    jobCard: {
      backgroundColor: colors.layerBackground,
      padding: 20,
      borderRadius: 14,
      marginBottom: 12,

      margin: 16,

      // iOS shadow
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0, // soft drop
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,

      // Android shadow
      elevation: 5,
    },
    spacer: { height: 12 },
  });

  return { colors, styles };
}

// **Hook to automatically detect system theme**
export function useTheme() {
  const colorScheme: ColorSchemeName = useColorScheme(); // 'light' | 'dark' | null
  const mode: ThemeType = colorScheme === "dark" ? "dark" : "light";

  // useMemo ensures styles are only recalculated if mode changes
  return useMemo(() => createTheme(mode), [mode]);
}

// Default export: light theme
export default createTheme("light");
