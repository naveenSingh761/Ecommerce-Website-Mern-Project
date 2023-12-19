import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Loginhandler } from "../../Actions/userActions";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please Enter valid email and password");
    }

    const myForm = new FormData();

    myForm.set("email", email);
    myForm.set("password", password);

    dispatch(Loginhandler(myForm, navigate));
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <div className="Loginmaincontainer">
        <div className="dashboard">
          <div className="FormContainer">
            <form
              className="signUpForm"
              // encType="multipart/form-data"
              onSubmit={loginSubmit}
            >
              <div className=" _inputContainer">
                <div className="fieldInput text-center">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="fieldInput text-center mb-2">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
              </div>
              <div className="__forgotPassword offset-7">
                <NavLink to={"/password"}>
                  <small>Forgot Password</small>
                </NavLink>
              </div>
              <div className="text-center Register">
                <button type="submit" value="Register" className="dashButton1">
                  Login
                </button>
              </div>
              <div className="Signin mt-3 ">
                <p>If you are a new user then click on sign Up</p>
                <button
                  className="dashButton2"
                  onClick={() => {
                    navigate("/SignUp");
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const Banner = () => {
  return (
    <div className="__switchTab">
      <div className="__switchTabContainer">
        <NavLink to={"/Login"}>
          <p>Login User</p>
        </NavLink>
        <NavLink to={"/Signup"}>
          <p>Signup User</p>
        </NavLink>
      </div>
    </div>
  );
};

export default LoginScreen;
