import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import MainNavigator from '~/navigation/MainNavigator';
import theme from '~/styles/theme';

export default function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.root}>
        <MainNavigator />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
});
