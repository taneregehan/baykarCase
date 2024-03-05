import React, { useRef } from "react";
import { ScrollView, StyleSheet, View, Dimensions, Image } from "react-native";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import { Div } from "../helpers/StyledElements";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Login() {
  const scrollViewRef = useRef();

  const handleSwipe = (direction) => {
    const currentPage = scrollViewRef?.current?.contentOffset?.x / SCREEN_WIDTH;

    if (direction === "right" && currentPage > 0) {
      scrollViewRef?.current?.scrollTo({
        x: (currentPage - 1) * SCREEN_WIDTH,
        animated: true,
      });
    } else if (direction === "left" && currentPage < 1) {
      scrollViewRef?.current?.scrollTo({
        x: (currentPage + 1) * SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      onScrollToIndexFailed={() => null}
      showsHorizontalScrollIndicator={false}
      onScroll={(event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        if (offsetX % SCREEN_WIDTH === 0) {
          if (offsetX > 0) {
            handleSwipe("right");
          } else {
            handleSwipe("left");
          }
        }
      }}
    >
      <View style={styles.page}>
        <LoginPage />
      </View>
      <View style={styles.page}>
        <SignUpPage />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    width: SCREEN_WIDTH,
  },
});
