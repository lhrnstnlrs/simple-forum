import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getPostDetails } from '../actions/post';
import { getActivePost } from '../reducers/post';

import { Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';


class PostDetails extends Component {
  componentDidMount() {
    this.props.getPostDetails(this.props.match.params.id);
  }

  render() {
    const { post, comments, loading, error } = this.props.activePost;

    const commentItems = comments.map(comment => (
      <div key={comment.id}>
        <h6>{comment.name}<br/>{comment.email}</h6>
        <p>{comment.body}</p>
      </div>
    ));

    return (
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        
        <h4>Comments</h4>
        <div>{commentItems}</div>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    activePost: getActivePost(state.posts)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPostDetails: (postId) => {
      dispatch(getPostDetails(postId));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));