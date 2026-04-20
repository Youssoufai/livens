import { StyleSheet, View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GLOBAL_HORIZONTAL_PADDING } from "@/constants";
import { COLORS } from "@/constants/theme";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  hasTopPadding?: boolean;
  hasBottomPadding?: boolean;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
    position: "relative",
  },
});

export function ThemedView({
  style,
  lightColor,
  darkColor,
  hasTopPadding,
  hasBottomPadding,
  ...otherProps
}: ThemedViewProps) {
  const { bottom, top } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: lightColor || darkColor || COLORS.white,
          paddingTop: hasTopPadding ? top : 0,
          paddingBottom: hasBottomPadding ? bottom : 0,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
