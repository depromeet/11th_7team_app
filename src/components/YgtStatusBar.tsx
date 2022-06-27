import React from 'react';
import { StatusBar } from 'react-native';

interface StatusBarProps {
  bgColor?: string;
}

export function YgtStatusBar({ bgColor = '#D6DBDC' }: StatusBarProps) {
  return <StatusBar backgroundColor={bgColor} barStyle={'dark-content'} />;
}
