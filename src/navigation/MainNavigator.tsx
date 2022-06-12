import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackCardStyleInterpolator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

import HomeScreen from '~/screens/HomeScreen';
import SplashScreen from '~/screens/SplashScreen';

export type MainNavigatorParamsType = {
  Home: undefined;
  Splash: undefined;
};

const Stack = createStackNavigator<MainNavigatorParamsType>();

const animationConfig: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 0,
    delay: 0,
  },
};

const cardStyleInterpolator: StackCardStyleInterpolator = () => {
  return {
    overlayStyle: {
      backgroundColor: 'transparent',
    },
    cardTransparent: true,
  };
};

const screenOptions: StackNavigationOptions = {
  presentation: 'transparentModal',
  gestureEnabled: false,
  transitionSpec: {
    open: animationConfig,
    close: animationConfig,
  },
};

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={() => ({
          headerShown: false,
          cardStyleInterpolator: cardStyleInterpolator,
        })}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={screenOptions} />
        <Stack.Screen name="Splash" component={SplashScreen} options={screenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
