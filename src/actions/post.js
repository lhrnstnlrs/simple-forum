import * as Types from './types';

export function getPosts() {
  return {
    type: Types.GET_POSTS
  };
}

export function getPostsSuccess(posts) {
  return {
    type: Types.GET_POSTS_SUCCESS,
    payload: posts,
  };
}

export function getPostsFailure(error) {
  return {
    type: Types.GET_POSTS_FAILURE,
    payload: error
  };
}

export function createPost(post, dispatch) {
  return {
    type: Types.CREATE_POST,
    payload: {
      post: post,
      dispatch: dispatch
    }
  };
}

export function createPostSuccess() {
  return {
    type: Types.CREATE_POST_SUCCESS,
  };
}

export function createPostFailure(error) {
  return {
    type: Types.CREATE_POST_FAILURE,
    payload: error
  };
}

export function getPostDetails(id) {
  return {
    type: Types.GET_POST_DETAILS,
    payload: id
  };
}

export function getPostDetailsSuccess(post, comments) {
  return {
    type: Types.GET_POST_DETAILS_SUCCESS,
    payload: {
      post,
      comments
    }
  };
}

export function getPostDetailsFailure(error) {
  return {
    type: Types.GET_POST_DETAILS_FAILURE,
    payload: error,
  };
}
