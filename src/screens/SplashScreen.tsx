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
        duration={2000}
        style={{ height: 374 }}
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
    backgroundColor: theme.color.gray02,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 34,
  },
});
