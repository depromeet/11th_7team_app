import { Dimensions, Platform, StatusBar } from 'react-native';

export function useAndroidSafeArea() {
  let androidSafeAreaInjectScript = ``;

  if (Platform.OS === 'android') {
    androidSafeAreaInjectScript = `
      const style = document.createElement('style');
      style.innerHTML = \`
        .safeAreaTop {
          height: ${StatusBar.currentHeight}px !important;
        }
        .safeAreaBottom {
          height: ${Dimensions.get('screen').height - Dimensions.get('window').height}px !important;
        }
      \`;
      document.head.appendChild(style);
    `;
  }

  return { androidSafeAreaInjectScript };
}
