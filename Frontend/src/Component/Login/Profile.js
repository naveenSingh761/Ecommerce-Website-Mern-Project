import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import Demo from "../../layout/Demo.js";
import Loader from "../../layout/Loader.js";

const Profile = () => {   
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return loading ? (
    <Loader>
      <>
        <p>Login </p>
        <p> Required</p>
      </>
    </Loader>
  ) : (
    <div className="Pro_mainContainer">
      <div className="Pro_leftSection">
        <div className="Pro_imageSection">
          <img src={user.avatar.url} alt="" />
        </div>

        <div>
          <button
            onClick={() => {
              navigate("/EditProfile", { state: { user } });
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="Pro_rightSection">
        <div className="Pro_infoSection">
          <div>
            <p>name : </p>
            <p className="mt-sm-2">{user.name} </p>
          </div>
          <div>
            <p>email : </p>
            <p className="mt-sm-2">{user.email} </p>
          </div>

          {user.role === "admin" && (
            <div>
              <p>role : </p>
              <p className="mt-sm-2">{user.role} </p>
            </div>
          )}
          <div>
            <p>Joined On : </p>
            <p className="mt-sm-2">
              {`  ${new Date(user.createdAt).getDate()}-${
                new Date(user.createdAt).getMonth() + 1
              }-${new Date(user.createdAt).getFullYear()}`}{" "}
            </p>
          </div>
        </div>
        <div className="Profile_utility">
          <div>
            <NavLink to={"/Mycart"}>
              <button>
                My Orders
                <ShoppingCartOutlinedIcon
                  className="mx-2"
                  sx={{ fontSize: 25, color: "DeepPink" }}
                />
              </button>
            </NavLink>
          </div>
          <div>
            <NavLink to={"/Mycart"}>
              <button>Saved Address</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
