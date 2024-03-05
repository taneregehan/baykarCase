import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(1 * 60); // 30 dakika
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const percentageLeft = (timeLeft / (1 * 60)) * 100;
    setPercentage(percentageLeft);
  }, [timeLeft]);

  const timerMinutes = Math.floor(timeLeft / 60);
  const timerSeconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <View style={[styles.progressCircle, { transform: [{ rotate: `${-90 + percentage}deg` }] }]}>
        <View style={[styles.leftWrap, { transform: [{ rotate: "180deg" }] }]}>
          <View style={styles.halfCircle} />
        </View>
        <View style={[styles.rightWrap, { transform: [{ rotate: "0deg" }] }]}>
          <View style={styles.halfCircle} />
        </View>
      </View>
      <Text style={styles.timerText}>{`${timerMinutes}:${
        timerSeconds < 10 ? "0" : ""
      }${timerSeconds}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  progressCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e6e6e6",
    position: "relative",
    overflow: "hidden",
  },
  leftWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 50,
    height: 100,
    overflow: "hidden",
  },
  rightWrap: {
    position: "absolute",
    top: 0,
    left: 50,
    width: 50,
    height: 100,
    overflow: "hidden",
  },
  halfCircle: {
    position: "absolute",
    top: 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: 100,
    height: 100,
    backgroundColor: "#03a9f4",
  },
  timerText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
