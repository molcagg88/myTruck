import { UserType } from "@/constants/data";
import { useTheme } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
const { styles, colors } = useTheme();

interface AccountTypeSelectorProps {
  selected: UserType | null;
  onSelect: (item: UserType) => void;
}

const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({
  selected,
  onSelect,
}) => {
  const data = [UserType.customer, UserType.driver];
  const { styles, colors } = useTheme();

  return (
    <View>
      <SelectDropdown
        data={data}
        onSelect={(item) => onSelect(item)}
        dropdownStyle={{ backgroundColor: colors.inputBackground }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View
              style={[styling.button, selectedItem && styling.selectedButton]}
            >
              <Text
                style={
                  selectedItem
                    ? [
                        styling.buttonText,
                        { color: colors.primary, fontWeight: 500 },
                      ]
                    : styling.buttonText
                }
              >
                <Text style={styling.icon}>▼ </Text>
                {selectedItem ?? (
                  <>
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
    borderWidth: 1,
    borderColor: colors.primarySoft,
    marginBottom: 20,
  },
  icon: { fontSize: 10 },
  buttonText: { color: colors.text },
  selectedButton: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  item: { padding: 10 },
  selectedItem: { backgroundColor: colors.primarySoft },
  itemText: { color: colors.text },
});

export default AccountTypeSelector;
