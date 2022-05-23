import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

import theme from '~/styles/theme';

function Main() {
  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.background }}>
        <WebView source={{ uri: 'https://app.ygtang.kr' }} />
      </SafeAreaView>
    </>
  );
}

export default Main;
