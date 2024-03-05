import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Div, P, Touchable } from "../helpers/StyledElements";
import StringInput from "../helpers/StringInput";
import { useNavigation } from "@react-navigation/native";

export default function LoginPage() {
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
      <Div styles="h-500 w-375  bg-white roundTopLeft-50 roundTopRight-50 absolute top-300 pt-50  gap-40">
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
            styles="contentCenter w-134 rounded-40 h-60 bg-#0300A3 center"
          >
            <P styles="c-white medium ">Giriş Yap</P>
          </Touchable>
        </Div>
      </Div>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
