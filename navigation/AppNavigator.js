
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../src/screens/auth/LoginScreen";
import RegisterScreen from "../src/screens/auth/RegisterScreen";

import HomeScreen from "../src/screens/HomeScreen";
import ClosetScreen from "../src/screens/ClosetScreen";
import AddClothingScreen from "../src/screens/AddClothingScreen";
import OutfitBuilderScreen from "../src/screens/OutfitBuilderScreen";
import PerfilScreen from "../src/screens/PerfilScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Armario" component={ClosetScreen} />
      <Tab.Screen name="Outfits" component={OutfitBuilderScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{headerShown:false}}/>
      <Stack.Screen name="AddClothing" component={AddClothingScreen} />
    </Stack.Navigator>
  );
}
