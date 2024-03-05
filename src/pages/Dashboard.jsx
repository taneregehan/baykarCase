import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image, StatusBar } from "react-native";
import { Div, P, Touchable } from "../helpers/StyledElements";
import { hp, wp } from "../helpers/PixelCalculator";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState("");

  useEffect(() => {
    getUserDataFromStorage();
  }, []);

  const getUserDataFromStorage = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem("userData");
      console.log("userDataJSON", userDataJSON);

      if (userDataJSON !== null) {
        const userData = JSON.parse(userDataJSON);
        setUserData(userData);
      }
    } catch (error) {
      console.error("Error getting user data from AsyncStorage:", error);
    }
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <Div styles="flexBox">
      <StatusBar barStyle="default" />
      <Image
        source={require("../assets/bg.png")}
        style={{
          width: wp(391),
          height: hp(424),
          resizeMode: "cover",
          alignSelf: "center",
        }}
      />
      <Div styles="flex-1 center contentCenter gap-10">
        <P styles="font">
          Merhaba <P styles="c-#0300A3 size-14">{userData?.email}</P>
        </P>
        <Touchable
          onPress={() => {
            navigation.navigate("Survey");
          }}
          styles="w-178 h-40 bg-#0300A3 rounded-40 contentCenter">
          <P styles="font c-white">Ankete Başla</P>
        </Touchable>
      </Div>
    </Div>
  );
}
