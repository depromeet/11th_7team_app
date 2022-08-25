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
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const isFirstRender = useRef(true);
  const [clipboardData, setClipboardData] = useState<string | null>(null);

  const sendClipboardDataToWebView = useCallback(() => {
    if (!webViewRef?.current) return;
    if (clipboardData?.trim() === '') return;
    webViewRef.current.postMessage(
      getStringPostMessageObject({
        type: WEBVIEW_MESSAGE_TYPE.CLIPBOARD_INSPIRATION,
        data: clipboardData,
      })
    );
  }, [clipboardData, webViewRef]);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    if (text.trim() !== '' && text !== null) {
      return setClipboardData(text);
    }
  };

  useEffect(() => {
    const isClipboardData = clipboardData && clipboardData.trim() !== '';

    if (isClipboardData && isFirstRender.current) {
      setTimeout(() => {
        sendClipboardDataToWebView();
      }, 3500);
      isFirstRender.current = false;
    }

    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      const isAppActivated = appState.current === 'active';
      setAppStateVisible(appState.current);
      if (isAppActivated && isClipboardData) {
        sendClipboardDataToWebView();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [clipboardData, sendClipboardDataToWebView]);

  useEffect(() => {
    if (!appStateVisible) return;
    fetchCopiedText();
  }, [appStateVisible]);

  return <>{children}</>;
}
