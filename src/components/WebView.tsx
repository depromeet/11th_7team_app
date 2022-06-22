import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, BackHandler, Linking, Platform } from 'react-native';
import { WebView as RnWebView, WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';

import { Error } from '~/components/Error';
import theme from '~/styles/theme';

interface WebViewProps {
  uri: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  customRef?: (ref: any) => void | undefined;
  onMessage?: (event: WebViewMessageEvent) => void;
  onNavigate?: (event: WebViewNavigation) => boolean;
  onLoadEnd?: () => void;
}

export default function WebView({
  uri,
  customRef,
  onMessage,
  onNavigate,
  onLoadEnd,
}: WebViewProps) {
  const [isError, setIsError] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const webViewRef = useRef<RnWebView>();
  const fadeAnimationRef = useRef(new Animated.Value(0));

  const animationConfig: Animated.TimingAnimationConfig = useMemo(() => {
    return { useNativeDriver: false, toValue: 1, duration: 1700 };
  }, []);

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

  const handleNavigate = (event: WebViewNavigation) => {
    if (onNavigate && onNavigate(event)) {
      return true;
    }
    return handleExternalLinks(event);
  };

  const handleBackButtonPress = useCallback(() => {
    try {
      webViewRef.current?.goBack();
      return true;
    } catch (err) {
      console.log('[handleBackButtonPress] Error : ', err);
    }
  }, [webViewRef]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPress);
      };
    }
  }, [handleBackButtonPress]);

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
    <Animated.View
      style={{
        width: '100%',
        height: '100%',
        opacity: fadeAnimationRef.current,
        backgroundColor: theme.color.background,
      }}
    >
      <RnWebView
        ref={
          customRef
            ? customRef
            : ref => {
                if (!ref) return;
                webViewRef.current = ref;
              }
        }
        source={{ uri }}
        bounces={false}
        applicationNameForUserAgent={'YgtangApp/1.0'}
        allowsBackForwardNavigationGestures
        domStorageEnabled
        onError={() => {
          setIsError(true);
        }}
        onLoadEnd={onLoadEnd}
        onNavigationStateChange={handleNavigate}
        onShouldStartLoadWithRequest={handleNavigate}
        style={{
          backgroundColor: theme.color.background,
        }}
        onMessage={onMessage}
      />
    </Animated.View>
  );
}
