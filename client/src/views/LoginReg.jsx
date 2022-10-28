import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginReg = () => {
  const [registerState, setRegisterState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorState, setErrorState] = useState({});
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const registerSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/users/register", registerState, {
        withCredentials: true,
      })
      // CHANGEME!
      .then((res) => navigate("/knowchart/"))
      .catch((err) => {
        console.log(err.response.data);
        const { errors } = err.response.data;
        console.log(errors);
        const errObj = {};

        for (const [key, value] of Object.entries(errors)) {
          console.log(errors[key]);
          errObj[key] = value;
        }
        setErrorState(errObj);
      });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/users/login", loginState, {
        withCredentials: true,
      })
      // CHANGEME!
      .then((res) => navigate("/knowchart"))
      .catch((err) => console.log(err));
  };

  const registerChangeHandler = (e) => {
    setRegisterState({
      ...registerState,
      [e.target.name]: e.target.value,
    });
  };

  const loginChangeHandler = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={registerSubmit}>
          <h1>Register</h1>
          <div className="form-inputs">
            <span>First Name:</span>
            <input
              name="firstName"
              type="text"
              onChange={registerChangeHandler}
              placeholder="Barbara"
            />
            {errorState.firstName ? (
              <small className="ml-1 text-danger font-weight-bold">WRONG</small>
            ) : null}
          </div>
          <div className="form-inputs">
            <span>Last Name:</span>
            <input
              name="lastName"
              type="text"
              onChange={registerChangeHandler}
              placeholder="Rhubarb"
            />
            {errorState.lastName ? (
              <small className="ml-1 text-danger font-weight-bold">WRONG</small>
            ) : null}
          </div>
          <div className="form-inputs">
            <span>Email:</span>
            <input name="email" type="text" onChange={registerChangeHandler} />
            {errorState.email ? (
              <small className="ml-1 text-danger font-weight-bold">WRONG</small>
            ) : null}
            {errorState.duplicate ? (
              <small className="ml-1 text-danger font-weight-bold">
                EMAIL EXISTS
              </small>
            ) : null}
          </div>
          <div className="form-inputs">
            <span>Password:</span>
            <input
              name="password"
              type="password"
              onChange={registerChangeHandler}
            />
            {errorState.password ? (
              <small className="ml-1 text-danger font-weight-bold">WRONG</small>
            ) : null}
          </div>
          <div className="form-inputs">
            <span>Confirm Password:</span>
            <input
              name="confirmPassword"
              type="password"
              onChange={registerChangeHandler}
            />
            {errorState.confirmPassword ? (
              <small className="ml-1 text-danger font-weight-bold">WRONG</small>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={loginSubmit}>
          <div className="form-inputs">
            <span>Email:</span>
            <input name="email" type="text" onChange={loginChangeHandler} />
          </div>
          <div className="form-inputs">
            <span>Password:</span>
            <input
              name="password"
              type="password"
              onChange={loginChangeHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginReg;
