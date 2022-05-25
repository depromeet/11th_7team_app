import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '~/screens/HomeScreen';
import SplashScreen from '~/screens/SplashScreen';

export type MainNavigatorParamsType = {
  Home: undefined;
  Splash: undefined;
};

const Stack = createNativeStackNavigator<MainNavigatorParamsType>();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => null }} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ header: () => null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
