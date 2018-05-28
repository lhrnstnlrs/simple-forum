import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";

import { createStore, applyMiddleware, combineReducers } from 'redux';

import reducers from './reducers'
import rootSaga from './sagas';

import createSagaMiddleware from 'redux-saga';

import { Provider } from 'react-redux';

import Posts from './components/Posts'
import PostForm from './components/PostForm'
import PostDetails from './components/PostDetails'

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
          <Switch>
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/create" component={PostForm} />
            <Route path="/posts/:id(\d+)" component={PostDetails} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
