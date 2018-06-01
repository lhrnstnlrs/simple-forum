import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getPostDetails } from '../actions/post';
import { getActivePost } from '../reducers/post';

import { Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import Navbar from '../components/navbar';

class PostDetails extends Component {
  componentDidMount() {
    this.props.getPostDetails(this.props.match.params.id);
  }

  render() {
    const { post, comments, loading, error } = this.props.activePost;

    if (loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }

    const commentItems = comments.map(comment => (
      <div key={comment.id}>
        <h6>{comment.name}<br/>{comment.email}</h6>
        <p>{comment.body}</p>
      </div>
    ));

    return (
      <div className="container-fluid">
        <Navbar addLinkEnabled />

        <div className="container">
          <h1>{post.title}</h1>
        </div>

        <div className="container">
          <h3>{post.body}</h3>
        </div>

        <div className="container">
          <h2>Comments</h2>
        </div>

        <div className="container">{commentItems}</div>
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