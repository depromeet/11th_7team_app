import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { ShareMenuReactView } from 'react-native-share-menu';

import { ShareHandler } from '~/components/ShareHandler';
import { YgtStatusBar } from '~/components/YgtStatusBar';
import theme from '~/styles/theme';

/**
 * Share for iOS
 */
const Share = () => {
  const [sharedData, setSharedData] = useState<string>();
  const [sharedMimeType, setSharedMimeType] = useState<string>();

  useEffect(() => {
    ShareMenuReactView.data().then(data => {
      if (Platform.OS === 'ios') {
        setSharedData(data.data);
        setSharedMimeType(data.mimeType);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.background }}>
      <YgtStatusBar />
      {sharedData && sharedMimeType && <ShareHandler data={sharedData} mimeType={sharedMimeType} />}
    </View>
  );
};

export default Share;
