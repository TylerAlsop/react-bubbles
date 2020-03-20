import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState(
    {
    username: "",
    password: ""
    }
  );

  const handleChange = e => {
    setCredentials(
      {
        ...credentials,
        [e.target.name]: e.target.value
      }
    );
  };

  const login = e => {
    e.preventDefault();

    axiosWithAuth()
    .post("/api/login", credentials)
    .then(res => {
      console.log("Login Response", res);
      localStorage.setItem("token", res.data.payload);
      props.history.push("/api/colors");
    })
    .catch(err => {
      console.log("Login Error", err);
    });
  }


  return (
    <div className="login-form">
      <h1 className="login-form-header">Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={login} className="login-form">
          <label id="label" className="username-label">
            Username:
              <input 
                id="input" 
                type="text"
                name="username"
                onChange={handleChange} 
              />
          </label>
          <label id="label" className="password-label">
            Password:
              <input 
                id="input" 
                type="text"
                name="password"
                onChange={handleChange} 
              />
          </label>
          <button className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;


