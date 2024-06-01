import React from "react";
import Login from "./pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useFonts } from "expo-font";
import DashboardNavigator from "./components/DashboardNavigator";
import ProfilePage from "./pages/ProfilePage";
import { SurveyProvider } from "./hooks/SurveyContext";
import SurveyResults from "./pages/SurveyResults";

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
      <SurveyProvider>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={DashboardNavigator} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="SurveyResults" component={SurveyResults} />
        </Stack.Navigator>
      </SurveyProvider>
    </NavigationContainer>
  );
}
