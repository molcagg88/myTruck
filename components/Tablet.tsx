import { useTheme } from "@/constants/theme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TabletProps {
  type: number;
  size?: number;
  text: string;
  circle?: boolean;
  onClick?: () => void;
}

export const Tablet: React.FC<TabletProps> = ({
  size,
  type,
  text,
  circle,
  onClick,
}) => {
  const { styles, colors } = useTheme();

  return (
    <TouchableOpacity disabled={!!!onClick} onPress={onClick}>
      <View
        style={{
          backgroundColor:
            type === 1 || type == 2
              ? type == 1
                ? colors.primarySoft
                : colors.secondarySoft
              : colors.teritarySoft,
          borderWidth: 1,

          borderRadius: circle ? "50%" : 12,
          borderColor:
            type === 1 || type == 2
              ? type == 1
                ? colors.primary
                : colors.secondary
              : colors.teritary,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: circle ? 8 : 6,
          paddingVertical: circle ? 4 : 3,
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
            { fontSize: size ? size : 12 },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
