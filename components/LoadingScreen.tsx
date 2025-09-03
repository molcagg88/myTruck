// components/LoadingScreen.tsx
import { useTheme } from "@/constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type LoadingScreenProps = {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  accentColor?: string;
  icon?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
};

export default function LoadingScreen({
  title = "Loading",
  subtitle,
  backgroundColor = "#0f1724",
  accentColor = "#38bdf8",
  icon,
  containerStyle,
  titleStyle,
  subtitleStyle,
}: LoadingScreenProps) {
  const { styles, colors } = useTheme();
  // Shared values
  const pulse = useSharedValue(0);
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    // Logo pulse
    // pulse.value = withRepeat(
    //   withSequence(
    //     withTiming(1, { duration: 900 }),
    //     withTiming(0, { duration: 900 })
    //   ),
    //   -1,
    //   true
    // );

    // Bouncing dots
    const bounce = (dot: typeof dot1, delay: number) => {
      setTimeout(() => {
        dot.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 360 }),
            withTiming(0, { duration: 360 })
          ),
          -1,
          true
        );
      }, delay);
    };
    bounce(dot1, 0);
    bounce(dot2, 180);
    bounce(dot3, 360);

    // Progress bar pulse
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1600 }),
        withTiming(0, { duration: 1200 })
      ),
      -1,
      true
    );
  }, []);

  // Animated styleLocal
  const logoStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulse.value, [0, 1], [1, 1.12]);
    return { transform: [{ scale }] };
  });

  const dotStyle = (dot: typeof dot1) =>
    useAnimatedStyle(() => {
      const translateY = interpolate(dot.value, [0, 1], [0, -8]);
      return { transform: [{ translateY }] };
    });

  const progressStyle = useAnimatedStyle(() => {
    const width = interpolate(progress.value, [0, 1], [60, 280]); // px
    return { width };
  });

  return (
    <SafeAreaView style={styleLocal.safe}>
      <View style={[styleLocal.container, containerStyle]}>
        {/* Logo */}
        <Animated.View style={[styleLocal.logoWrap, logoStyle]}>
          {icon && (
            <FontAwesome5
              name="truck-loading"
              size={60}
              color={colors.primary}
            />
          )}
        </Animated.View>
        {/* Dots */}
        <View style={styleLocal.dotsRow}>
          <Animated.View
            style={[
              styleLocal.dot,
              { backgroundColor: "white" },
              dotStyle(dot1),
            ]}
          />
          <Animated.View
            style={[
              styleLocal.dot,
              { backgroundColor: "white" },
              dotStyle(dot2),
            ]}
          />
          <Animated.View
            style={[
              styleLocal.dot,
              { backgroundColor: "white" },
              dotStyle(dot3),
            ]}
          />
        </View>
        {/* Texts */}
        <View style={styleLocal.textBlock}>
          <Text style={[styleLocal.title, { color: "white" }, titleStyle]}>
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={[
                styleLocal.subtitle,
                subtitleStyle,
                { color: colors.primary },
              ]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {/* Progress bar */}
        {/* <View style={styleLocal.progressContainer}>
          <View style={styleLocal.progressTrack}>
            <Animated.View
              style={[
                styleLocal.progressBar,
                { backgroundColor: accentColor },
                progressStyle,
              ]}
            />
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styleLocal = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoWrap: {
    width: 96,
    height: 96,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  logoImage: { width: 64, height: 64 },
  logoFallback: {
    width: 76,
    height: 76,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoInner: { width: 44, height: 44, borderRadius: 14 },
  textBlock: { alignItems: "center", marginBottom: 18 },
  title: { fontSize: 18, fontWeight: "700", letterSpacing: 0.2 },
  subtitle: { marginTop: 6, fontSize: 13, color: "#cbd5e1" },
  dotsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
    marginBottom: 18,
  },
  dot: { width: 10, height: 10, borderRadius: 6 },
  progressContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  progressTrack: {
    width: "100%",
    height: 8,
    borderRadius: 999,
    backgroundColor: "#ffffff22",
    overflow: "hidden",
  },
  progressBar: { height: "100%", borderRadius: 999 },
});
