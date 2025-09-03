import { useTheme } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
const { styles, colors } = useTheme();

interface AccountTypeSelectorProps {
  selected: string | null;
  onSelect: (item: string) => void;
}

const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({
  selected,
  onSelect,
}) => {
  const data = ["Customer", "Driver"];

  return (
    <View>
      <SelectDropdown
        data={data}
        onSelect={(item) => onSelect(item)}
        dropdownStyle={{ backgroundColor: colors.inputBackground }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styling.button}>
              <Text style={styling.buttonText}>
                {selectedItem ?? (
                  <>
                    <Text style={styling.icon}>▼ </Text>
                    <Text>Select Account Type</Text>
                  </>
                )}
              </Text>
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={[styling.item, isSelected && styling.selectedItem]}>
              <Text style={styling.itemText}>{item}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styling = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: colors.inputBackground,
    borderRadius: 4,
    marginBottom: 20,
  },
  icon: { fontSize: 10 },
  buttonText: { color: colors.text },
  item: { padding: 10 },
  selectedItem: { backgroundColor: colors.text },
  itemText: { color: colors.text },
});

export default AccountTypeSelector;
