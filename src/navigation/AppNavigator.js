import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import WardrobeScreen from '../screens/WardrobeScreen';
import OutfitsScreen from '../screens/OutfitsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddGarmentScreen from '../screens/AddGarmentScreen';
import CreateOutfitScreen from '../screens/CreateOutfitScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function EmojiIcon({ emoji, focused }) {
  return (
    <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.55 }}>{emoji}</Text>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 72,
          paddingBottom: 10,
          paddingTop: 8,
          borderTopColor: '#F0E5EA',
        },
        tabBarActiveTintColor: '#F45B8A',
        tabBarInactiveTintColor: '#8B8B8B',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <EmojiIcon emoji="🏠" focused={focused} /> }}
      />
      <Tab.Screen
        name="Armario"
        component={WardrobeScreen}
        options={{ tabBarIcon: ({ focused }) => <EmojiIcon emoji="👗" focused={focused} /> }}
      />
      <Tab.Screen
        name="Outfits"
        component={OutfitsScreen}
        options={{ tabBarIcon: ({ focused }) => <EmojiIcon emoji="✨" focused={focused} /> }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ focused }) => <EmojiIcon emoji="👤" focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="AddGarment" component={AddGarmentScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="CreateOutfit" component={CreateOutfitScreen} />
    </Stack.Navigator>
  );
}
