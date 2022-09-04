export const SYNC_YGT_RT = 'SYNC_YGT_RT';
// export const BASE_URI = 'https://app.ygtang.kr/';
export const BASE_URI = 'http://localhost:3000/';
export const AWS_S3_IMG_BUCKET_URI = 'https://s3.ap-northeast-2.amazonaws.com';
export const SHARE_WEB_MESSAGE_STATE = 'YgtangWebShareState';
export const APP_GROUP_KEY = 'group.org.reactjs.native.example.ygt-share';

export const WEBVIEW_MESSAGE_TYPE = {
  CREATED_INSPIRATION: 'CreatedInspiration',
  CLOSED_INSPIRATION: 'ClosedInspiration',
  SEND_TOAST_MESSAGE: 'SendToastMessage',
  SHARE_EXTENTION_MESSAGE_TYPE: 'YgtangAppShareData',
  CLIPBOARD_INSPIRATION: 'ClipboardInspiration',
} as const;
