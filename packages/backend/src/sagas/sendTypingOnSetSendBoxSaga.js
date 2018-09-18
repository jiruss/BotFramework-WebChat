import {
  call,
  cancel,
  put,
  select,
  take,
  takeLatest
} from 'redux-saga/effects';

import whileConnected from './effects/whileConnected';

import { SET_SEND_BOX } from '../Actions/setSendBox';
import { SET_SEND_TYPING } from '../Actions/setSendTyping';
import postActivity from '../Actions/postActivity';
import sleep from '../util/sleep';

const SEND_INTERVAL = 3000;

function takeSendTyping(value) {
  return take(({ payload, type }) => type === SET_SEND_TYPING && !payload.sendTyping === !value);
}

export default function* () {
  yield whileConnected(function* () {
    const sendTyping = yield select(({ settings: { sendTyping } }) => sendTyping);

    if (!sendTyping) {
      yield takeSendTyping(true);
    }

    for (;;) {
      let lastSend = 0;
      const task = yield takeLatest(SET_SEND_BOX, function* ({ payload: { text } }) {
        if (text) {
          const interval = SEND_INTERVAL - Date.now() + lastSend;

          if (interval > 0) {
            yield call(sleep, interval);
          }

          yield put(postActivity({ type: 'typing' }));

          lastSend = Date.now();
        }
      });

      yield takeSendTyping(false);
      yield cancel(task);
      yield takeSendTyping(true);
    }
  });
}