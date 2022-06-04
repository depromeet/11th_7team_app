import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import MainNavigator from '~/navigation/MainNavigator';
import theme from '~/styles/theme';

export default function App() {
  return (
    <>
      <StatusBar hidden />
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
