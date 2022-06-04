import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import HomeScreen from '~/screens/HomeScreen';
import SplashScreen from '~/screens/SplashScreen';

export type MainNavigatorParamsType = {
  Home: undefined;
  Splash: undefined;
};

const Stack = createNativeStackNavigator<MainNavigatorParamsType>();

const screenOptions: NativeStackNavigationOptions = {
  header: () => null,
  animation: 'fade',
};

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Home" component={HomeScreen} options={screenOptions} />
        <Stack.Screen name="Splash" component={SplashScreen} options={screenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
