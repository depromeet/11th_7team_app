import React, { useCallback, useEffect, useState } from 'react';
import { Image, SafeAreaView, Text } from 'react-native';
import type { ShareData } from 'react-native-share-menu';
import ShareMenu from 'react-native-share-menu';

export function Share() {
  const [sharedData, setSharedData] = useState<string>('');
  const [sharedMimeType, setSharedMimeType] = useState('');
  const [sharedExtraData, setSharedExtraData] = useState<object>({});

  const handleShare = useCallback((item?: ShareData) => {
    console.log('입장', item);

    if (!item) {
      return;
    }

    const { mimeType, data, extraData } = item;

    setSharedData(data as string);
    setSharedExtraData(extraData as object);
    setSharedMimeType(mimeType);
  }, []);

  useEffect(() => {
    if (handleShare) {
      console.log(handleShare);

      ShareMenu.getInitialShare(handleShare);
    }
  }, [handleShare]);

  useEffect(() => {
    if (handleShare) {
      const listener = ShareMenu.addNewShareListener(handleShare);

      return () => {
        listener.remove();
      };
    }
  }, [handleShare]);

  return (
    <SafeAreaView>
      <Text>이미지:</Text>
      {sharedMimeType.includes('image/') && (
        <Image
          source={{ uri: sharedData }}
          resizeMode="contain"
          style={{ width: '100%', height: 200 }}
        />
      )}
      <Text>Shared type: {sharedMimeType}</Text>
      <Text>Shared data: {sharedData}</Text>
      <Text>Extra data: {sharedExtraData ? JSON.stringify(sharedExtraData) : ''}</Text>
    </SafeAreaView>
  );
}
