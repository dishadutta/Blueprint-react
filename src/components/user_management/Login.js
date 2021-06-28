import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/securityActions";
import { Link } from "react-router-dom";
import blueprint_logo from "../../../src/blueprint_logo.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(LoginRequest);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      // <div className="container ">
      //   <div className="row now">
      //   <div className="col-md-6 ">
      //     <p className="blueprint">BLUEPRINT</p>
      //     <h1 className="blueprintdt">Welcome to Blueprint!</h1>
      //     <h2 className="blueprintdt">Join to organize your projects efficiently.</h2>
      //   </div>
      //   <div class="container__child signup__form">
      //         <form onSubmit={this.onSubmit}>
      //           <div className="form-group">
      //             <input
      //               type="text"
      //               className={classnames("form-control", {
      //                 "is-invalid": errors.username
      //               })}
      //               placeholder="Email Address"
      //               name="username"
      //               value={this.state.username}
      //               onChange={this.onChange}
      //             />
      //             {errors.username && (
      //               <div className="invalid-feedback">{errors.username}</div>
      //             )}
      //           </div>
      //           <div className="form-group">
      //             <input
      //               type="password"
      //               className={classnames("form-control", {
      //                 "is-invalid": errors.password
      //               })}
      //               placeholder="Password"
      //               name="password"
      //               value={this.state.password}
      //               onChange={this.onChange}
      //             />
      //             {errors.password && (
      //               <div className="invalid-feedback">{errors.password}</div>
      //             )}
      //           </div><br/>
      //           <input type="submit" className="register-button" /><br/>
      //           <Link to="/register">New here? Register</Link>
      //         </form>
      //       </div>
      // </div>
      // </div>
      <div>
        <div className="split left">
          <div>
            <div className="header_logo">
              <img src={blueprint_logo} alt="BigCo Inc. logo" />
            </div>
            <div className="blueprintdt">
              <h1>Welcome to Blueprint!</h1>
              <h4>
                Create your account to join active projects or start your own.
              </h4>
            </div>
          </div>
        </div>
        <div className="split right">
          <div className="container new_from">
            <div className="container__child signup__form">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control length-form", {
                      "is-invalid": errors.username,
                    })}
                    placeholder="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control length-form", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <br />
                <input type="submit" className="register-button" />
                <br />
                <Link to="/register">New here? Register</Link>
              </form>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(Login);