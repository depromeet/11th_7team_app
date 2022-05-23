import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { MainNavigatorParamsType } from '~/navigation/MainNavigator';
import theme from '~/styles/theme';

interface SplashScreenProp {
  navigation: NativeStackNavigationProp<MainNavigatorParamsType>;
}

export default function SplashScreen({ navigation: { replace } }: SplashScreenProp) {
  const onSplashFinish = () => {
    replace('Home');
    console.log(replace);
  };

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.root}>
        <LottieView
          source={require('../assets/ygt-splash.json')}
          autoPlay
          loop={false}
          onAnimationFinish={onSplashFinish}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: theme.color.background,
  },
});
