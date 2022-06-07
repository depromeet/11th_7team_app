import React from 'react';
import { Image, Text, View } from 'react-native';

import theme from '~/styles/theme';

import { Button } from './Button';

export function Error({ reload }: { reload: () => void }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.color.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}
    >
      <Image
        style={{ width: 275, height: 174.25 }}
        source={require('../assets/error_character.png')}
      />
      <View style={{ height: 32 }} />
      <Text
        style={{ color: theme.color.black, fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}
      >
        Oops! 문제가 발생했어요!
      </Text>
      <Text
        style={{ color: theme.color.gray04, fontSize: 18, marginBottom: 8, textAlign: 'center' }}
      >
        네트워크 상태가 올바른지 확인해주세요.
      </Text>
      <Text
        style={{ color: theme.color.gray04, fontSize: 12, marginBottom: 8, textAlign: 'center' }}
      >
        문제가 지속된다면 yeonggamt@gmail.com으로 문의해주세요.
      </Text>
      <View style={{ height: 64 }} />
      <Button
        onPress={() => {
          reload();
        }}
      >
        다시 시도하기
      </Button>
    </View>
  );
}
