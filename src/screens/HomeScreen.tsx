import React from 'react';
import { View } from 'react-native';

import WebView from '~/components/WebView';
import theme from '~/styles/theme';

const uri = 'https://app.ygtang.kr/';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.color.background }}>
      <WebView uri={uri} />
    </View>
  );
}
