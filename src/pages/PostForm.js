import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createPost } from '../actions/post';
import { getNewPost } from '../reducers/post';

import { Link, withRouter } from 'react-router';

import { Form, Field, Errors, actions } from 'react-redux-form';

import Navbar from '../components/navbar';
import { Dots } from 'react-activity';
import '../css/app.css';


class PostForm extends Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  _onSubmit(post) {
    this.props.createPost(post);
  }
  
  render() {
    const { loading, error } = this.props.newPost;
    
    const isRequired = (val) => val && val.length > 0;

    return (
      <div>
        <Navbar/>

        <div className="container">
          <div className="row mt-4">
            <Link to="/posts"><u>&lt;&lt; Back to list</u></Link>
          </div>

          <div className="container">
              {loading &&
                <div className="d-flex justify-content-center mt-3">
                  <Dots />
                </div>
              }

              {error &&
                <div className="d-flex justify-content-center mt-3">
                  <p className="text-danger">{error}</p>
                </div>
              }
          </div>

          <div className="row mt-4">
            <h1>Create Post</h1>
          </div>

          <div className="container">
            <Form model="newPost" onSubmit={(newPost) => this._onSubmit(newPost)} >
              <Field
                  model="newPost.title"
                  validators={{ isRequired }}>
                <div className="form-group w-50">
                  <label>Title</label>
                  <Errors
                      wrapper={(props) => <p className="text-danger">{props.children}</p>}
                      show={{ touched: true, focus: false }}
                      model="newPost.title"
                      messages={{
                        isRequired: 'Please provide a title.',
                      }}
                  />
                  <input
                    className='form-control'
                    type='text' />
                </div>
              </Field>

              <Field
                  model="newPost.body"
                  validators={{ isRequired }}>
                <div className="form-group w-50">
                  <label>Body</label>
                  <Errors
                      wrapper={(props) => <p className="text-danger">{props.children}</p>}
                      show={{ touched: true, focus: false }}
                      model="newPost.body"
                      messages={{
                        isRequired: 'Please provide a body.',
                      }}
                  />
                  <textarea
                    className='form-control noresize'
                    rows="8" />
                </div>
              </Field>

              <button type="submit" className="btn btn-primary">Create Post!</button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newPost: getNewPost(state.post)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: (post, router) => {
      dispatch(createPost(post, router));
    },
    reset: () => {
      dispatch(actions.reset('newPost'));
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));