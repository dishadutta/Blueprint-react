import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {logout} from "../../actions/securityActions";

class Header extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }
  render() {
    const { validToken, user } = this.props.security;

    const userIsAuthenticated = (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
      <Link className="navbar-brand nav-padding-left main-font" to="/">Blueprint</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <Link className="nav-link" to="/dashboard"> Dashboard </Link>
            </li>
          </ul>
          <form class="d-flex">
            <Link className="nav-link font-color" to="/dashboard"><i className="fas fa-user-circle mr-1" /> {user.fullName} </Link>
            <Link className="nav-link nav-padding-right font-color" to="/logout" onClick={this.logout.bind(this)} > Logout </Link>
          </form>
        </div>
      </div>
    </nav>
      
    );

    const userIsNotAuthenticated = (
        <div></div>
    );

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
        <div>
          {headerLinks}
        </div>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps, {logout})(Header);

