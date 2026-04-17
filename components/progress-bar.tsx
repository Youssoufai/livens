import * as ProgressPrimitive from "@rn-primitives/progress";
import { StyleSheet } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

import { COLORS } from "@/constants/theme";

import { useEffect } from "react";
import { ProgressBarProps } from "./components.types";

const AnimatedIndicator = Animated.createAnimatedComponent(
  ProgressPrimitive.Indicator,
);

const ProgressBar = ({
  progress,
  color = COLORS.primary[300],
  containerStyle,
}: ProgressBarProps) => {
  const progressValue = useSharedValue(0);

  useEffect(() => {
    progressValue.value = withTiming(progress, {
      duration: 500,
      easing: Easing.linear,
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: color,
    width: `${progressValue.value}%`,
  }));

  return (
    <ProgressPrimitive.Root
      style={[styles.progressBar, containerStyle]}
      value={progress}
      max={100}
    >
      <AnimatedIndicator
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        style={[styles.progressFill, animatedStyle]}
      />
    </ProgressPrimitive.Root>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    borderRadius: 30,
    backgroundColor: COLORS.grey[200],
    height: 12,
    width: "100%",
    overflow: "hidden",
  },
  progressFill: {
    borderRadius: 30,
    height: "100%",
  },
});

export default ProgressBar;
