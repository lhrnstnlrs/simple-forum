import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getPostDetails } from '../actions/post';
import { getActivePost } from '../reducers/post';

import { Link, withRouter } from 'react-router';

import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';

import Navbar from '../components/navbar';

class PostDetails extends Component {
  componentDidMount() {
    this.props.getPostDetails(this.props.params.id);
  }

  render() {
    const { post, comments, loading, error } = this.props.activePost;

    if (loading) {
      return (
        <div>
          <Navbar/>

          <div className="container">
            <div className="row mt-4">
              <Link to="/posts"><u>&lt;&lt; Back to list</u></Link>
            </div>
          </div>
          
          <div className="d-flex justify-content-center mt-5"><Spinner size={50} color='#212529' /></div>
        </div>
      )
    }

    if (error) {
      return (
        <div>
          <Navbar/>

          <div className="container">
            <div className="row mt-4">
              <Link to="/posts"><u>&lt;&lt; Back to list</u></Link>
            </div>
          </div>
          
          <div className="d-flex justify-content-center mt-5"><p className="text-danger">{error}</p></div>
        </div>
      )
    }

    const commentItems = comments.map(comment => (
      <li key={comment.id} className="list-group-item">
        <h6>{comment.name}<br/>{comment.email}</h6>
        <p>{comment.body}</p>
      </li>
    ));

    return (
      <div>
        <Navbar />

        <div className="container">
          <div className="row mt-4">
            <Link to="/posts"><u>&lt;&lt; Back to list</u></Link>
          </div>
        </div>

        <div className="container w-50">
          <div className="row mt-4">
            <h2>{post.title}</h2>
          </div>

          <div className="container row mt-2">
            <h5>{post.body}</h5>
          </div>
          
          <div className="row mt-5">
            <h4>Comments</h4>
          </div>

          <div className="row mt-2">
            <ul className="list-group">
              {commentItems}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activePost: getActivePost(state.post)
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