import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getPosts } from '../actions/post';
import { getPostsList } from '../reducers/post';

import { Link, withRouter } from 'react-router';

import { urlToProperty } from 'query-string-params';

import Navbar from '../components/navbar';


const PAGE_SIZE = 12;

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
    }

    this.getPostsPerPage = this.getPostsPerPage.bind(this);
    this.renderPreviousPagination = this.renderPreviousPagination.bind(this);
    this.renderNextPagination = this.renderNextPagination.bind(this);
    this.renderPaginationLink = this.renderPaginationLink.bind(this);
  }

  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps){
    const property = urlToProperty(nextProps.location.search);
    if(property.page !== undefined && property.page !== this.state.currentPage) {
      this.setState({
        currentPage: Number(property.page)
      })
    }
  }

  getPostsPerPage(posts) {
    const start = (this.state.currentPage * PAGE_SIZE) - PAGE_SIZE;
    const end = (this.state.currentPage * PAGE_SIZE);

    return posts.filter((posts, index) => (index < end && index >= start))
  }

  renderPreviousPagination() {
    return (
      <li className={this.state.currentPage === 1 ? "page-item disabled" : "page-item"}><Link to={`/posts?page=${this.state.currentPage-1}`} className="page-link">Previous</Link></li>
    )
  }

  renderNextPagination(numberOfPages) {
    return (
      <li className={this.state.currentPage === numberOfPages ? "page-item disabled" : "page-item"}><Link to={`/posts?page=${this.state.currentPage+1}`} className="page-link">Next</Link></li>
    )
  }

  renderPaginationLink(page) {
    return (
      <li key={page} className={this.state.currentPage === page ? "page-item active" : "page-item"}>
        <Link to={`/posts?page=${page}`} className="page-link">
          {page}
        </Link>
      </li>
    );
  }

  render() {
    const { posts } = this.props.postsList;
    const postsSize = posts.length;
    
    let numberOfPages = Math.floor(postsSize / PAGE_SIZE);
    if(posts.length % PAGE_SIZE > 0) {
      numberOfPages += 1;
    }

    const paginationLinks = [];
    for (var pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
      paginationLinks.push(this.renderPaginationLink(pageNumber));
    }

    const postsPerPage = this.getPostsPerPage(posts);
    const postItems = postsPerPage.map(post => (   
        <li key={post.id} className="list-group-item">
          <h5><Link to={`/post/${post.id}`}>{post.title}</Link></h5>
        </li>
    ));

    return (
      <div>
        <Navbar addLinkEnabled />

        <div className="container">
          <div className="row mt-4">
            <h1>Posts</h1>
          </div>

          <div className="row mt-4">
            <ul className="list-group w-75">
              {postItems}
            </ul>
          </div>

          <div className="row mt-5">
            <ul className="pagination">
              {this.renderPreviousPagination()}
              {paginationLinks}
              {this.renderNextPagination(numberOfPages)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		postsList: getPostsList(state.post)
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