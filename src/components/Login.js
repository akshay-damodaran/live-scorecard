import React, { Component } from 'react';
import '../styles/Login.css';

const credentials = {
      username: 'admin',
      password: 'kptca@123'
}

class Login extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  username: '',
                  password: '',
                  usernameError: '',
                  passwordError: '',
            }
      }

      handleLogin() {
            const { username, password } = this.state;
            if (username === '') {
                  this.setState({ usernameError: 'Please enter valid username.' });
            } else if (password === '') {
                  this.setState({ passwordError: 'Please enter valid password.', usernameError: '' });
            } else {
                  if (username === credentials.username && password === credentials.password) {
                        this.props.nextScreen();
                  } else {
                        this.setState({
                              passwordError: 'Incorrect username or password.'
                        });
                  }
            }
      }

      render() {
            return (
                  <div className="admin-body">
                        <div className="admin-body-title">
                              <span>{'Admin login'}</span>
                        </div>
                        <div className="login-input">
                              <input
                                    id="username-input"
                                    type="text"
                                    value={this.state.username}
                                    placeholder={"Enter username"}
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                    autoFocus
                              />
                              {
                                    (this.state.usernameError.length > 0) &&
                                          <span className="error-message">{this.state.usernameError}</span>
                              }
                        </div>
                        <div className="login-input">
                              <input
                                    id="password-input"
                                    type="password"
                                    value={this.state.password}
                                    placeholder={"Enter password"}
                                    onChange={(e) => this.setState({ password: e.target.value })}

                              />
                              {
                                    (this.state.passwordError.length > 0) &&
                                          <span className="error-message">{this.state.passwordError}</span>
                              }
                        </div>
                        <div className="login-input">
                              <button
                                    id="submit-login"
                                    onClick={() => this.handleLogin()}
                              >{'Login'}</button>
                        </div>
                  </div>
            );
      }
}

export default Login;