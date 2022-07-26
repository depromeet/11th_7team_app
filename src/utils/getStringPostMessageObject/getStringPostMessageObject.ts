import { WEBVIEW_MESSAGE_TYPE } from '~/constants/common';

interface PostMessageObjectInterface {
  type: keyof typeof WEBVIEW_MESSAGE_TYPE;
  data: unknown;
  [key: string]: unknown;
}

export function getStringPostMessageObject(object: PostMessageObjectInterface) {
  return JSON.stringify(object);
}
