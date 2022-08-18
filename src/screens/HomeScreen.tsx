import React, { useCallback, useEffect, useRef, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { AppState } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView as RnWebView, WebViewMessageEvent } from 'react-native-webview';

import WebView from '~/components/WebView';
import { BASE_URI, SYNC_YGT_RT, WEBVIEW_MESSAGE_TYPE } from '~/constants/common';
import { useShareWebToken } from '~/hooks/useShareWebToken';
import theme from '~/styles/theme';
import { getStringPostMessageObject } from '~/utils/getStringPostMessageObject';

export default function HomeScreen() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [clipboardData, setClipboardData] = useState<string | null>(null);
  const webViewRef = useRef<RnWebView>();
  const { makeInjectedJavaScript, setRefreshToken } = useShareWebToken();

  const sendClipboardDataToWebView = useCallback(() => {
    if (!webViewRef?.current) return;
    if (clipboardData?.trim() === '') return;
    webViewRef.current.postMessage(
      getStringPostMessageObject({
        type: WEBVIEW_MESSAGE_TYPE.CLIPBOARD_INSPIRATION,
        data: clipboardData,
      })
    );
  }, [clipboardData]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if (appState.current === 'active') {
        if (clipboardData && clipboardData.trim() !== '') {
          sendClipboardDataToWebView();
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [clipboardData, sendClipboardDataToWebView]);

  const handleLoadEnd = async () => {
    const injectedRefreshJavaScript = await makeInjectedJavaScript();
    webViewRef?.current?.injectJavaScript(injectedRefreshJavaScript || '');
  };

  const onReceiveMessage = async (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === SYNC_YGT_RT) {
      await setRefreshToken(data.data);
    }
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    if (text.trim() !== '' && text !== null) {
      return setClipboardData(text);
    }
  };

  useEffect(() => {
    if (!appStateVisible) return;
    fetchCopiedText();
  }, [appStateVisible]);

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: theme.color.background }}
    >
      <WebView
        customRef={webViewRef}
        uri={BASE_URI}
        onLoadEnd={handleLoadEnd}
        onMessage={onReceiveMessage}
      />
    </SafeAreaView>
  );
}
