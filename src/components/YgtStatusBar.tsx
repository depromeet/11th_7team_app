import React from 'react';
import { Platform, StatusBar } from 'react-native';

export function YgtStatusBar() {
  if (Platform.OS === 'ios') {
    return <StatusBar hidden={true} />;
  }
  return <StatusBar backgroundColor="#D6DBDC" barStyle={'dark-content'} />;
}
