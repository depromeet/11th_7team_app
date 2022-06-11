import React, { useRef, useState } from 'react';
import { Linking, Platform, View } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

import { Error } from '~/components/Error';
import { YgtStatusBar } from '~/components/YgtStatusBar';
import theme from '~/styles/theme';

const uri = 'https://app.ygtang.kr/';

export default function HomeScreen() {
  const [isError, setIsError] = useState(false);
  const webViewRef = useRef<WebView>();

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

  if (isError) {
    return (
      <Error
        reload={() => {
          setIsError(false);
          webViewRef.current?.reload();
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.background }}>
      <YgtStatusBar />
      <WebView
        ref={ref => {
          if (!ref) return;
          webViewRef.current = ref;
        }}
        source={{ uri }}
        bounces={false}
        applicationNameForUserAgent={'YgtangApp/1.0'}
        allowsBackForwardNavigationGestures
        domStorageEnabled
        onError={() => {
          setIsError(true);
        }}
        onNavigationStateChange={handleExternalLinks}
        onShouldStartLoadWithRequest={handleExternalLinks}
      />
    </View>
  );
}
