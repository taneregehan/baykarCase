import { ReactNode } from "react";
import { SCREEN_HEIGHT, SCREEN_WIDTH, hp, wp } from "../../src/helpers/PixelCalculator";
import { PressableProps, StyleSheet, TextProps, ViewProps } from "react-native";

export interface DivProps extends ViewProps {
  children?: ReactNode;
  styles?: string;
}

export interface TouchableDivProps extends PressableProps {
  children?: ReactNode;
  styles?: string;
}

export interface PProps extends TextProps {
  children?: ReactNode;
  styles?: string;
  elipsis?: true | false;
}

export const appColors = {
  background: "#F2F4F6",
  button: "#213D73",
  cardHolder: "#FFFFFFB2",
  transparentOrange: "#FAA17A80",
  icon: "#F0F0F0",
  cardHeader: "#CDD8FB",
  stroke: "#8682AC",
  bluredHover: "#BDC2CB80",
  seperator: "#C6C6C6",
  primary1: "#7DA1FF",
  primary2: "#FF7DA0",
  primary3: "#9878DD",
  secondary1: "#FFD371",
  secondary2: "#D28AFE",
  secondary3: "#FAA17A",
  secondary4: "#61DA80",
  secondary5: "#61DA80",
  secondary6: "#8FDEE8",
  secondary7: "#A7DFFA",
  details: "#9878DD",
  disabled: "#8A8A8E",
  disabledLight: "#C6C6C630",
  interaction: "#007AFF",
  secondaryInteraction: "#7A7FFA",
  selected: "#3156BA",
  danger: "#FF4F4F",
  safe: "#7FD64A",
  attention: "#FF9346",
  attentionTransparent: "#FF934650",
  error: "#FF4900",
  success: "#34C85A",
  missing: "#F1636C",
  iconBackground: "#EAEAEAB2",
  antrasit: "#313131",
};

export const defaultTextStyles = ["c-antrasit", "size-13", "custom"];

const generalStyles = StyleSheet.create({
  fullWidth: {
    width: SCREEN_WIDTH,
  },
  section: {
    backgroundColor: "white",
    borderWidth: hp(1),
    borderColor: "#8682AC",
    paddingHorizontal: wp(10),
    borderRadius: hp(10),
  },
  widget: {
    borderRadius: hp(25),
    borderWidth: hp(0.8),
    borderColor: "white",
    paddingHorizontal: wp(8),
    paddingVertical: hp(16),
  },
  fullHeight: {
    height: SCREEN_HEIGHT,
  },
  fullScreen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  flexBox: {
    flex: 1,
  },
  absolute: {
    position: "absolute",
  },
  font: {
    fontFamily: "custom",
  },
  between: {
    justifyContent: "space-between",
  },
  around: {
    justifyContent: "space-around",
  },
  contentEnd: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  selftEnd: {
    alignSelf: "flex-end",
  },
  wrap: {
    flexWrap: "wrap",
  },
  center: {
    alignSelf: "center",
  },
  contentCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  underline: {
    textDecorationLine: "underline",
  },
  selectedButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColors.selected,
    borderRadius: hp(5),
    paddingVertical: hp(10),
  },
  borderDotted: {
    borderStyle: "dotted",
  },
  borderDashed: {
    borderStyle: "dashed",
  },
});

const generalStyleKeys = {
  // Attribute
  bg: "backgroundColor",
  h: "height",
  height: "height",
  hwp: "height",
  hr: "height",
  w: "width",
  width: "width",
  whp: "width",
  wr: "width",
  maxH: "maxHeight",
  maxHeight: "maxHeight",
  maxW: "maxWidth",
  maxWidth: "maxWidth",
  minH: "minHeight",
  minHeight: "minHeight",
  minW: "minWidth",
  minWidth: "minWidth",
  opacity: "opacity",
  overflow: "overflow",

  // FlexBox
  flex: "flex",
  wrap: "flexWrap",
  self: "alignSelf",
  items: "alignItems",
  display: "display",
  justify: "justifyContent",
  flexGrow: "flexGrow",
  flexBasis: "flexBasis",
  direction: "flexDirection",
  flexShrink: "flexShrink",
  alignContent: "alignContent",

  // Border
  rounded: "borderRadius",
  bordered: "borderWidth",
  borderColor: "borderColor",
  roundBottomLeft: "borderBottomLeftRadius",
  roundBottomRight: "borderBottomRightRadius",
  roundTopLeft: "borderTopLeftRadius",
  roundTopRight: "borderTopRightRadius",
  borderBottom: "borderBottomWidth",
  borderLeft: "borderLeftWidth",
  borderRight: "borderRightWidth",
  borderTop: "borderTopWidth",

  // Position
  position: "position",
  top: "top",
  left: "left",
  right: "right",
  bottom: "bottom",
  z: "zIndex",

  // Padding
  p: "p",
  pv: "paddingVertical",
  ph: "paddingHorizontal",
  pl: "paddingLeft",
  pt: "paddingTop",
  pr: "paddingRight",
  pb: "paddingBottom",
  pbpx: "paddingBottom",

  // Margin
  m: "margin",
  mv: "marginVertical",
  mh: "marginHorizontal",
  ml: "marginLeft",
  mt: "marginTop",
  mr: "marginRight",
  mb: "marginBottom",

  // Gap
  gap: "gap",
  gapH: "gap",
  gapW: "gap",
  rowGap: "rowGap",
  columnGap: "columnGap",

  //Text
  size: "fontSize",
  text: "textAlign",
  c: "color",

  // ..Rest
  tintColor: "tintColor",
  objectFit: "objectFit",
  resizeMode: "resizeMode",
  shadowColor: "shadowColor",
  shadowRadius: "shadowRadius",
  overlayColor: "overlayColor",
  shadowOpacity: "shadowOpacity",
};

const generalStyleKeyValueTypes = {
  // Attribute
  bg: "color",
  h: "hp",
  height: "number",
  hwp: "wp",
  hr: "ratio",
  w: "wp",
  width: "number",
  whp: "hp",
  wr: "ratio",
  maxH: "hp",
  maxHeight: "number",
  maxW: "wp",
  maxWidth: "number",
  minH: "hp",
  minHeight: "number",
  minW: "wp",
  minWidth: "number",
  opacity: "number",
  overflow: "string",

  // FlexBox
  flex: "number",
  wrap: "string",
  self: "string",
  items: "string",
  display: "string",
  justify: "string",
  flexGrow: "string",
  flexBasis: "string",
  direction: "string",
  flexShrink: "string",
  alignContent: "string",

  // Border
  rounded: "number",
  bordered: "number",
  borderColor: "color",
  roundBottomLeft: "number",
  roundBottomRight: "number",
  roundTopLeft: "number",
  roundTopRight: "number",
  borderBottom: "number",
  borderLeft: "number",
  borderRight: "number",
  borderTop: "number",

  // Position
  position: "string",
  top: "number",
  left: "number",
  right: "number",
  bottom: "number",
  zIndex: "number",

  // Padding
  p: "number",
  pv: "hp",
  ph: "wp",
  pl: "wp",
  pt: "hp",
  pr: "wp",
  pb: "hp",
  pbpx: "number",

  // Margin
  m: "number",
  mv: "hp",
  mh: "wp",
  ml: "wp",
  mt: "hp",
  mr: "wp",
  mb: "hp",

  // Gap
  gap: "number",
  gapHp: "hp",
  gapWp: "wp",
  rowGap: "wp",
  columnGap: "hp",

  // Text
  size: "hp",
  text: "string",
  c: "color",

  // ..Rest
  tintColor: "color",
  objectFit: "string",
  resizeMode: "string",
  shadowColor: "string",
  shadowRadius: "number",
  overlayColor: "string",
  shadowOpacity: "number",
};

export function styleValueGenerator(styleKey: string, value: string) {
  if (value) {
    if (generalStyleKeys.hasOwnProperty(styleKey)) {
      switch (generalStyleKeyValueTypes?.[styleKey]) {
        case "wp":
          return {
            [generalStyleKeys[styleKey]]: wp(parseFloat(value)),
          };
        case "hp":
          return {
            [generalStyleKeys[styleKey]]: hp(parseFloat(value)),
          };
        case "number":
          return {
            [generalStyleKeys[styleKey]]: parseFloat(value),
          };
        case "color":
          return {
            [generalStyleKeys[styleKey]]: appColors?.[value] || value,
          };
        case "ratio":
          return {
            [generalStyleKeys[styleKey]]: `${value}%`,
          };
        default:
          return {
            [generalStyleKeys[styleKey]]: value,
          };
      }
    }
  } else if (generalStyles.hasOwnProperty(styleKey)) {
    return generalStyles[styleKey];
  }
  return {};
}
