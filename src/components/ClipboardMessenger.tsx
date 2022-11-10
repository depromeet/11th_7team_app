import React, { useCallback, useEffect, useRef, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { AppState } from 'react-native';
import { WebView } from 'react-native-webview';

import { WEBVIEW_MESSAGE_TYPE } from '~/constants/common';
import { getStringPostMessageObject } from '~/utils/getStringPostMessageObject';

export interface ClipboardMessengerProps {
  children: JSX.Element;
  webViewRef: React.MutableRefObject<WebView | undefined>;
}

export function ClipboardMessenger({ children, webViewRef }: ClipboardMessengerProps) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(true);
  const [clipboardData, setClipboardData] = useState<string | null>(null);
  const isFirstRender = useRef(true);

  const sendClipboardDataToWebView = useCallback(
    data => {
      if (!webViewRef?.current || clipboardData?.trim() === '') return;
      webViewRef.current.postMessage(
        getStringPostMessageObject({
          type: WEBVIEW_MESSAGE_TYPE.CLIPBOARD_INSPIRATION,
          data,
        })
      );
    },
    [clipboardData, webViewRef]
  );

  const fetchCopiedText = useCallback(async () => {
    const text = await Clipboard.getString();
    const isNotEmptyText = text.trim() !== '' && text !== null;
    const isNotDuplicatedText = text !== clipboardData;
    if (isNotDuplicatedText && isNotEmptyText) {
      sendClipboardDataToWebView(text);
      setClipboardData(text);
    }
  }, [sendClipboardDataToWebView, clipboardData]);

  // 앱 실행 시 클립보드 체크
  useEffect(() => {
    fetchCopiedText();
  }, [fetchCopiedText]);

  // 앱 실행 후 splash로 인해 3500ms 지연
  useEffect(() => {
    const isClipboardData = clipboardData && clipboardData.trim() !== '';
    const DELAYED_TIME = 3500;
    if (isClipboardData && isFirstRender.current) {
      setTimeout(() => {
        sendClipboardDataToWebView(clipboardData);
      }, DELAYED_TIME);
      isFirstRender.current = false;
    }
  }, [clipboardData, appStateVisible, sendClipboardDataToWebView]);

  // 앱 동작 중 appState 변화에 따른 클립보드 체크
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      const isAppActivated = appState.current === 'active';

      setAppStateVisible(isAppActivated);
      if (isAppActivated) {
        fetchCopiedText();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [fetchCopiedText]);

  return <>{children}</>;
}
