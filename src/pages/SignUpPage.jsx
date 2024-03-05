import React, { useEffect, useState } from "react";
import { Image, ScrollView, Modal, Alert, Platform } from "react-native";
import { Div, P, Touchable } from "../helpers/StyledElements";
import StringInput from "../helpers/StringInput";
import { SCREEN_HEIGHT, SCREEN_WIDTH, wp } from "../helpers/PixelCalculator";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomSwitch from "../helpers/CustomSwitch";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import trLocale from "date-fns/locale/tr";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpPage() {
  const [gender, setGender] = useState(0);
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [birthDay, setBirthDay] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [confirmArray, setConfirmArray] = useState([false, false, false]);
  const navigation = useNavigation();
  const [showPicker, setShowPicker] = useState(false);
  const [isReadyToProceed, setIsReadyToProceed] = useState(false);

  const [userInfo, setUserInfo] = useState({
    gender: gender === 1 ? "Erkek" : "Kadın",
    email: email,
    nick: nick,
    password: password,
    birthDay: birthDay,
    confirmArray: confirmArray,
  });

  const saveUserDataToStorage = async (userData) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const checkInputs = () => {
    if (
      gender !== null &&
      email !== "" &&
      nick !== "" &&
      password !== "" &&
      confirmArray.every((item) => item)
    ) {
      setIsReadyToProceed(true);
    } else {
      setIsReadyToProceed(false);
    }
  };

  useEffect(() => {
    checkInputs();
  }, [gender, email, nick, password, confirmArray]);

  const handleProceed = () => {
    setIsModalOpen(true);

    // Update userInfo here with the latest data
    setUserInfo({
      gender: gender === 1 ? "Erkek" : "Kadın",
      email: email,
      nick: nick,
      password: password,
      birthDay: birthDay,
      confirmArray: confirmArray,
    });
  };

  const handleModalClose = () => {
    if (confirmArray.every((item) => item === true)) {
      setIsModalOpen(false);
      navigation.navigate("LoginPage");
    } else {
      Alert.alert("Uyarı", "Lütfen Tüm Koşulları kabul Ediniz");
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
      <Div
        styles={`h-600 w-375 bg-#FFFFFF90 roundTopLeft-50 roundTopRight-50 absolute ${
          Platform.OS === "android" ? "top-200" : "top-300"
        } pt-50`}>
        <Div styles="h-154 w-245 gap-20 center">
          <P>Cinsiyetinizi seçin</P>
          <Div styles="row around">
            <Touchable
              onPress={() => {
                setGender(1);
              }}
              styles={`h-42 w-112 bg-white contentCenter rounded-14 bg-${
                gender === 1 ? "selected" : ""
              }`}>
              <P>Erkek</P>
            </Touchable>
            <Touchable
              onPress={() => {
                setGender(0);
              }}
              styles={`h-42 w-112 bg-white contentCenter rounded-14 bg-${
                gender === 0 ? "selected" : ""
              }`}>
              <P>Kadın</P>
            </Touchable>
          </Div>
          <Div styles="w-245 h-53 center gap-5">
            <P>E-Mail</P>
            <StringInput
              placeholder="Eposta"
              value={email}
              onChange={(txt) => {
                setEmail(txt);
              }}
            />
          </Div>
          <Div styles="w-245 h-53 center gap-5">
            <P>Nickname</P>
            <StringInput
              placeholder="nickname"
              value={nick}
              onChange={(txt) => {
                setNick(txt);
              }}
            />
          </Div>
          <Div styles="w-245 h-53 center gap-5">
            <P>Şifre</P>
            <StringInput
              placeholder="Şifre"
              value={password}
              onChange={(txt) => {
                setPassword(txt);
              }}
            />
          </Div>
          <Div styles="w-245 h-53 center gap-5">
            <Touchable onPress={() => setShowPicker(true)}>
              <P>Doğum Tarihi Seçiniz</P>
            </Touchable>
            {showPicker && (
              <DateTimePicker
                mode="date"
                accentColor="#0300A3"
                value={birthDay}
                locale="TR"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || birthDay;
                  setBirthDay(currentDate);
                  setShowPicker(false);
                }}
              />
            )}
            {!showPicker && (
              <Div styles="rounded-5 bordered-.6 borderColor-disabledLight  pv-5  ph-5 bg-white">
                <P>{format(birthDay, "dd.MM.yyyy", { locale: trLocale })}</P>
              </Div>
            )}
          </Div>
          <Touchable
            onPress={handleProceed}
            styles={`w-164 h-40 bg-#0300A3 
             center contentCenter rounded-40`}>
            <P styles="c-white">İlerle</P>
          </Touchable>
          <Div styles="row gap-4 center">
            <P styles="c-black">Hesabınız var mı</P>
            <Touchable
              onPress={() => {
                navigation.navigate("LoginPage");
              }}>
              <P styles="c-#0300A3">giriş yap</P>
            </Touchable>
          </Div>
        </Div>
      </Div>
      <Modal visible={isModalOpen} animationType="slide" transparent>
        <Div styles="flexBox bg-#FFFFFF80 contentCenter items-center ">
          <Div styles="bg-white rounded-20 ph-40 pv-20 gap-10 ">
            <P styles="text-center ">Hassas Veriler Hakkında</P>
            <Div styles="row between gap-10 items-center w-341 h-78  ">
              <CustomSwitch
                toggleOffColor="#B1B0FF"
                toggleOnColor="#0300A3"
                onChange={(value) => {
                  const updatedArray = [...confirmArray];
                  updatedArray[0] = value;
                  setConfirmArray(updatedArray);
                }}
              />
              <P styles="text-center c-disabled w-300">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem
                Ipsum has been the industry's
              </P>
            </Div>
            <Div>
              <Div styles="row between gap-10 items-center w-341 h-78  ">
                <CustomSwitch
                  toggleOffColor="#B1B0FF"
                  toggleOnColor="#0300A3"
                  onChange={(value) => {
                    const updatedArray = [...confirmArray];
                    updatedArray[1] = value;
                    setConfirmArray(updatedArray);
                  }}
                />
                <P styles="text-center c-disabled w-300">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Kabul
                  ediyorum:
                </P>
              </Div>
            </Div>

            <Div styles="row between gap-10 items-center w-341 h-78  ">
              <CustomSwitch
                toggleOffColor="#B1B0FF"
                toggleOnColor="#0300A3"
                onChange={(value) => {
                  const updatedArray = [...confirmArray];
                  updatedArray[2] = value;
                  setConfirmArray(updatedArray);
                }}
              />
              <P styles="text-center c-disabled w-300">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s.
              </P>
            </Div>

            <Touchable
              styles={`w-164 h-40 bg-${
                isReadyToProceed ? "#0300A3" : "disabled"
              } center contentCenter rounded-40`}
              disabled={!isReadyToProceed}
              onPress={() => {
                saveUserDataToStorage(userInfo);

                handleModalClose();
              }}>
              <P styles="c-white">İlerle</P>
            </Touchable>
          </Div>
        </Div>
      </Modal>
    </ScrollView>
  );
}
