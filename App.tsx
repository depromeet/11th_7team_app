import React from 'react';
import { StyleSheet, View } from 'react-native';

import { YgtStatusBar } from '~/components/YgtStatusBar';
import MainNavigator from '~/navigation/MainNavigator';
import theme from '~/styles/theme';

export default function App() {
  return (
    <>
      <YgtStatusBar />
      <View style={styles.root}>
        <MainNavigator />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
});
