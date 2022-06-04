import React from 'react';
import { Linking, Platform, SafeAreaView, StatusBar } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

import theme from '~/styles/theme';

const uri = 'https://app.ygtang.kr/';

export default function HomeScreen() {
  const handleExternalLinks = (event: WebViewNavigation) => {
    const isExternalLink =
      Platform.OS === 'ios' ? event.navigationType === 'click' : true;
    if (isExternalLink) {
      Linking.canOpenURL(event.url).then(supported => {
        if (supported) {
          Linking.openURL(event.url);
        }
      });
      return false;
    }
    return true;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.color.background} />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.background }}>
        <WebView
          source={{ uri }}
          bounces={false}
          domStorageEnabled
          onNavigationStateChange={handleExternalLinks}
          onShouldStartLoadWithRequest={handleExternalLinks}
        />
      </SafeAreaView>
    </>
  );
}
