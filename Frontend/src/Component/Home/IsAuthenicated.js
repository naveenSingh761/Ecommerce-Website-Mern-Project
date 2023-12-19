import React, { useEffect, useState } from "react";
import { isAuthenicatedHandler } from "../../Actions/userActions";
import { useDispatch } from "react-redux";
import Loader from "../../layout/Loader";

const IsAuthenicated = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = dispatch(isAuthenicatedHandler());
    console.log("file: isAuthenicated.js:10 ~ useEffect ~ user:", user);
  }, [dispatch]);
  return (
    <div>
      <Loader />
    </div>
  );
};

export default IsAuthenicated;
