import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getPosts } from '../actions/post';
import { getPostsList } from '../reducers/post';

import { BrowserRouter as Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import PostDetails from './PostDetails'

class Posts extends Component {
  componentWillMount() {
    /* fetch('https://jsonplaceholder.typicode.com/posts/')
      .then(response => response.json())
      .then(data => this.setState({posts: data})); */

    this.props.getPosts();
  }

  render() {
    const { posts } = this.props.postsList;

    //console.log(posts);

    const postItems = posts.map(post => (
      <div key={post.id}>
        <Link to={`/${post.id}`}>{post.title}</Link>
        <p>{post.body}</p>
      </div>
    ));

    return (
      <div>
        <h1>Posts</h1>
        {postItems}

        <Route path="/:id" render={(props) => <PostDetails {...props}/>} />
      </div>
      
    );
  }
}

function mapStateToProps(state) {
	return {
		postsList: getPostsList(state.posts)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getPosts: () => {
			dispatch(getPosts());
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));