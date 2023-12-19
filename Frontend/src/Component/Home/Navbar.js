import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const nav_Components = ["Home", "Profile", "RegisterProduct", "Login"];

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <div className="nav_Containter">
      <div className="nav_head">
        <p style={{ color: "darkCyan", fontWeight: "700" }}>ChatBuddy</p>
      </div>
      <div className="nav_Components">
        {nav_Components.map((item, index) => (
          <NavLink
            key={index.toString()}
            // to={`/${item}`}
            to={
              item === "Login"
                ? isAuthenticated
                  ? "/Logout"
                  : "/Login"
                : `/${item}`
            }
            style={{
              textDecoration: "none",
              color: "white",
              paddingTop: "4px",
              zIndex: "500",
            }}
          >
            {item === "Login" ? (
              isAuthenticated ? (
                <p>Logout</p>
              ) : (
                <p>Login</p>
              )
            ) : (
              <p>{item}</p>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export { Navbar, nav_Components };
