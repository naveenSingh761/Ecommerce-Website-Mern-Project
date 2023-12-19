import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WebFont from "webfontloader";
import { isAuthenicatedHandler } from "./Actions/userActions.js";
import Home from "./Component/Home/Home.js";
import LoginScreen from "./Component/Login/LoginScreen.js";
import LogoutScreen from "./Component/Login/LogoutScreen.js";
import "./Styles/style.scss";
import Mycart from "./Component/Cart/Mycart.js";

import Myproduct from "./Component/Product/Myproduct.js";
import RegisterProduct from "./Component/Product/RegisterProduct.js";

import Profile from "./Component/Login/Profile.js";
import EditProfile from "./Component/Login/EditProfile.js";
import ForgetPassword from "./Component/Login/ForgetPassword.js";
import ResetPassword from "./Component/Login/ResetPassword.js";

import SignUp from "./Component/Login/SignUp.js";
import { Navbar } from "./Component/Home/Navbar.js";

import Secret from "./Secret.js";

import Demo from "./layout/Demo.js";

import Footer from "./layout/Footer.js";

import Loader from "./layout/Footer.js";
import IsAuthenicated from "./Component/Home/IsAuthenicated.js";
import ProtectedRoute from "./Component/Route/ProtectedRoute.js";
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Kalam",
          "Playpen Sans",
          "Hedvig Letters Serif",
          "Josefin Sans",
          "Bad Script", //italic
          "Beau Rivage",
          "Droid Sans",
          "Droid Serif",
        ],
      },
    });

    dispatch(isAuthenicatedHandler());
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <Navbar />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="me" element={<IsAuthenicated />} />
          <Route path="Home" element={<Home />} />
          <Route path="product/:_id" element={<Myproduct />} />
          <Route path="Mycart" element={<Mycart />} />
          <Route path="Demo" element={<Demo />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Login" element={<LoginScreen />} />
          <Route path="Logout" element={<LogoutScreen />} />
          <Route path="EditProfile" element={<EditProfile />} />
          <Route path="Password" element={<ForgetPassword />} />
          <Route path="password/reset/:token" element={<ResetPassword />} />

          <Route  element={<ProtectedRoute />}>
            <Route path="Profile" element={<Profile />} />
            <Route path="RegisterProduct" element={<RegisterProduct />} />
          </Route>

          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-left"
          autoClose={1000}
          limit={2}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          className={"Toast"}
        />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
