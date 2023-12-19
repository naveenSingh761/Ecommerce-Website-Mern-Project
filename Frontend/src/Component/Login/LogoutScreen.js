import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutHandler } from "../../Actions/userActions.js";
import Loader from "../../layout/Loader.js";

const LogoutScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutHandler());
    setTimeout(() => {
      navigate("/Home");
    }, 500);
  }, []);

  return (
    <>
      <Loader>Logging off </Loader>
    </>
  );
};

export default LogoutScreen;
