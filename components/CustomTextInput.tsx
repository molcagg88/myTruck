import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

// Define the props for our custom component.
// We're extending TextInputProps to include all standard TextInput props
// while also adding our specific props like onValueChange.
interface CustomTextInputProps extends TextInputProps {
  onValueChange?: (value: string) => void;
}

// Use React.FC to type the functional component.
const CustomTextInput: React.FC<CustomTextInputProps> = ({
  onValueChange,
  ...props
}) => {
  const [value, setValue] = useState<string>("");

  const handleChangeText = (text: string) => {
    setValue(text);
    // Call the optional onValueChange prop if it's provided.
    if (onValueChange) {
      onValueChange(text);
    }
  };

  return (
    <TextInput
      style={styles.input}
      onChangeText={handleChangeText}
      value={value}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
});

export default CustomTextInput;
