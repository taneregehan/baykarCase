import React, { useState, useEffect, useRef } from "react";
import { wp } from "../helpers/PixelCalculator";
import { Div, P } from "../helpers/StyledElements";
import { DivProps } from "../helpers/StyledElementsEnum";
import { Animated, InteractionManager, LayoutChangeEvent } from "react-native";

interface ProgressBarProps extends DivProps {
  ratio: number;
  /**
   *Sets the fill percentage of bars
   */
  barColor?: string;
  /**
   *Sets the colors of the bars
   */
  duration?: number;
  /**
   *adjusts the timing of the animation of bars
   */
  vertical?: boolean;
  /**
   *Adjusts the axes of the bars
   */
  counts?: number;
  /**
   * set attendance lenght
   */
  styles?: string;
  /**
   * set count visibility
   */
  showCounts?: boolean;

  reverse?: boolean;
}

export default function ProgressBar(props: Readonly<ProgressBarProps>) {
  const progressAnim = useRef(new Animated.Value(props?.reverse ? 1 : 0)).current;

  const {
    ratio = 0,
    barColor = "primary1",
    duration = 500,
    vertical = false,
    counts,
    showCounts,
    styles,
  } = props;
  const [progressAttributes, setProgressAttributes] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  function onLayout(divLayout: LayoutChangeEvent) {
    setProgressAttributes({
      ...divLayout.nativeEvent.layout,
      height: divLayout.nativeEvent.layout.height + wp(2),
    });
  }

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (progressAttributes.height && progressAttributes.width && ratio) {
        if (props.reverse) {
          Animated.timing(progressAnim, {
            toValue: ratio > 0 ? 0 : ratio,
            useNativeDriver: true,
            duration: duration,
          }).start();
        } else {
          Animated.timing(progressAnim, {
            toValue: ratio > 1 ? 1 : ratio,
            useNativeDriver: true,
            duration: duration,
          }).start();
        }
      }
    });
  }, [progressAttributes, ratio]);

  return (
    <Div
      styles={`flexBox bg-${!vertical ? barColor : ""} ${styles || ""} overflow-hidden`}
      onLayout={onLayout}>
      <Animated.View
        style={[
          {
            top: 0,
            left: 0,
            gap: wp(2),
            width: progressAttributes?.width,
            height: progressAttributes?.height,
            backgroundColor: !vertical ? "#C6C6C6B2" : "null",
          },
          {
            transform: [
              {
                translateY: !vertical
                  ? 0
                  : progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, wp(-progressAttributes?.height)],
                    }),
              },
              {
                translateX: vertical
                  ? 0
                  : progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, wp(progressAttributes?.width)],
                    }),
              },
            ],
          },
        ]}>
        <Div
          styles={`bg-disabledLight hwp-${progressAttributes?.height} roundBottomLeft-2  roundBottomRight-2`}
        />
        <Div
          styles={`bg-${barColor} hwp-${progressAttributes?.height} roundTopLeft-4 roundTopRight-4 `}
        />
      </Animated.View>
      {showCounts && (
        <Div styles="absolute bottom-10 center pv-2 ph-10 rounded-10 bg-white opacity-0.7">
          <P styles="size-12 font">{counts}</P>
        </Div>
      )}
    </Div>
  );
}
