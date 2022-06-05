import React from 'react';
import { Linking, Platform, View } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

import { useAndroidSafeArea } from '~/hooks/useAndroidSafeArea';
import theme from '~/styles/theme';

const uri = 'https://app.ygtang.kr/';

export default function HomeScreen() {
  const { androidSafeAreaInjectScript } = useAndroidSafeArea();

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

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.background }}>
      <WebView
        source={{ uri }}
        bounces={false}
        injectedJavaScript={
          `(function(){
            ${[androidSafeAreaInjectScript].join('\n')}
          })();` as string
        }
        applicationNameForUserAgent={'YgtangApp/1.0'}
        domStorageEnabled
        onNavigationStateChange={handleExternalLinks}
        onShouldStartLoadWithRequest={handleExternalLinks}
      />
    </View>
  );
}
