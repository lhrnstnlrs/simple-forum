/* import posts from './post';

const reducers = {
  posts,
};

export default reducers; */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { createForms } from 'react-redux-form'

import post from './post';

const initialNewPost = {title: '', body: ''};

const rootReducer = combineReducers({
  post,
  routing: routerReducer,
  ...createForms({
    newPost: initialNewPost,
  }),
});

export default rootReducer;