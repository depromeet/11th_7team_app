import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

import { MainNavigatorParamsType } from '~/navigation/MainNavigator';
import theme from '~/styles/theme';

interface SplashScreenProp {
  navigation: NativeStackNavigationProp<MainNavigatorParamsType>;
}

export default function SplashScreen({ navigation: { replace } }: SplashScreenProp) {
  const onSplashFinish = () => {
    replace('Home');
  };

  return (
    <View style={styles.root}>
      <LottieView
        source={require('../assets/ygt-splash.json')}
        autoPlay
        loop={false}
        style={{ backgroundColor: theme.color.blue, height: 374, marginBottom: 34 }}
        onAnimationFinish={onSplashFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#A2B2BA',
  },
});
