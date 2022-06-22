import React, { useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { ShareMenuReactView } from 'react-native-share-menu';
import { WebView as RnWebView, WebViewMessageEvent } from 'react-native-webview';

import { ShareHandler } from '~/components/ShareHandler';
import { YgtStatusBar } from '~/components/YgtStatusBar';
import { SYNC_YGT_RT } from '~/constants/common';
import { useShareWebToken } from '~/hooks/useShareWebToken';
import theme from '~/styles/theme';

/**
 * Share for iOS
 */
const Share = () => {
  const [sharedData, setSharedData] = useState<string>();
  const [sharedMimeType, setSharedMimeType] = useState<string>();
  const webViewRef = useRef<RnWebView>();
  const { makeInjectedJavaScript, setRefreshToken } = useShareWebToken();

  const onReceiveMessage = async (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === SYNC_YGT_RT) {
      await setRefreshToken(data.data);
    }
  };

  const handleLoadEnd = async () => {
    const injectedRefreshJavaScript = await makeInjectedJavaScript();
    webViewRef?.current?.injectJavaScript(injectedRefreshJavaScript || '');
  };

  useEffect(() => {
    ShareMenuReactView.data().then(data => {
      if (Platform.OS === 'ios') {
        setSharedData(data.data);
        setSharedMimeType(data.mimeType);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.background }}>
      <YgtStatusBar />
      {sharedData && sharedMimeType && (
        <ShareHandler
          data={sharedData}
          mimeType={sharedMimeType}
          onLoadEnd={handleLoadEnd}
          onMessage={onReceiveMessage}
        />
      )}
    </View>
  );
};

export default Share;
