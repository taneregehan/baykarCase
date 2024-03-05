import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../pages/Dashboard";
import Survey from "../pages/Survey";
import TabMenu from "./TabMenu";
import ProfilePage from "../pages/ProfilePage";

const Tab = createBottomTabNavigator();

export default function DashboardNavigator() {
  return (
    <Tab.Navigator
      tabBar={TabMenu}
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Survey" component={Survey} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="ProfilePage" component={ProfilePage} />
    </Tab.Navigator>
  );
}
