import React, { useEffect, useState } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import { Circle, Ellipse, Path, Svg } from "react-native-svg";
import { Div, P } from "../helpers/StyledElements";

export default function EmojiComponent({ onChange }) {
  const [happy, setHappy] = useState(true);
  const emojiPosition = new Animated.ValueXY({ x: 0, y: 0 });
  const draggingIndicatorPosition = new Animated.ValueXY({ x: 0, y: 0 });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      if (Math.abs(gesture.dx) > Math.abs(gesture.dy)) {
        if (gesture.dx > 50 || gesture.dx < -50) {
          return;
        }
        emojiPosition.setValue({
          x: emojiPosition.x._value + gesture.dx,
          y: 0,
        });
      }
      draggingIndicatorPosition.setValue({ x: gesture.moveX, y: 0 });
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > 50) {
        setHappy(true);
      } else if (gesture.dx < -50) {
        setHappy(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View>
        <Svg height="100" width="100">
          <Circle cx="50" cy="50" r="55" fill={happy ? "green" : "red"} />
          <Ellipse cx="35" cy="40" rx="7" ry="10" />
          <Ellipse cx="65" cy="40" rx="7" ry="10" />
          {happy ? (
            <Path d="M30,70 A20,20 0 0,0 70,70" fill="none" stroke="black" strokeWidth="1" />
          ) : (
            <Path d="M30,70 A20,20 0 0,1 70,70" fill="none" stroke="black" strokeWidth="1" />
          )}
        </Svg>
      </Animated.View>
      <Animated.View {...panResponder.panHandlers}>
        <Div styles={`w-300 h-20 rounded-20 bg-${happy ? "success" : "danger"}`}>
          <P styles="text-center size-14 c-white">{happy ? "mutlu" : "üzgün"}</P>
          <P styles="size-10 c-disabled">Kaydır...</P>
        </Div>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
