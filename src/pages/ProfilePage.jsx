import React, { useEffect, useRef, useState } from "react";
import { Div, P, Touchable } from "../helpers/StyledElements";
import { EditIcon, ProfileIcon } from "../helpers/GeneralIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import Popup from "../helpers/PopUp";
import StringInput from "../helpers/StringInput";

export default function ProfilePage() {
  const [userData, setUserData] = useState({});
  const [editedUserData, setEditedUserData] = useState({});
  const privacyRef = useRef(null);
  const popUpref = useRef(null);
  const [editModeNickname, setEditModeNickname] = useState(false);
  const [editModeEmail, setEditModeEmail] = useState(false);
  const [editModeGender, setEditModeGender] = useState(false);
  const [editModeBirth, setEditModeBirth] = useState(false);

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

  const handleEditClickNickname = () => {
    setEditModeNickname(true);
  };

  const handleEditClickEmail = () => {
    setEditModeEmail(true);
  };

  const handleEditClickGender = () => {
    setEditModeGender(true);
  };

  const handleEditClickBirth = () => {
    setEditModeBirth(true);
  };

  const handleSaveClickNickname = () => {
    setEditModeNickname(false);
    handleSaveChanges("nick");
  };

  const handleSaveClickEmail = () => {
    setEditModeEmail(false);
    handleSaveChanges("email");
  };

  const handleSaveClickGender = () => {
    setEditModeGender(false);
    handleSaveChanges("gender");
  };

  const handleSaveClickBirth = () => {
    setEditModeBirth(false);
    handleSaveChanges("birth");
  };

  const handleCancelClickNickname = () => {
    setEditModeNickname(false);
    setEditedUserData({});
  };

  const handleCancelClickEmail = () => {
    setEditModeEmail(false);
    setEditedUserData({});
  };

  const handleCancelClickGender = () => {
    setEditModeGender(false);
    setEditedUserData({});
  };

  const handleCancelClickBirth = () => {
    setEditModeBirth(false);
    setEditedUserData({});
  };

  const handleSaveChanges = async (key) => {
    try {
      const userDataJSON = await AsyncStorage.getItem("userData");
      let userData = {};
      if (userDataJSON !== null) {
        userData = JSON.parse(userDataJSON);
      }

      const updatedUserData = { ...userData, ...editedUserData };
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      setEditedUserData({});
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleInputChange = (key, value) => {
    setEditedUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <Div styles="flexBox pv-70 ph-24 gap-20">
      <Div styles="row items-center">
        <ProfileIcon size={30} color="#0300A3" />
        <P styles="font">Profil</P>
      </Div>
      <Div styles="gap-10">
        <P styles="font">Hesap Bilgileri</P>
        <Div styles="w-320 h-61 bg-disabledLight rounded-10 pv-10 ph-10 row between">
          <Div styles="gap-10 w-100">
            <P styles="font">Nickname</P>
            <Div styles="font w-100">
              {editModeNickname ? (
                <StringInput onChangeText={(text) => handleInputChange("nick", text)} />
              ) : (
                <P> {userData?.email || ""}</P>
              )}
            </Div>
          </Div>
          {editModeNickname ? (
            <Div styles="row gap-10 ">
              <Touchable
                onPress={handleSaveClickNickname}
                styles="bg-successLight rounded-10 pv-10 ph-20">
                <P styles="font c-success">Güncelle</P>
              </Touchable>
              <Touchable
                onPress={handleCancelClickNickname}
                styles="bg-dangerLight rounded-10 pv-10 ph-20">
                <P styles="font c-danger">Vazgeç</P>
              </Touchable>
            </Div>
          ) : (
            <Touchable styles="pv-20 ph-20" onPress={handleEditClickNickname}>
              <EditIcon color="#0300A3" />
            </Touchable>
          )}
        </Div>

        <Div styles="w-320 h-61 bg-disabledLight rounded-10 pv-10 ph-10 row between">
          <Div styles="gap-10 w-100">
            <P styles="font">E-mail</P>
            <Div styles="font w-100">
              {editModeEmail ? (
                <StringInput onChangeText={(text) => handleInputChange("email", text)} />
              ) : (
                <P> {userData?.email || ""}</P>
              )}
            </Div>
          </Div>
          {editModeEmail ? (
            <Div styles="row gap-10 ">
              <Touchable
                onPress={handleSaveClickEmail}
                styles="bg-successLight rounded-10 pv-10 ph-20">
                <P styles="font c-success">Güncelle</P>
              </Touchable>
              <Touchable
                onPress={handleCancelClickEmail}
                styles="bg-dangerLight rounded-10 pv-10 ph-20">
                <P styles="font c-danger">Vazgeç</P>
              </Touchable>
            </Div>
          ) : (
            <Touchable styles="pv-20 ph-20" onPress={handleEditClickEmail}>
              <EditIcon color="#0300A3" />
            </Touchable>
          )}
        </Div>

        <Div styles="w-320 h-61 bg-disabledLight rounded-10 pv-10 ph-10 row between">
          <Div styles="gap-10 w-100">
            <P styles="font">Cinsiyet</P>
            <Div styles="font w-100">
              {editModeGender ? (
                <StringInput
                  value={editedUserData.gender || userData?.gender || ""}
                  onChangeText={(text) => handleInputChange("gender", text)}
                />
              ) : (
                <P> {userData?.gender || ""}</P>
              )}
            </Div>
          </Div>
          {editModeGender ? (
            <Div styles="row gap-10 ">
              <Touchable
                onPress={handleSaveClickGender}
                styles="bg-successLight rounded-10 pv-10 ph-20">
                <P styles="font c-success">Güncelle</P>
              </Touchable>
              <Touchable
                onPress={handleCancelClickGender}
                styles="bg-dangerLight rounded-10 pv-10 ph-20">
                <P styles="font c-danger">Vazgeç</P>
              </Touchable>
            </Div>
          ) : (
            <Touchable styles="pv-20 ph-20" onPress={handleEditClickGender}>
              <EditIcon color="#0300A3" />
            </Touchable>
          )}
        </Div>

        <Div styles="w-320 h-61 bg-disabledLight rounded-10 pv-10 ph-10 row between">
          <Div styles="gap-10 w-100">
            <P styles="font">Doğum Tarihi</P>
            <Div styles="font w-100">
              {editModeBirth ? (
                <StringInput onChangeText={(text) => handleInputChange("birthDay", text)} />
              ) : (
                <P> {userData?.birthDay && format(userData?.birthDay || "", "dd.MM.yyyy")}</P>
              )}
            </Div>
          </Div>
          {editModeBirth ? (
            <Div styles="row gap-10 ">
              <Touchable
                onPress={handleSaveClickBirth}
                styles="bg-successLight rounded-10 pv-10 ph-20">
                <P styles="font c-success">Güncelle</P>
              </Touchable>
              <Touchable
                onPress={handleCancelClickBirth}
                styles="bg-dangerLight rounded-10 pv-10 ph-20">
                <P styles="font c-danger">Vazgeç</P>
              </Touchable>
            </Div>
          ) : (
            <Touchable styles="pv-20 ph-20" onPress={handleEditClickBirth}>
              <EditIcon color="#0300A3" />
            </Touchable>
          )}
        </Div>
      </Div>

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
      <Popup ref={popUpref}>
        <P>Gizlilik Politikası İçeriği</P>
      </Popup>
      <Popup ref={privacyRef}>
        <P>Şartlar içeriği</P>
      </Popup>
    </Div>
  );
}
