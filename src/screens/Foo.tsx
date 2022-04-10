import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';

import Bar from '~/components/Bar';

function Foo() {
  return (
    <SafeAreaView>
      <StatusBar />
      <Text>Foo.tsx</Text>
      <Bar />
    </SafeAreaView>
  );
}

export default Foo;
