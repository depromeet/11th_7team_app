import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import WebView from '~/components/WebView';
import { BASE_URI } from '~/constants/common';
import theme from '~/styles/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: theme.color.background }}
    >
      <WebView uri={BASE_URI} />
    </SafeAreaView>
  );
}
