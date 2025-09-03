import { useTheme } from "@/constants/theme";
import React from "react";
import { Text, View } from "react-native";
interface TabletProps {
  type: number;
  text: string;
}

export const Tablet: React.FC<TabletProps> = ({ type, text }) => {
  const { styles, colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor:
          type === 1 || type == 2
            ? type == 1
              ? colors.primarySoft
              : colors.secondarySoft
            : colors.teritarySoft,
        borderWidth: 1,
        borderRadius: 17,
        borderColor:
          type === 1 || type == 2
            ? type == 1
              ? colors.primary
              : colors.secondary
            : colors.teritary,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        paddingVertical: 3,
        alignSelf: "flex-start",
      }}
    >
      <Text
        style={[
          type === 1 || type == 2
            ? type == 1
              ? styles.buttonText
              : styles.buttonSecondaryText
            : styles.buttonTeritaryText,
          { fontSize: 12 },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};
