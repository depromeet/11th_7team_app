import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
// import { GestureDetector } from 'react-native-gesture-handler';
import ShareMenu from 'react-native-share-menu';

import { ShareHandler } from '~/components/ShareHandler';
import { YgtStatusBar } from '~/components/YgtStatusBar';
import MainNavigator from '~/navigation/MainNavigator';
import theme from '~/styles/theme';

// import { Sentry } from '~/utils/sentry';
//

function App() {
  const [shareMenu, setShareMenu] = useState(false);
  const [shareData, setShareData] = useState<string | null>(null);
  const [shareMimeType, setShareMimeType] = useState<string | null>(null);

  const handleShare = useCallback(item => {
    if (!item) {
      return;
    }
    const { mimeType, data } = item;
    setShareMenu(true);
    setShareData(data);
    setShareMimeType(mimeType);
  }, []);

  const closeShareView = () => {
    setShareMenu(false);
    setShareData(null);
    setShareMimeType(null);
  };

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (shareMenu && shareData && shareMimeType) {
    return <ShareHandler data={shareData} mimeType={shareMimeType} handleClose={closeShareView} />;
  }

  return (
    <>
      <YgtStatusBar />
      <View style={styles.root}>
        <MainNavigator />
      </View>
    </>
  );
}
export default App;
// export default Sentry.wrap(App);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
});
