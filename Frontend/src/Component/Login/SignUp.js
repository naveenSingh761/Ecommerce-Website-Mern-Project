import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterHandler } from "../../Actions/userActions";
import Demo from "../../layout/Demo";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const registerSubmit = async (e) => {
    e.preventDefault();
    for (const i of Object.entries(user)) {
      if (!i[1]) {
        return alert(`${i[1]} is missing`);
      }
    }
    if (avatar === null) {
      return alert("Please Upload image");
    }

    const myForm = new FormData();
    myForm.append("name", user.name);
    myForm.append("email", user.email);
    myForm.append("password", user.password);
    myForm.append("avatar", avatar);

    dispatch(RegisterHandler(myForm, navigate));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  return loading ? (
    <Demo />
  ) : (
    <Fragment>
      <div className="Loginmaincontainer">
        <div className="dashboard">
          <div className="FormContainer">
            <form
              className="signUpForm"
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="inputContainer">
                <div>
                  <div className="fieldInput">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="fieldInput">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="fieldInput">
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                      // minLength={8}
                    />
                  </div>

                  <div className="signUpAvatar my-3 ms-2">
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                      className="custom-file-input"
                    />
                  </div>
                </div>

                {avatar !== "/Profile.png" && (
                  <div className="imageContainer">
                    <>
                      <img src={avatarPreview} className="avatarImage" />
                    </>
                  </div>
                )}
              </div>

              <div className="text-center Register">
                <button type="submit" value="Register" className="dashButton1">
                  Register
                </button>
              </div>

              <div className="Signin mt-3 ">
                <p>If you already a user then click on sign in</p>
                <button
                  className="dashButton2"
                  onClick={() => {
                    navigate("/Login");
                  }}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
