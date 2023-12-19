import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RegisterHandler,
  updateProfileHandler,
} from "../../Actions/userActions";
import Demo from "../../layout/Demo";
const EditProfile = () => {
  const { user: User, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
    // avatar:""
  });

  const { email, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const EditSubmit = async (e) => {
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

    myForm.append("updatedEmail", user.email);
    myForm.append("confirmPassword", user.password);

    if (avatar !== "/Profile.png") myForm.append("avatar", avatar);

    dispatch(updateProfileHandler(myForm, navigate));
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
              onSubmit={EditSubmit}
              method="post"
            >
              <div className="inputContainer">
                <div>
                  <div className="fieldInput">
                    <input
                      type="email"
                      placeholder="New Email"
                      required
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="fieldInput">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                      minLength={8}
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

                {avatar === "/Profile.png" ? (
                  <div className="imageContainer EditProfileName">
                    <>
                      <img src={User.avatar.url} className="avatarImage" />
                      {/* <p>{User.name}</p> */}
                    </>
                  </div>
                ) : (
                  <div className="imageContainer">
                    <>
                      <img src={avatarPreview} className="avatarImage" />
                    </>
                  </div>
                )}
              </div>

              <div className="text-center Register">
                <button type="submit" value="Register" className="dashButton1">
                  update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfile;
