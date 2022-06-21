import { Platform } from 'react-native';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

const SYNC_YGT_RT = 'SYNC_YGT_RT';
const localStorageUserTokenKeys = {
  accessToken: 'ygtlsat',
  refreshToken: 'ygtrfhtk',
} as const;

export function useShareWebToken() {
  const setRefreshToken = async (value: string) => {
    await SharedGroupPreferences.setItem(
      SYNC_YGT_RT,
      value,
      'group.org.reactjs.native.example.ygt-share'
    );
  };

  const makeInjectedJavaScript = async () => {
    if (Platform.OS !== 'ios') return `(function() {})();`;
    try {
      const refreshToken = await SharedGroupPreferences.getItem(
        SYNC_YGT_RT,
        'group.org.reactjs.native.example.ygt-share'
      );
      return `(function() {window.localStorage.setItem('${localStorageUserTokenKeys.refreshToken}','${refreshToken}');})();`;
    } catch (error) {
      if (error === 0) console.error('App Group이 없습니다.');
      return `(function() {})();`;
    }
  };

  return { makeInjectedJavaScript, setRefreshToken };
}
