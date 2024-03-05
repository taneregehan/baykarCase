import { Div, P } from "../helpers/StyledElements";
import React, { useState, useRef } from "react";
import { TouchableOpacity, Animated, Pressable } from "react-native";
import { hp, wp } from "../helpers/PixelCalculator";

type CustomSwitchProps = {
  onChange?: (value: boolean) => void;
  toggleOffColor?: string;
  toggleOnColor?: string;
  value?: boolean;
  item?: any;
};

export default function CustomSwitch(props: CustomSwitchProps) {
  const { onChange, toggleOffColor, toggleOnColor, item } = props;
  const [toggled, setToggled] = useState<boolean>(props.value || false);
  const anim = useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    const newValue = !toggled;
    setToggled(newValue);
    onChange(newValue);

    Animated.spring(anim, {
      toValue: newValue ? 1 : 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPress={handleToggle}>
      <Div
        styles={`w-30 h-14 bordered-.2 rounded-19 bg-${
          toggled ? toggleOnColor : toggleOffColor
        } contentCenter `}>
        <Animated.View
          style={{
            width: wp(12),
            height: hp(12),
            borderRadius: hp(5),
            backgroundColor: "white",
            alignSelf: toggled ? "flex-end" : "flex-start",
          }}></Animated.View>
      </Div>
    </Pressable>
  );
}
