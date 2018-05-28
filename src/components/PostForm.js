import React, { Component } from 'react';

import { connect } from 'react-redux';
import { validateNewPost, createPost, resetNewPost } from '../actions/post';
import { getNewPost } from '../reducers/post';

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
      <div>
        <h1>Add Post</h1>
        
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title</label>
            {
              titleError ? <p style={{ fontSize: 12, color: 'red', textAlign: 'left' }}>Title can't be blank.</p> : null
            }
            <br/>
            <input
              type='text'
              name='title'
              onChange={this.onChange}
              value={this.state.title} />
          </div>
          <br/>
          <div>
            <label>Body</label>
            {
              bodyError ? <p style={{ fontSize: 12, color: 'red', textAlign: 'left' }}>Body can't be blank.</p> : null
            }
            <br/>
            <textarea
              name='body'
              onChange={this.onChange}
              value={this.state.body}/>
          </div>
          <br/>
          <button type='submit'>Submit</button>
        </form>
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