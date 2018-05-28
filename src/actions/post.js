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

export function validateNewPost(post) {
  let titleError = false;
  if (post.title === '') {
    titleError = true;
  }

  let bodyError = false;
  if (post.body === '') {
    bodyError = true;
  }

  let validated = false;
  if (!(titleError || bodyError)) {
    validated = true;
  }

  return {
    type: Types.VALIDATE_NEW_POST,
    payload: {
      titleError: titleError,
      bodyError: bodyError,
      validated: validated
    }
  };
}

export function createPost(post, router) {
  return {
    type: Types.CREATE_POST,
    payload: {
      post: post,
      router: router
    }
  };
}

export function resetNewPost() {
  return {
    type: Types.RESET_NEW_POST,
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
