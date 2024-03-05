import { Alert, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Div, P, Touchable } from "../helpers/StyledElements";
import StringInput from "../helpers/StringInput";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../helpers/PixelCalculator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const navigation = useNavigation();

  useEffect(() => {
    getUserDataFromStorage();
  }, []);

  const getUserDataFromStorage = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem("userData");
      if (userDataJSON !== null) {
        return JSON.parse(userDataJSON);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting user data from AsyncStorage:", error);
      return null;
    }
  };

  const handleLogin = async () => {
    const storedUserData = await getUserDataFromStorage();
    if (
      storedUserData &&
      storedUserData.nick === loginCredentials.username &&
      storedUserData.password === loginCredentials.password
    ) {
      navigation.navigate("Dashboard", { ...storedUserData?.nick });
    } else {
      Alert.alert("Uyarı", "Kullanıcı adı veya şifre yanlış.");
    }
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}>
      <Image
        source={require("../assets/bg.png")}
        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
      />
      <Div styles="h-550 w-375  bg-white roundTopLeft-50 roundTopRight-50 absolute top-300 pt-50  gap-40">
        <P styles="size-20 center bold">Hoşgeldiniz</P>
        <Div styles="w-347 h-143 center  gap-14  ph-14">
          <StringInput
            placeholder="Kullanıcı Adı"
            value={loginCredentials.username}
            onChange={(text) =>
              setLoginCredentials((prev) => ({
                ...prev,
                username: text.replace(/\s+/g, ""),
              }))
            }
            boxProps={{}}
            titleProps={{
              size: 14,
              color: "black",
            }}
          />
          <StringInput
            secure
            placeholder="Şifre"
            value={loginCredentials.password}
            onChange={(text) =>
              setLoginCredentials((prev) => ({
                ...prev,
                password: text.replace(/\s+/g, ""),
              }))
            }
            titleProps={{
              color: "black",
            }}
          />

          <Touchable
            onPress={handleLogin}
            styles="contentCenter w-134 rounded-40 h-60 bg-#0300A3 center">
            <P styles="c-white medium ">Giriş Yap</P>
          </Touchable>
        </Div>
      </Div>
    </ScrollView>
  );
}
