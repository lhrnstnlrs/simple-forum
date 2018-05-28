import * as Types from '../actions/types';

const INITIAL_STATE = {
  postsList: { posts: [], error: null },
  activePost: { post: {}, comments: [], loading: false, error: null },
  newPost: { validated: false }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_POSTS_SUCCESS:
      return { ...state, postsList: { posts: action.payload, error: null } };

    case Types.GET_POSTS_FAILURE:
      return { ...state, postsList: { posts: [], error: action.payload } };

    case Types.GET_POST_DETAILS:
      return { ...state, activePost: { post: {}, comments: [], loading: true, error: null } };

    case Types.GET_POST_DETAILS_SUCCESS:
      return { ...state, activePost: { post: action.payload.post, comments: action.payload.comments, error: null } };

    case Types.GET_POST_DETAILS_FAILURE:
      return { ...state, activePost: { post: {}, comments: [], error: action.payload } };

    case Types.VALIDATE_NEW_POST:
      return { ...state, newPost: { titleError: action.payload.titleError, bodyError: action.payload.bodyError, validated: action.payload.validated } };

    case Types.RESET_NEW_POST:
      return { ...state, newPost: INITIAL_STATE.newPost };

    default:
      return state;
  }
}


export const getPostsList = state => state.postsList;
export const getActivePost = state => state.activePost;
export const getNewPost = state => state.newPost;