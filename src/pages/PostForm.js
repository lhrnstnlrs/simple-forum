import React, { Component } from 'react';

import { connect } from 'react-redux';
import { validateNewPost, createPost, resetNewPost } from '../actions/post';
import { getNewPost } from '../reducers/post';

import Navbar from '../components/navbar';

import { withRouter } from 'react-router-dom';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    const post = {
      title: this.state.title,
      body: this.state.body
    }

    this.props.validateNewPost(post);
  }
  
  render() {

    const { titleError, bodyError, validated } = this.props.newPost;

    if (validated) {
      const post = {
        title: this.state.title,
        body: this.state.body
      }
      this.props.createPost(post, this.props.history);
    }

    return (
      <div className="container-fluid center-block">
        <Navbar/>

        <div className="container">
          <h1>Add Post</h1>
        </div>

        <hr/>
        <br/>

        <div className="container">

        </div>

        <div className="container">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label for='title'>Title</label>
              {
                titleError ? <p style={{ fontSize: 12, color: 'red', textAlign: 'left' }}>Title can't be blank.</p> : null
              }
              <input
                className='form-control'
                type='text'
                name='title'
                onChange={this.onChange}
                value={this.state.title} />
            </div>
            <div className="form-group">
              <label for='body'>Body</label>
              {
                bodyError ? <p style={{ fontSize: 12, color: 'red', textAlign: 'left' }}>Body can't be blank.</p> : null
              }
              <textarea
                className='form-control'
                rows="5" cols="50"
                name='body'
                onChange={this.onChange}
                value={this.state.body}/>
            </div>
            <button type="submit" class="btn btn-default">Create Post</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newPost: getNewPost(state.posts)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    validateNewPost: (post) => {
      dispatch(validateNewPost(post));
    },
    createPost: (post, router) => {
      dispatch(createPost(post, router));
    },
    resetMe: () => {
      dispatch(resetNewPost());
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));