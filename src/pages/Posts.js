import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getPosts } from '../actions/post';
import { getPostsList } from '../reducers/post';

import { Link, withRouter } from 'react-router-dom';

import { urlToProperty } from 'query-string-params';

import Navbar from '../components/navbar';

import PostDetails from './PostDetails';

const PAGE_SIZE = 10;

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
    }

    this.getPostsPerPage = this.getPostsPerPage.bind(this);
    this.renderPaginationLink = this.renderPaginationLink.bind(this);
  }

  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps){
    const property = urlToProperty(nextProps.location.search);
    if(property.page !== undefined && property.page !== this.state.currentPage) {
      this.setState({
        currentPage: property.page
      })
    }
  }

  getPostsPerPage(posts) {
    const start = (this.state.currentPage * PAGE_SIZE) - PAGE_SIZE;
    const end = (this.state.currentPage * PAGE_SIZE);

    return posts.filter((posts, index) => (index < end && index >= start))
  }

  renderPaginationLink(page) {
    return (
      <li key={page} className={this.state.currentPage == page ? 'active' : ''}>
        <Link to={`/posts?page=${page}`}>
          {page}
        </Link>
      </li>
    );
  }

  render() {
    const { posts } = this.props.postsList;

    const paginationLinks = [];
    let numberOfPages = posts.length / PAGE_SIZE;
    if(posts.length % PAGE_SIZE > 0) {
      numberOfPages += 1;
    }
    for (var pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
      paginationLinks.push(this.renderPaginationLink(pageNumber));
    }

    const postsPerPage = this.getPostsPerPage(posts);
    const postItems = postsPerPage.map(post => (
      
        <li className="list-group-item" key={post.id}>
          <h4><Link to={`/posts/${post.id}`}>{post.title}</Link></h4>
        </li>
    ));

    return (
      <div className="container-fluid">
        <Navbar addLinkEnabled />

        <div className="container">
          <h1>Posts</h1>
        </div>

        <br/>

        <div className="container">
          <ul className="list-group">
            {postItems}
          </ul>
        </div>

        <div className="container">
          <ul className="pagination">
            {paginationLinks}
          </ul>
        </div>
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