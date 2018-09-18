import {
  call,
  cancel,
  fork,
  take
} from 'redux-saga/effects';

import { CONNECT_FULFILLED } from '../../actions/connect';
import { DISCONNECT_FULFILLED } from '../../actions/disconnect';

export default function (fn) {
  return call(function* () {
    for (;;) {
      const { meta: { userID, username }, payload: { directLine } } = yield take(CONNECT_FULFILLED);
      const task = yield fork(fn, directLine, userID, username);

      yield take(DISCONNECT_FULFILLED);
      yield cancel(task);
    }
  });
}
