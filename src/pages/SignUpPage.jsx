import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Div, P, Touchable } from "../helpers/StyledElements";
import StringInput from "../helpers/StringInput";
import { useNavigation } from "@react-navigation/native";

export default function SignUpPage() {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const navigation = useNavigation();

  const handleLogin = () => {
    // Burada login işlemleri yapılabilir.
    navigation.navigate("Dashboard");
  };
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Image source={require("../assets/bg.png")} />
      <Div styles="h-548 w-375 bg-#FFFFFF90 roundTopLeft-50 roundTopRight-50 absolute top-200 pt-50 gap-14">
        <Div styles="h-154 w-245 gap-10 center">
          <P>Cinsiyetinizi seçin</P>

          <Div styles="row around">
            <Touchable styles="h-42 w-112 bg-white contentCenter rounded-14">
              <P>Erkek</P>
            </Touchable>
            <Touchable styles="h-42 w-112 bg-white contentCenter rounded-14">
              <P>Kadın</P>
            </Touchable>
          </Div>
        </Div>
        <Div styles="flex-1 bg-blue"></Div>
        <Div styles="flex-1 bg-red"></Div>
      </Div>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
