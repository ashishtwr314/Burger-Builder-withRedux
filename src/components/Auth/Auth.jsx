import React, { Component } from "react";
import * as actions from "../../store/actions";
import "./Auth.css";
import { connect } from "react-redux";
import Backdrop from "./../Backdrop/Backdrop";
import Spinner from "./../Spinner/Spinner";
import { Redirect } from "react-router";

class Auth extends Component {
  state = {
    SignUpfullname: "",
    SignUpemail: "",
    SignUppass: "",

    loginemail: "",
    loginpass: "",

    authStart: false,
  };

  onSignupHandler = (e) => {
    this.setState({
      authStart: true,
    });
    e.preventDefault();
    let data = {
      email: this.state.SignUpemail,
      password: this.state.SignUppass,
      returnSecureToken: true,
    };

    this.props.onAuthStart(data, "signup");
  };

  onLoginHandler = (e) => {
    this.setState({
      authStart: true,
    });
    e.preventDefault();
    let data = {
      email: this.state.loginemail,
      password: this.state.loginpass,
      returnSecureToken: true,
    };
    this.props.onAuthStart(data, "login");
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let redirect = null;
    if (this.props.authComplete && !this.props.authFailed) {
      redirect = <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        {!this.props.authComplete && this.state.authStart ? (
          <React.Fragment>
            <Backdrop /> <Spinner />
          </React.Fragment>
        ) : null}
        {redirect}
        <p
          style={{
            fontSize: "25px",
            color: "darkred",
            margin: "0",
            textAlign: "center",
          }}
        >
          {this.props.error}
        </p>{" "}
        <br />
        <div className="AuthForm">
          <form onSubmit={this.onSignupHandler} className="signUpForm">
            <h2 className="form-header">Sign up</h2>
            <div className="form-group">
              <input
                value={this.state.SignUpfullname}
                name="SignUpfullname"
                onChange={(e) => this.onChangeHandler(e)}
                required
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div className="form-group">
              <input
                value={this.state.SignUpemail}
                name="SignUpemail"
                onChange={(e) => this.onChangeHandler(e)}
                required
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                value={this.state.SignUppass}
                name="SignUppass"
                onChange={(e) => this.onChangeHandler(e)}
                required
                type="text"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <input type="checkbox" required /> I agree to the T&C*
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
          <div>
            {" "}
            <span
              style={{
                fontSize: "25px",
                color: "darkred",
                margin: "0",
                textAlign: "center",
              }}
            >
              OR
            </span>{" "}
          </div>

          <form onSubmit={this.onLoginHandler} className="logInForm">
            <h2 className="form-header">Login</h2>
            <div className="form-group">
              <input
                value={this.state.loginemail}
                name="loginemail"
                onChange={(e) => this.onChangeHandler(e)}
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                value={this.state.loginpass}
                name="loginpass"
                onChange={(e) => this.onChangeHandler(e)}
                type="text"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    authComplete: state.authComplete,
    error: state.error,
    authFailed: state.authFailed,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onAuthStart: (data, type) => dispatch(actions.authStart(data, type)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
