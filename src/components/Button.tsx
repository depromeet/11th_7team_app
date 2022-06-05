import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import theme from '~/styles/theme';

export interface ButtonProps {
  onPress?: () => void;
  children: string;
}

export function Button({ onPress, children }: ButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 4,
    elevation: 0,
    backgroundColor: theme.color.primary,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
