import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';

import { Error } from '~/components/Error';
import { BASE_URI, SYNC_YGT_RT } from '~/constants/common';
import { useShareWebToken } from '~/hooks/useShareWebToken';
import theme from '~/styles/theme';

export default function HomeScreen() {
  const [isError, setIsError] = useState(false);
  const webViewRef = useRef<WebView>();
  const fadeAnimationRef = useRef(new Animated.Value(0));
  const { makeInjectedJavaScript, setRefreshToken } = useShareWebToken();

  const animationConfig: Animated.TimingAnimationConfig = useMemo(() => {
    return { useNativeDriver: false, toValue: 1, duration: 1700 };
  }, []);

  const handleLoadEnd = async () => {
    const injectedRefreshJavaScript = await makeInjectedJavaScript();
    webViewRef?.current?.injectJavaScript(injectedRefreshJavaScript || '');
  };

  useEffect(() => {
    Animated.timing(fadeAnimationRef.current, animationConfig).start();
  }, [animationConfig]);

  const handleExternalLinks = (event: WebViewNavigation) => {
    if (Platform.OS !== 'ios') {
      return false;
    }

    const isExternalLink = event.navigationType === 'click';
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

  const onReciveMessage = async (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === SYNC_YGT_RT) {
      await setRefreshToken(data.data);
    }
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: theme.color.background }}
    >
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          opacity: fadeAnimationRef.current,
          backgroundColor: theme.color.background,
        }}
      >
        <WebView
          ref={ref => {
            if (!ref) return;
            webViewRef.current = ref;
          }}
          source={{ uri: BASE_URI }}
          bounces={false}
          applicationNameForUserAgent={'YgtangApp/1.0'}
          allowsBackForwardNavigationGestures
          onLoadEnd={handleLoadEnd}
          domStorageEnabled
          onError={() => {
            setIsError(true);
          }}
          onNavigationStateChange={handleExternalLinks}
          onShouldStartLoadWithRequest={handleExternalLinks}
          style={{
            backgroundColor: theme.color.background,
          }}
          onMessage={onReciveMessage}
        />
      </Animated.View>
    </SafeAreaView>
  );
}
