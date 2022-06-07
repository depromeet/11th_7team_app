import React from 'react';
import { Platform, StatusBar } from 'react-native';

export function YgtStatusBar() {
  if (Platform.OS === 'ios') {
    return <StatusBar hidden={true} />;
  }
  return (
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'} hidden={false} />
  );
}
