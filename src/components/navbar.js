import React, { Component } from 'react';
import { Link } from 'react-router';
import '../css/navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top navbar-dark bg-dark w-100">
        <div className="container">
          <div className="navbar-header">
            <h1 className="navbar-brand">Simple Forum</h1>
          </div>

          { this.props.addLinkEnabled &&
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/create" className="nav-link">
                  <button type="button" className="btn navbar-btn btn-secondary">
                    Add Post
                  </button>
                </Link>
              </li>
            </ul>
          }
        </div>
      </nav>
    );
  }
}

export default Navbar;