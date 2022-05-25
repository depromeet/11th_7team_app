import React from 'react';
import { Linking, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

import theme from '~/styles/theme';

export default function HomeScreen() {
  const uri = 'https://app.ygtang.kr/';
  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.background }}>
        <WebView
          source={{ uri }}
          onNavigationStateChange={event => {
            if (!event.url.includes(uri)) {
              Linking.openURL(event.url);
              return false;
            }
            return true;
          }}
        />
      </SafeAreaView>
    </>
  );
}
