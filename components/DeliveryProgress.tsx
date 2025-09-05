// DeliveryProgress.tsx
import { useTheme } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Step = {
  key: string;
  label: string;
};

type Props = {
  currentStep: number; // 0 = Pick-up, 1 = In-transit, 2 = Delivered
};

const DeliveryProgress: React.FC<Props> = ({ currentStep }) => {
  const { colors } = useTheme();

  const steps: Step[] = [
    { key: "pickup", label: "Pick-up" },
    { key: "intransit", label: "In-transit" },
    { key: "delivered", label: "Delivered (waiting for confirmation)" },
  ];

  return (
    <View style={styles.wrapper}>
      {/* Circles + connecting line */}
      <View style={styles.progressRow}>
        {steps.map((_, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <React.Fragment key={index}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: isCompleted
                      ? colors.primary
                      : isActive
                      ? colors.teritarySoft
                      : colors.background,
                    borderColor: isActive ? colors.primary : colors.dim,
                  },
                ]}
              />
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor:
                        index < currentStep
                          ? colors.primary
                          : colors.teritarySoft,
                    },
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* Labels row */}
      <View style={styles.labelRow}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <Text
              key={step.key}
              style={[
                styles.label,
                {
                  color: isCompleted
                    ? colors.primary
                    : isActive
                    ? colors.teritary
                    : colors.dim,
                },
              ]}
            >
              {step.label}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 20,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    zIndex: 1,
  },
  line: {
    flex: 1,
    height: 2,
    marginHorizontal: -2,
    zIndex: 0,
  },
  labelRow: {
    flexDirection: "row",

    justifyContent: "space-between",
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    textAlign: "center",
    flex: 1,
  },
});

export default DeliveryProgress;
