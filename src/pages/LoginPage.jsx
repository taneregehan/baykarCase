import { Alert, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { Div, P, Touchable } from "../helpers/StyledElements";
import StringInput from "../helpers/StringInput";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../helpers/PixelCalculator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation();

  const handleLogin = async () => {
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginCredentials.email,
        password: loginCredentials.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Giriş başarısız");
        }
        return res.json();
      })
      .then(async (json) => {
        console.log(json);
        // await AsyncStorage.setItem("userInfo", loginCredentials);
        try {
          await AsyncStorage.setItem("userData", JSON.stringify(loginCredentials));
        } catch (error) {
          console.error("Error saving user data:", error);
        }
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        Alert.alert("Hata", "Giriş Yapılırken bir hata oluştu");
      });
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
            value={loginCredentials.email}
            onChange={(text) =>
              setLoginCredentials((prev) => ({
                ...prev,
                email: text.trim(),
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
                password: text.trim(),
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
