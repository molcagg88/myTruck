import { useTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const ReviewDriver = ({
  onSubmit,
}: {
  onSubmit?: (rating: number, review: string) => void;
}) => {
  const { styles, colors } = useTheme();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handlePress = (value: number) => {
    setRating(value);
  };

  return (
    <View style={[styles.jobCard, { marginTop: 16 }]}>
      <Text style={styles.subtitle}>Rate Your Driver</Text>

      {/* Star Rating */}
      <View
        style={{ flexDirection: "row", alignSelf: "center", marginVertical: 8 }}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handlePress(star)}>
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={28}
              color={colors.teritary}
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Text Input */}
      <TextInput
        style={[styles.input, { minHeight: 80, textAlignVertical: "top" }]}
        placeholder="Write your review..."
        placeholderTextColor={colors.dim}
        multiline
        value={review}
        onChangeText={setReview}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSubmit && onSubmit(rating, review)}
      >
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};
