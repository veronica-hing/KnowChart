import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginReg = () => {
  const [registerState, setRegisterState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errorState, setErrorState] = useState({});
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState({
    email: "",
    password: ""
  });

  const registerSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/users/register", registerState, {
        withCredentials: true
      })
      // CHANGEME!
      .then((res) => navigate("/api/knowchart/"))
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
        withCredentials: true
      })
      // CHANGEME!
      .then((res) => navigate("/api/knowchart"))
      .catch((err) => console.log(err));
  };

  const registerChangeHandler = (e) => {
    setRegisterState({
      ...registerState,
      [e.target.name]: e.target.value
    });
  };

  const loginChangeHandler = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={registerSubmit}>
        <p>
          First Name:
          <input
            name="firstName"
            type="text"
            onChange={registerChangeHandler}
          />
          {errorState.firstName ? (
            <small className="ml-1 text-danger font-weight-bold">WRONG</small>
          ) : null}
        </p>
        <p>
          Last Name:
          <input name="lastName" type="text" onChange={registerChangeHandler} />
          {errorState.lastName ? (
            <small className="ml-1 text-danger font-weight-bold">WRONG</small>
          ) : null}
        </p>
        <p>
          Email:
          <input name="email" type="text" onChange={registerChangeHandler} />
          {errorState.email ? (
            <small className="ml-1 text-danger font-weight-bold">WRONG</small>
          ) : null}
          {errorState.duplicate ? (
            <small className="ml-1 text-danger font-weight-bold">
              EMAIL EXISTS
            </small>
          ) : null}
        </p>
        <p>
          Password:
          <input name="password" type="text" onChange={registerChangeHandler} />
          {errorState.password ? (
            <small className="ml-1 text-danger font-weight-bold">WRONG</small>
          ) : null}
        </p>
        <p>
          Confirm Password:
          <input
            name="confirmPassword"
            type="text"
            onChange={registerChangeHandler}
          />
          {errorState.confirmPassword ? (
            <small className="ml-1 text-danger font-weight-bold">WRONG</small>
          ) : null}
        </p>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <h1>Login</h1>
      <form onSubmit={loginSubmit}>
        <p>
          Email:
          <input name="email" type="text" onChange={loginChangeHandler} />
        </p>
        <p>
          Password:
          <input name="password" type="text" onChange={loginChangeHandler} />
        </p>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginReg;
