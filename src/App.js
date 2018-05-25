import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { createStore, applyMiddleware, combineReducers } from 'redux';

import reducers from './reducers'
import rootSaga from './sagas';

import createSagaMiddleware from 'redux-saga';

import { Provider } from 'react-redux';

import Posts from './components/Posts'
import PostForm from './components/PostForm'

import './css/App.css';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers(reducers);

function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );
}

const store = configureStore();

sagaMiddleware.run(rootSaga);

/* const middleware = [thunk]

const store = createStore(
  rootReducer,
  {},//initialState
  applyMiddleware(...middleware)
); */

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className="App">
          <ul>
            <li>
              <Link to="/posts/create">Add Post</Link>
            </li>
          </ul>

          <hr/>

          <Route exact path="/" component={Posts} />
          <Route path="/posts/create" component={PostForm} />
        </div>
      </Provider>
    );
  }
}

export default App;
