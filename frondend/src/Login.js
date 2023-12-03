import React, { Component } from "react";
import AxiosApi from './api/AxiosApi';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  onValueChanged = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      error: ''
    });
    console.log(this.state);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(username, password);
    const data = {
      username,
      password,
    };
    try {
      const response = await AxiosApi.post('/api/v1/user/login', data,{ withCredentials: true });

      if (response.data) {
        sessionStorage.setItem('username', response.data.username);
        window.location.href = '/employee/list';
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        this.setState({ error: error.response.data.message });
      } else {
        this.setState({ error: 'An unexpected error occurred.' });
      }
    }
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <br />
        <div style={{ padding: '0 30%' }}>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group">
              <label>Username or email</label>
              <input
                name="username"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Username or email"
                onChange={(e) => this.onValueChanged(e)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => this.onValueChanged(e)}
              />
            </div>
            <br />
            <input name="btnSubmit" type="submit" className="btn btn-primary" value="Login"/>
          </form>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }
}
