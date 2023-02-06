import React, { useEffect, useRef, useState } from 'react';
import { Linking, Platform, View } from 'react-native';
import { ShareMenuReactView } from 'react-native-share-menu';
import { WebView, WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import URL from 'url-parse';

import { Error } from '~/components/Error';
import { YgtStatusBar } from '~/components/YgtStatusBar';
import {
  BASE_URI,
  SHARE_WEB_MESSAGE_STATE,
  SYNC_YGT_RT,
  WEBVIEW_MESSAGE_TYPE,
} from '~/constants/common';
import { useShareWebToken } from '~/hooks/useShareWebToken';
import theme from '~/styles/theme';
import { getStringPostMessageObject } from '~/utils/getStringPostMessageObject';

const CONTENT_TYPE = {
  IMAGE: 'IMAGE',
  TEXT: 'TEXT',
  LINK: 'LINK',
} as const;

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

const Share = () => {
  const [isError, setIsError] = useState(false);
  const [sharedData, setSharedData] = useState<string | ArrayBuffer>();
  const [sharedMimeType, setSharedMimeType] = useState<string | ArrayBuffer>();
  const [contentType, setContentType] = useState<string>('');
  const webViewRef = useRef<WebView>();
  const { makeInjectedJavaScript, setRefreshToken } = useShareWebToken();

  const setContentHandler = async ({ data, mimeType }: { data: string; mimeType: string }) => {
    setSharedMimeType(mimeType);
    if (mimeType.startsWith('image/')) {
      setContentType(CONTENT_TYPE.IMAGE);
      const imageData = await urlTo64File(data);
      setSharedData(imageData);
    } else if (mimeType !== 'text/plain') {
      ShareMenuReactView.dismissExtension('지원하지 않는 형식입니다.');
    } else if (isURL(data)) {
      setContentType(CONTENT_TYPE.LINK);
      setSharedData(data);
    } else {
      setContentType(CONTENT_TYPE.TEXT);
      setSharedData(data);
    }
  };

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

  const sendDataToWebView = () => {
    if (!webViewRef?.current) return;

    webViewRef.current.postMessage(
      getStringPostMessageObject({
        type: WEBVIEW_MESSAGE_TYPE.SHARE_EXTENTION_MESSAGE_TYPE,
        data: sharedData,
        mimeType: sharedMimeType,
      })
    );
  };

  const handleShareWebMessage = (data: { type: string; data: string }) => {
    if (data.type !== SHARE_WEB_MESSAGE_STATE) return;
    switch (data.data) {
      case 'READY':
        sendDataToWebView();
        break;
      case 'SHARE_COMPLETE':
        ShareMenuReactView.dismissExtension();
        break;
      default:
        return;
    }
  };

  const onReceiveMessage = async (event: WebViewMessageEvent) => {
    if (typeof event.nativeEvent.data === 'string') return;

    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === SYNC_YGT_RT) {
      await setRefreshToken(data.data);
    }
    handleShareWebMessage(data);
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

  useEffect(() => {
    ShareMenuReactView.data().then(data => {
      if (Platform.OS === 'ios') {
        setContentHandler(data);
      }
    });
  }, []);

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

  const handleLoadEnd = async () => {
    const injectedRefreshJavaScript = await makeInjectedJavaScript();
    webViewRef?.current?.injectJavaScript(injectedRefreshJavaScript || '');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.background }}>
      <YgtStatusBar />
      {sharedData && (
        <WebView
          ref={ref => {
            if (!ref) return;
            webViewRef.current = ref;
          }}
          source={{ uri: getAddContentURI() }}
          onLoadEnd={handleLoadEnd}
          bounces={false}
          applicationNameForUserAgent={'YgtangApp/1.0'}
          allowsBackForwardNavigationGestures
          domStorageEnabled
          onError={() => {
            setIsError(true);
          }}
          onNavigationStateChange={handleExternalLinks}
          onShouldStartLoadWithRequest={handleExternalLinks}
          onMessage={onReceiveMessage}
        />
      )}
    </View>
  );
};

export default Share;
