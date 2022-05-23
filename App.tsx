import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#D6DBDC' }}>
        <WebView source={{ uri: 'https://app.ygtang.kr' }} />
      </SafeAreaView>
    </>
  );
};

export default App;
