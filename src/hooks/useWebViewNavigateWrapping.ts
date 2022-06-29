import { useState } from 'react';
import { WebViewMessageEvent } from 'react-native-webview';

export function useWebViewNavigateWrapping() {
  const [canGoBack, setCanGoBack] = useState(false);
  const [isAddPage, setIsAddPage] = useState(true);

  const handleMessage = ({ nativeEvent }: WebViewMessageEvent) => {
    if (nativeEvent.data === 'navigationStateChange') {
      setCanGoBack(nativeEvent.canGoBack);

      // share 페이지 여부 구분
      if (nativeEvent.url.includes('/add/')) {
        setIsAddPage(true);
      } else {
        setIsAddPage(false);
      }
    }
  };

  return {
    canGoBack,
    setCanGoBack,
    isAddPage,
    injectCode: WebViewInjectCode,
    handleMessage,
  };
}

// ref: https://github.com/react-native-webview/react-native-webview/issues/24#issuecomment-483956651
const WebViewInjectCode = `
    (function() {
      function wrap(fn) {
        return function wrapper() {
          var res = fn.apply(this, arguments);
          window.ReactNativeWebView.postMessage('navigationStateChange');
          return res;
        }
      }

      history.pushState = wrap(history.pushState);
      history.replaceState = wrap(history.replaceState);
      window.addEventListener('popstate', function() {
        window.ReactNativeWebView.postMessage('navigationStateChange');
      });
    })();
    true;
  `;
