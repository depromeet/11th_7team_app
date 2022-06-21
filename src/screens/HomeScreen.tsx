import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import WebView from '~/components/WebView';
import theme from '~/styles/theme';

const uri = 'https://app.ygtang.kr/';

export default function HomeScreen() {
  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: theme.color.background }}
    >
      <WebView uri={uri} />
    </SafeAreaView>
  );
}
