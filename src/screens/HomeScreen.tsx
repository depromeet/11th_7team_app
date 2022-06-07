import React, { useRef, useState } from 'react';
import { Linking, Platform, StatusBar, View } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

import { Error } from '~/components/Error';
import { useAndroidSafeArea } from '~/hooks/useAndroidSafeArea';
import theme from '~/styles/theme';

const uri = 'https://app.ygtang.kr/';

export default function HomeScreen() {
  const [isError, setIsError] = useState(false);
  const webViewRef = useRef<WebView>();
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
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
        hidden={false}
      />
      <WebView
        ref={ref => {
          if (!ref) return;
          webViewRef.current = ref;
        }}
        source={{ uri }}
        bounces={false}
        injectedJavaScript={
          `(function(){
            ${[androidSafeAreaInjectScript].join('\n')}
          })();` as string
        }
        applicationNameForUserAgent={'YgtangApp/1.0'}
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
