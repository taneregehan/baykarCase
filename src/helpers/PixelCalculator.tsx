import { Dimensions, Platform, PixelRatio } from "react-native";

/**
 * Return available screen pixels
 */
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 * Avaliable horizontal screen pixels over guideline screen pixels
 */
const widthScale = SCREEN_WIDTH / 375;

/**
 * Avaliable vertical screen pixels over guideline screen pixels
 */
const heightScale = SCREEN_HEIGHT / 812;

/**
 * Takes width px value to calculate scaled px.
 * @param size Pixel value based on guideline
 * @returns actual px value.
 */
export function wp(size: number): number {
  const newSize = size * widthScale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
}

/**
 * Takes height px value to calculate scaled px.
 * @param size Pixel value based on guideline
 * @returns actual px value.
 */
export function hp(size: number): number {
  const newSize = size * heightScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
