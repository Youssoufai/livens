import { ReactElement } from "react";
import { TextStyle, ViewStyle } from "react-native";

import { ColorType } from "../components.types";

export interface BtnProps {
  icon?: ReactElement;
  label: string;
  onPress: VoidFunction;
  btnStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  labelStyle?: TextStyle;
  alignIcon?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  labelColor?: ColorType;
  buttonColor?: ColorType;
  disabledColor?: string;
  loaderColor?: string;
}
