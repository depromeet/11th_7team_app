import React from 'react';
import { Dimensions, Linking, Platform, StatusBar, View } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

import theme from '~/styles/theme';

const uri = 'https://app.ygtang.kr/';

export default function HomeScreen() {
  const handleExternalLinks = (event: WebViewNavigation) => {
    const isExternalLink = Platform.OS === 'ios' ? event.navigationType === 'click' : true;
    if (isExternalLink) {
      Linking.canOpenURL(event.url).then(supported => {
        if (supported) {
          Linking.openURL(event.url);
        }
      });
      return false;
    }
    return true;
  };

  const INJECTED_JAVASCRIPT = `(function() {
    const style = document.createElement('style');
    style.innerHTML = \`
      .safeAreaTop {
        height: ${StatusBar.currentHeight}px !important;
      }
      .safeAreaBottom {
        height: ${Dimensions.get('screen').height - Dimensions.get('window').height}px !important;
      }
    \`;
    document.head.appendChild(style);
  })();`;

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.background }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
        hidden={false}
      />
      <WebView
        source={{ uri }}
        bounces={false}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        applicationNameForUserAgent={'YgtangApp/1.0'}
        domStorageEnabled
        onNavigationStateChange={handleExternalLinks}
        onShouldStartLoadWithRequest={handleExternalLinks}
      />
    </View>
  );
}
