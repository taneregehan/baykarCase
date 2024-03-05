import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useFonts } from "expo-font";
import DashboardNavigator from "./components/DashboardNavigator";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  const Stack = createStackNavigator();

  const [loaded] = useFonts({
    custom: require("../assets/font.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={DashboardNavigator} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
