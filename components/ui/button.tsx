import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

import { COLORS } from "@/constants/theme";
import { getResolvedColor } from "@/utils/resolver";

import Text from "../text";
import { BtnProps } from "./ui.types";

const Button = ({
  label,
  loading,
  btnStyle,
  labelStyle,
  contentStyle,
  icon,
  disabledColor = COLORS.grey[400],
  buttonColor = "primary-300",
  labelColor = "white",
  loaderColor,
  disabled,
  alignIcon,
  onPress,
  ...props
}: BtnProps) => {
  const textColor = getResolvedColor(labelColor);
  const btnColor = getResolvedColor(buttonColor);

  const content = (
    <View style={[styles.content, contentStyle]}>
      {!loading ? (
        <>
          {alignIcon === "left" && icon}
          <Text
            size={14}
            lineHeight={20}
            weight={500}
            color={disabled ? "grey-200" : labelColor}
            style={labelStyle}
          >
            {label}
          </Text>
          {alignIcon === "right" && icon}
        </>
      ) : (
        <ActivityIndicator color={textColor} />
      )}
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btnContainer,

        {
          opacity: pressed ? 0.75 : undefined,
          backgroundColor: disabled
            ? disabledColor || "#4257D075"
            : btnColor || COLORS.primary[500],
        },
        btnStyle,
      ]}
      disabled={disabled || loading}
    >
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    position: "relative",
    borderRadius: 30,
    overflow: "hidden",
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
  },
  label: {
    color: "#ffffff",
  },
  gradient: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
});

export default Button;
