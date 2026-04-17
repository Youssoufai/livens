import { Dimensions, PixelRatio, Platform } from "react-native";

import { BASE_SCREEN_HEIGHT, BASE_SCREEN_WIDTH } from "@/constants/device";

const { width, height } = Dimensions.get("window");

const verticalScale = height / BASE_SCREEN_HEIGHT;
const horizontalScale = width / BASE_SCREEN_WIDTH;

const SCALE = width > height ? height : width;

const fontConfig = {
  phone: {
    small: { min: 0.75, max: 0.9 },
    medium: { min: 0.9, max: 1.1 },
    large: { min: 1.1, max: 1.25 },
  },
  tablet: {
    small: { min: 1.25, max: 1.4 },
    medium: { min: 1.4, max: 1.5 },
    large: { min: 1.5, max: 1.7 },
  },
};

const FONT_SCALE = PixelRatio.getFontScale();

export const lockFontScale = (size: number) => size / FONT_SCALE;

export const actuateNormalize = function normalize(
  size: number,
  dimension: "width" | "height",
) {
  let newSize = 0;

  if (dimension === "width") {
    newSize = size * horizontalScale;
  } else {
    newSize = size * verticalScale;
  }

  if (Platform.OS === "ios") {
    return Math.floor(PixelRatio.roundToNearestPixel(newSize));
  } else if (Platform.OS === "android") {
    return Math.floor(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }

  return 0;
};

export function getDeviceType(): "phone" | "tablet" {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;

  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return "tablet";
  } else if (
    pixelDensity === 2 &&
    (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  ) {
    return "tablet";
  } else {
    return "phone";
  }
}

const getScreenSizeCategory = (): "small" | "medium" | "large" => {
  if (SCALE < 350) return "small";
  if (SCALE > 500) return "large";
  return "medium";
};

export function actuateFontSize(size: number) {
  const deviceType = getDeviceType();
  const screenCategory = getScreenSizeCategory();
  const config = fontConfig[deviceType][screenCategory];

  const scaleFactor = SCALE / BASE_SCREEN_WIDTH;
  const clampedScaleFactor = Math.min(
    Math.max(scaleFactor, config.min),
    config.max,
  );

  let newSize = size * clampedScaleFactor;

  if (deviceType === "tablet") {
    newSize *= 1.1;
  }

  return lockFontScale(Math.round(PixelRatio.roundToNearestPixel(newSize)));
}

export function actuateLineHeight(fontSize: number, lineHeight: number = 20) {
  const ratio = lineHeight ? +(lineHeight / fontSize).toFixed(3) : 1.35;
  const scaledFont = actuateFontSize(fontSize);

  return Math.round(scaledFont * ratio);
}
