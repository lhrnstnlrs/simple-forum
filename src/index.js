/* import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
 */


import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import Posts from './pages/Posts';
import PostForm from './pages/PostForm';
import PostDetails from './pages/PostDetails';

import { Router, Route, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux'
import store, { history } from './store';

import './include/bootstrap';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/posts" />
        <Route path="posts" component={Posts} />>
        <Route path="post/:id(d+)" component={PostDetails} />
        <Route path="create" component={PostForm}/>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(
  router,
  document.getElementById('root')
);