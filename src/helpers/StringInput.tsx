import React, { useState } from "react";
import { TextInput, TextInputProps, StyleProp, ViewStyle } from "react-native";
import { Div, P, Touchable } from "../helpers/StyledElements";
import { hp, wp } from "../helpers/PixelCalculator";
import { appColors } from "./StyledElementsEnum";
import { EyeCloseIcon, EyeIcon } from "./GeneralIcons";

interface StringInputProps {
  bg?: string;
  title?: string;
  value?: string;
  confirmed?: boolean;
  multi?: boolean;
  multiline?: boolean;
  secure?: boolean;
  capitalize?: "none" | "sentences" | "words" | "characters";
  placeholder?: string;
  placeholderText?: string;
  onChange?: (val: string) => void;
  titleProps?: any;
  boxProps?: any;
  fontSize?: number;
  height?: number;
  disable?: boolean;
  numberInput?: boolean;
  onSubmit?: () => void;
}

const StringInput: React.FC<StringInputProps> = ({
  bg = "",
  title = "",
  confirmed = false,
  value = "",
  multi = false,
  multiline = false,
  secure = false,
  capitalize = "none",
  placeholder = "",
  placeholderText = "",
  onChange = (val) => null,
  titleProps = {},
  boxProps,
  fontSize = 14,
  height = hp(128),
  disable = false,
  numberInput = false,
  onSubmit = () => null,
}) => {
  const [showText, setShowText] = useState(false);

  const textInputProps: TextInputProps = {
    value: value,
    multiline: multi || multiline,
    onSubmitEditing: onSubmit,
    onEndEditing: onSubmit,
    keyboardType: numberInput ? "number-pad" : "default",
    secureTextEntry: secure ? !showText : false,
    autoCapitalize: capitalize,
    placeholder: placeholder,
    placeholderTextColor: appColors.disabled,
    onChangeText: (text) => onChange(numberInput ? text.replace(/[^0-9]/g, "") : text),
    editable: !disable,
    style: {
      flex: 6,
      paddingHorizontal: wp(15),
      paddingVertical: hp(10),
      fontSize: fontSize,
      textAlignVertical: "center",
      color: disable ? appColors.disabled : "black",
      ...(multi ? { height: height } : {}),
    },
  };

  return (
    <>
      {title !== "" && <P id={title} {...titleProps} />}
      <Div
        styles={`row bg-${
          bg || "white"
        } rounded-5 bordered-.6 borderColor-disabledLight contentCenter `}
        {...boxProps}>
        <TextInput {...textInputProps} />
        {secure &&
          (showText ? (
            <Touchable styles="flexBox contentCenter row" onPress={() => setShowText(!showText)}>
              <EyeCloseIcon size={21} color="disabled" />
            </Touchable>
          ) : (
            <Touchable styles="flexBox contentCenter row" onPress={() => setShowText(!showText)}>
              <EyeIcon size={21} color="disabled" />
            </Touchable>
          ))}
      </Div>
    </>
  );
};

export default StringInput;
