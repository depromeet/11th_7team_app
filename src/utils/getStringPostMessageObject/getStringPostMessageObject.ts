import { WEBVIEW_MESSAGE_TYPE } from '~/constants/common';

type WebviewMessageTypeKey = keyof typeof WEBVIEW_MESSAGE_TYPE;

interface PostMessageObjectInterface {
  type: (typeof WEBVIEW_MESSAGE_TYPE)[WebviewMessageTypeKey];
  data: unknown;
  [key: string]: unknown;
}

export function getStringPostMessageObject(object: PostMessageObjectInterface) {
  return JSON.stringify(object);
}
