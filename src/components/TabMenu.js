import React from "react";
import { View, StyleSheet } from "react-native";
import { hp, wp } from "../helpers/PixelCalculator";
import { Div, P, Touchable } from "../helpers/StyledElements";
import { HomeIcon, ProfileIcon, SurveyIcon } from "../helpers/GeneralIcons";

export default function TabMenu({ state, descriptors, navigation }) {
  return (
    <Div styles="absolute bottom-50 left-20 right-20 bg-black row around h-40 rounded-40 items-center  ">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Touchable
            key={`${index}.${label}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabItem,
              isFocused && styles.tabItemFocused,
              { backgroundColor: isFocused ? "blue" : "black" }, //
            ]}
            styles="items-center">
            {label === "Survey" && <SurveyIcon size={30} color={isFocused ? "#B1B0FF" : "white"} />}
            {label === "ProfilePage" && (
              <ProfileIcon size={30} color={isFocused ? "#B1B0FF" : "white"} />
            )}
            {label === "Dashboard" && (
              <Div styles="absolute bottom-20 w-40 h-40 contentCenter bg-#0300A3 rounded-40">
                <HomeIcon size={30} color={isFocused ? "#B1B0FF" : "white"} />
              </Div>
            )}

            <P styles="size-10 c-white">
              {(label !== "Dashboard" && label === "Survey" && "Anket") ||
                (label === "ProfilePage" && "Profil")}
            </P>
          </Touchable>
        );
      })}
    </Div>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: hp(90),
    left: 0,
    right: 0,

    height: hp(38),
    backgroundColor: "black",
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabItemFocused: {
    backgroundColor: "blue",
  },
});
