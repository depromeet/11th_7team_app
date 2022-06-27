import React, { useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { ShareMenuReactView } from 'react-native-share-menu';
import { WebView as RnWebView, WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import URL from 'url-parse';

import WebView from '~/components/WebView';
import { BASE_URI, SYNC_YGT_RT } from '~/constants/common';
import { useShareWebToken } from '~/hooks/useShareWebToken';
import theme from '~/styles/theme';

const CONTENT_TYPE = {
  IMAGE: 'IMAGE',
  TEXT: 'TEXT',
  LINK: 'LINK',
} as const;

const SHARE_EXTENTION_MESSAGE_TYPE = 'YgtangAppShareData';
const SHARE_WEB_MESSAGE_STATE = 'YgtangWebShareState';

async function urlTo64File(url: string): Promise<string | ArrayBuffer> {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
}

function isURL(url: string): boolean {
  return URL(url).origin !== 'null';
}

interface Props {
  data: string;
  mimeType: string;
  handleClose?: () => void;
  onMessage?: (event: WebViewMessageEvent) => void;
  onLoadEnd?: () => void;
}

export const ShareHandler = ({ data, mimeType, handleClose, onMessage, onLoadEnd }: Props) => {
  const webViewRef = useRef<RnWebView>();

  // share
  const [contentType, setContentType] = useState<string>('');
  const [sharedData, setSharedData] = useState<string | ArrayBuffer>();
  const [sharedMimeType, setSharedMimeType] = useState<string | ArrayBuffer>();

  const { makeInjectedJavaScript, setRefreshToken } = useShareWebToken();

  const handleNavigateChange = (event: WebViewNavigation) => {
    if (
      handleClose &&
      Platform.OS === 'android' &&
      event.canGoForward &&
      event.url === 'about:blank'
    ) {
      handleClose();
    }
    return false;
  };

  const handleLoadEnd = async () => {
    if (onLoadEnd) {
      onLoadEnd();
    }
    if (Platform.OS === 'ios') {
      const injectedRefreshJavaScript = await makeInjectedJavaScript();
      webViewRef?.current?.injectJavaScript(injectedRefreshJavaScript || '');
    }
  };

  const sendDataToWebView = () => {
    if (!webViewRef?.current) return;

    webViewRef.current.postMessage(
      JSON.stringify({
        type: SHARE_EXTENTION_MESSAGE_TYPE,
        data: sharedData,
        mimeType: sharedMimeType,
      })
    );
  };

  const getAddContentURI = () => {
    switch (contentType) {
      case CONTENT_TYPE.IMAGE:
        return BASE_URI + 'add/image';
      case CONTENT_TYPE.LINK:
        return BASE_URI + 'add/link';
      case CONTENT_TYPE.TEXT:
        return BASE_URI + 'add/text';
      default:
        return '';
    }
  };

  const onReceiveMessage = async (event: WebViewMessageEvent) => {
    if (onMessage) {
      onMessage(event);
    }
    const data = JSON.parse(event.nativeEvent.data);

    // ShareWebToken
    if (Platform.OS === 'ios' && data.type === SYNC_YGT_RT) {
      await setRefreshToken(data.data);
    }

    // 공유 핸들링
    if (data.type === SHARE_WEB_MESSAGE_STATE && data.data === 'READY') {
      sendDataToWebView();
    }
  };

  useEffect(() => {
    if (data && mimeType) {
      setSharedMimeType(mimeType);
      if (mimeType.startsWith('image/')) {
        setContentType(CONTENT_TYPE.IMAGE);

        // Promise
        urlTo64File(data).then(imageData => {
          setSharedData(imageData);
        });
      } else if (mimeType !== 'text/plain') {
        ShareMenuReactView.dismissExtension('지원하지 않는 형식입니다.');
      } else if (isURL(data)) {
        setContentType(CONTENT_TYPE.LINK);
        setSharedData(data);
      } else {
        setContentType(CONTENT_TYPE.TEXT);
        setSharedData(data);
      }
    }
  }, [data, mimeType]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.background }}>
      <WebView
        uri={getAddContentURI()}
        customRef={webViewRef}
        onMessage={onReceiveMessage}
        onNavigate={handleNavigateChange}
        onLoadEnd={handleLoadEnd}
      />
    </View>
  );
};
