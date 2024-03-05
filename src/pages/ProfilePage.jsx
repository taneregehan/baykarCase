import React, { useEffect, useRef, useState } from "react";
import { Div, P, Touchable } from "../helpers/StyledElements";
import { EditIcon, ProfileIcon } from "../helpers/GeneralIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import Popup from "../helpers/PopUp";

export default function ProfilePage() {
  const [userData, setUserData] = useState("");
  const privacyRef = useRef(null);
  const popUpref = useRef(null);

  useEffect(() => {
    getUserDataFromStorage();
  }, []);

  const getUserDataFromStorage = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem("userData");

      if (userDataJSON !== null) {
        const userData = JSON.parse(userDataJSON);
        setUserData(userData);
      }
    } catch (error) {
      console.error("Error getting user data from AsyncStorage:", error);
    }
  };

  return (
    <Div styles="flexBox pv-70 ph-24  gap-20">
      <Div styles="row  items-center ">
        <ProfileIcon size={30} color="#0300A3" />
        <P styles="font">Profil</P>
      </Div>
      <Div styles="gap-10">
        <P styles="font">Hesap Bilgileri</P>
        <Touchable styles="w-320 h-61 bg-disabledLight rounded-10 pv-10 ph-10 row between">
          <Div styles="  gap-10">
            <P styles="font">Nickname</P>
            <P styles="font">{userData?.nick || ""}</P>
          </Div>
          <EditIcon color="#0300A3" />
        </Touchable>
        <Touchable styles="w-320 h-61 bg-disabledLight rounded-10 pv-10 ph-10 row between">
          <Div styles="  gap-10">
            <P styles="font">E-Mail</P>
            <P styles="font">{userData?.email || ""}</P>
          </Div>
          <EditIcon color="#0300A3" />
        </Touchable>
        <Touchable styles="w-320 h-61 bg-disabledLight rounded-10 pv-10 ph-10 row between">
          <Div styles="  gap-10">
            <P styles="font">Doğum Tarihi</P>
            <P styles="font">
              {userData?.birthDay && format(userData?.birthDay || "", "dd.MM.yyyy")}
            </P>
          </Div>
          <EditIcon color="#0300A3" />
        </Touchable>
        <Touchable styles="w-320 h-61 bg-disabledLight rounded-10 pv-10 ph-10 row between">
          <Div styles="  gap-10">
            <P styles="font">Cinsiyet</P>
            <P styles="font">{userData?.gender || ""}</P>
          </Div>
          <EditIcon color="#0300A3" />
        </Touchable>
        <Div styles="gap-10">
          <P styles="font c-disabled">Hakkımızda</P>
          <Touchable
            onPress={() => popUpref.current.open()}
            styles="w-320 h-38 bg-disabledLight rounded-10 pv-10 ph-10 row between">
            <P styles="font c-#0300A3">Gizlilik Politikası</P>
          </Touchable>
          <Touchable
            onPress={() => privacyRef.current.open()}
            styles="w-320 h-38 bg-disabledLight rounded-10 pv-10 ph-10 row between">
            <P styles="font c-#0300A3">Şartlar ve Koşullar</P>
          </Touchable>
        </Div>
      </Div>
      <Popup ref={popUpref}>
        <P>Gizlilik Politikası İçeriği</P>
      </Popup>
      <Popup ref={privacyRef}>
        <P>Şartlar içeriği</P>
      </Popup>
    </Div>
  );
}
