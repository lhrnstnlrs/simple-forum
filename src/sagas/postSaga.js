import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'
import * as Types from '../actions/types';
import * as Action from '../actions/post';

const ROOT_URL = 'https://jsonplaceholder.typicode.com/'

function* getPostsAsync() {
  try {
    const response = yield call(axios.get, ROOT_URL + 'posts');

    yield put(Action.getPostsSuccess(response.data));

  } catch (error) {
    yield put(Action.getPostsFailure(error));
  }
}

function* getPostDetailsAsync(action) {
  try {
    const post = yield call(axios.get, ROOT_URL + 'posts/' + action.payload);
    const comments = yield call(axios.get, ROOT_URL + 'posts/' + action.payload + '/comments');

    yield put(Action.getPostDetailsSuccess(post.data, comments.data));

  } catch (error) {
    yield put(Action.getPostDetailsFailure(error));
  }
}

function* createPostAsync(action) {
  try {
    const response = yield call(axios.post, ROOT_URL + 'posts', { title: action.payload.post.title, body: action.payload.post.body, userId: 1 });

    //yield put({ type: Types.RESET_NEW_POST });

  } catch (error) {
    console.log('Error in creating post: ' + error);
  }
}

//Watchers
export function* watchGetPosts() {
  yield takeLatest(Types.GET_POSTS, getPostsAsync);
}

export function* watchGetPostDetails() {
  yield takeLatest(Types.GET_POST_DETAILS, getPostDetailsAsync);
}

export function* watchCreatePost() {
  yield takeLatest(Types.CREATE_POST, createPostAsync);
}