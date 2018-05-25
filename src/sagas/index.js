import { fork } from 'redux-saga/effects';

import { watchGetPosts, watchGetPostDetails, watchCreatePost } from './postSaga';

export default function* rootSaga() {
  yield [
    fork(watchGetPosts),
    fork(watchGetPostDetails),
    fork(watchCreatePost),
  ];
}