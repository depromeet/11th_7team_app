import React from 'react';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native';

import theme from '~/styles/theme';

function SplashScreen() {
  const onSplashFinish = () => {
    console.log('ye');
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.background }}>
      <LottieView
        source={require('../../assets/ygt-splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={onSplashFinish}
      />
    </SafeAreaView>
  );
}

export default SplashScreen;
