import React from 'react';
import Cameraroll from '@react-native-community/cameraroll';
import { PermissionsAndroid, Platform } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob';

import { WEBVIEW_MESSAGE_TYPE } from '~/constants/common';

import { getStringPostMessageObject } from '../getStringPostMessageObject';

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

const PERMISSON_DENIED_IMAGE_DOWNLOAD_MESSAGE = '권한 설정을 확인해주세요.';
const SUCCESS_IMAGE_DOWNLOAD_MESSAGE = '이미지를 저장했습니다.';
const FAILED_IMAGE_DOWNLOAD_MESSAGE = '이미지 저장에 실패했습니다.';

/**
 * 이미지 저장을 위한 유틸
 *
 * @param event
 * `WebviewNavigation` 객체
 *
 * @param webViewRef
 * `React.MutableRefObject<WebView<unknown> | undefined>`
 *
 * @returns `void`
 */
export async function imageDownload(
  event: WebViewNavigation,
  webViewRef: React.MutableRefObject<WebView<unknown> | undefined>
) {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    const stringMessageObject = getStringPostMessageObject({
      type: WEBVIEW_MESSAGE_TYPE.SEND_TOAST_MESSAGE,
      data: PERMISSON_DENIED_IMAGE_DOWNLOAD_MESSAGE,
    });

    webViewRef.current?.postMessage(stringMessageObject);
    return;
  }

  if (Platform.OS === 'android') {
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: { useDownloadManager: true, notification: true },
    })
      .fetch('GET', event.url)
      .then(() => {
        const stringMessageObject = getStringPostMessageObject({
          type: WEBVIEW_MESSAGE_TYPE.SEND_TOAST_MESSAGE,
          data: SUCCESS_IMAGE_DOWNLOAD_MESSAGE,
        });
        webViewRef.current?.postMessage(stringMessageObject);
      })
      .catch(() => {
        const stringMessageObject = getStringPostMessageObject({
          type: WEBVIEW_MESSAGE_TYPE.SEND_TOAST_MESSAGE,
          data: FAILED_IMAGE_DOWNLOAD_MESSAGE,
        });
        webViewRef.current?.postMessage(stringMessageObject);
      });
    return;
  }

  Cameraroll.save(event.url)
    .then(() => {
      const stringMessageObject = getStringPostMessageObject({
        type: WEBVIEW_MESSAGE_TYPE.SEND_TOAST_MESSAGE,
        data: SUCCESS_IMAGE_DOWNLOAD_MESSAGE,
      });
      webViewRef.current?.postMessage(stringMessageObject);
    })
    .catch(() => {
      const stringMessageObject = getStringPostMessageObject({
        type: WEBVIEW_MESSAGE_TYPE.SEND_TOAST_MESSAGE,
        data: FAILED_IMAGE_DOWNLOAD_MESSAGE,
      });
      webViewRef.current?.postMessage(stringMessageObject);
    });
}
