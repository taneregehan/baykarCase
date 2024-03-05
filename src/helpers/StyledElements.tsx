import React from "react";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import {
  PProps,
  DivProps,
  TouchableDivProps,
  defaultTextStyles,
  styleValueGenerator,
} from "../../src/helpers/StyledElementsEnum";

const styleObjectCreator = (styleArr: Array<string> = []): StyleProp<ViewStyle> => {
  const divStyle = {};
  styleArr.forEach((att) => {
    const seperatorIndex = att.indexOf("-", 0);
    if (seperatorIndex !== -1) {
      const styleKey = att.slice(0, seperatorIndex);
      const value = att.slice(seperatorIndex + 1, att.length);
      Object.assign(divStyle, styleValueGenerator(styleKey, value));
    } else {
      const styleKey = att.split("-")?.[0];
      const value = att.split("-")?.[1];
      Object.assign(divStyle, styleValueGenerator(styleKey, value));
    }
  });
  return divStyle;
};

export const Div: React.FC<DivProps> = ({ styles = "", ...rest }) => {
  const divStyle = styleObjectCreator(styles.split(" "));
  return (
    <View {...rest} style={divStyle}>
      {rest?.children}
    </View>
  );
};

export const Touchable: React.FC<TouchableDivProps> = ({ styles = "", ...rest }) => {
  const divStyle = styleObjectCreator(styles.split(" "));
  return (
    <Pressable {...rest} style={divStyle}>
      {rest?.children}
    </Pressable>
  );
};

export const P: React.FC<PProps> = ({ styles = "", ...rest }) => {
  const styleArr = [...defaultTextStyles, ...styles.split(" ")];
  const textStyle = styleObjectCreator([...defaultTextStyles, ...styles.split(" ")]);
  const textAtt = { ...rest };
  delete textAtt.children;

  if (rest.elipsis) textAtt.numberOfLines = 1;

  styleArr.forEach((att) => {
    const styleKey = att.split("-")?.[0];
    const value = att.split("-")?.[1];
    Object.assign(textStyle, styleValueGenerator(styleKey, value));
  });

  return (
    <Text {...rest} style={textStyle}>
      {rest.children}
    </Text>
  );
};
