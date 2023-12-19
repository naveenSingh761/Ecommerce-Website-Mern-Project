import axios from "axios";
import {
  Request,
  Success,
  Fail,
  logoutSuccess,
  clearError,
} from "../Store/reducers/userReducers";
import { toast } from "react-toastify";

export const toastHandler = (message) =>
  toast(message, {
    className: "toast-message",
    style: { fontSize: "10px", color: "black" },
  });

// for Regitering user
export const RegisterHandler = (data, navigate) => async (dispatch) => {
  dispatch(Request());

  let response;
  try {
    response = await axios.post(
      `${process.env.REACT_APP_baseUrl}/register`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (response.data) {
      dispatch(
        Success({
          user: response.data.user,
          message: response.data.message,
        })
      );
      toastHandler("Register Successfully");
      navigate("/Home");
    } else {
      alert("Registration is not successful");
      toastHandler("Registration failed");
    }
  } catch (error) {
    dispatch(Fail(error.response.data.message));
  }
};

export const Loginhandler = (data, navigate) => async (dispatch) => {
  dispatch(Request());
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_baseUrl}/login`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.data) {
      dispatch(
        Success({
          user: response.data.user,
          message: response.data.message,
        })
      );
      localStorage.setItem("isAuthenicated", true);
      toastHandler("Login Succesfull");
      navigate("/Home");
    } else {
      toastHandler("Login failed");
    }
  } catch (error) {
    dispatch(Fail(error.response.data.message));
    toastHandler("Bad Crenditials");
    // console.log("file: userActions.js:49 ~ Loginhandler ~ error:", error);
  }
};

// Auth
export const isAuthenicatedHandler = () => async (dispatch, getState) => {
  dispatch(Request());

  try {
    const response = await axios.get(`${process.env.REACT_APP_baseUrl}/me`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.data) {
      dispatch(
        Success({
          user: response.data.user,
          message: response.data.message,
        })
      );
      localStorage.setItem("isAuthenicated", true);
    }
  } catch (error) {
    dispatch(Fail(error.response.data.message));

    console.log(
      "file: userActions.js:68 ~ isAuthenicatedHandler ~ error:",
      error
    );
  }
};

// for  Logout
export const logoutHandler = () => async (dispatch) => {
  dispatch(Request());

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_baseUrl}/logout`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.data) {
      dispatch(
        logoutSuccess({
          message: response.data.message,
        })
      );
      localStorage.setItem("isAuthenicated", false);

      toastHandler("Logout Successfully");
    } else {
      alert("Logout is not successful");
    }
  } catch (error) {
    dispatch(Fail(error.response.data.message));

    // alert("Logout is not successful", error);

    // console.log("file: userActions.js:14 ~ Register ~ error:", error);
  }
};

// for requesting Forgot  Password
// required email only
export const forgotHandler = (data, navigate) => async (dispatch) => {
  console.log("file: userActions.js:132 ~ forgotHandler ~ data:", data);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_baseUrl}/password/forgot`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.data) {
      setTimeout(() => {
        navigate("/Home");
      }, 2000);
      toastHandler("Password link has been sent on email");
    } else {
      alert("Password request failed 89 ");
    }
  } catch (error) {
    alert("Password request failed 4565", error.message);
    dispatch(Fail(error.response.data.message));

    console.log(
      "file: userActions.js:153 ~ forgotHandler ~ error.message:",
      error.message
    );

    console.log("file: userActions.js:149 ~ forgotHandler ~ error:", error);
  }
};

// for  reset  Password
// Required Parameters  newPassword
// Required Parameters  confirmPassword
export const resetHandler = (data, token, navigate) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_baseUrl}/password/reset/${token}`, //todo token add
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.data) {
      navigate("/Login");
      toastHandler("Password changed Successfully");
      toastHandler("Login with new credentials");
    } else {
      alert("Password request failed ");
    }
  } catch (error) {
    dispatch(Fail(error.response.data.message));
    alert("Password request failed ", error);
    console.log("file: userActions.js:178 ~ resetHandler ~ error:", error);
  }
};

// for  updatePassword  Password
// Required Parameters  oldPassword
// Required Parameters  newPassword
// Required Parameters  confirmPassword
export const updatePasswordHandler = (data, navigate) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_baseUrl}/password/update`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.data) {
      navigate("/Login");
      toastHandler("Password changed Successfully");
      toastHandler("Login with new credentials next time");
    } else {
      alert("Password request failed ");
    }
  } catch (error) {
    dispatch(Fail(error.response.data.message));

    alert("Password request failed ", error);
    console.log(
      "file: userActions.js:209 ~ updatePasswordHandler ~ error:",
      error
    );
  }
};

// Admin Routes
export const getAllUserHandler = (data, navigate) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_baseUrl}/admin/users`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.data) {
      navigate("/Login");
      toastHandler("All user fetched Successfully");
    } else {
      alert("Request failed ");
    }
  } catch (error) {
    dispatch(Fail(error.response.data.message));

    alert("Request failed ", error);
    console.log("file: userActions.js:234 ~ getAllUserHandler ~ error:", error);
  }
};
export const getSingleUserHandler = (data, navigate) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_baseUrl}/admin/users`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.data) {
      navigate("/Login");
    } else {
      alert("Request failed ");
    }
  } catch (error) {
    dispatch(Fail(error.response.data.message));

    alert("Request failed ", error);
    console.log(
      "file: userActions.js:254 ~ getSingleUserHandler ~ error:",
      error
    );
  }
};
export const updateUserRoleHandler = (data, navigate) => async (dispatch) => {
  dispatch(Request());

  try {
    const response = await axios.put(
      `${process.env.REACT_APP_baseUrl}/admin/users`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.data) {
      dispatch(Success());
      navigate("/Login");
      toastHandler("User role Has been changed");
    } else {
      alert("Request failed ");
    }
  } catch (error) {
    dispatch(Fail(error.response.data.message));

    alert("Request failed ", error);
    console.log(
      "file: userActions.js:276 ~ updateUserRoleHandler ~ error:",
      error
    );
  }
};

// export const deleteUserHandler = (data, navigate) => async (dispatch) => {
//   try {
//     const response = await axios.delete(
//       `${process.env.REACT_APP_baseUrl}/admin/users`,
//       data,
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       }
//     );

//     if (response.data) {
//       navigate("/Login");
//       toastHandler("User Has Been Deleted");
//     } else {
//       alert("Request failed ");
//     }
//   } catch (error) {
//     dispatch(Fail(error.response.data.message));

//     alert("Request failed ", error);
//     console.log("file: userActions.js:298 ~ deleteUserHandler ~ error:", error);
//   }
// };

export const updateProfileHandler = (data, navigate) => async (dispatch) => {
  console.log("file: userActions.js:350 ~ updateProfileHandler ~ data:", data);
  dispatch(Request());

  try {
    const response = await axios.put(
      `${process.env.REACT_APP_baseUrl}/me/update`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    console.log(
      "file: userActions.js:363 ~ updateProfileHandler ~ response.data:",
      response
    );

    if (response.data) {
      dispatch(
        Success({
          user: response.data.user,
          message: response.data.message,
        })
      );
      navigate("/Profile");
      toastHandler("User has been Updated");
    } else {
      alert(
        `File=>  userActions.js => Line number: 374    ` +
          "      Update Request failed "
      );
    }
  } catch (error) {
    navigate("/Home");
    console.log(
      "file: userActions.js:379 ~ updateProfileHandler ~ error:",
      error
    );
  }
};

// saving image to cloudinary
// export const saveImage = async (avatar) => {
//   const data = new FormData();
//   data.append("file", avatar);
//   data.append("upload_preset", "Zodiac");
//   data.append("cloud_name", "dcl6ldsyl");

//   try {
//     const res = await fetch(
//       "https://api.cloudinary.com/v1_1/dcl6ldsyl/image/upload",
//       {
//         method: "POST",
//         body: data,
//       }
//     );

//     const cloudData = await res.json();
//     toastHandler("Picture SuccessFully Uploaded");
//     return cloudData;
//   } catch (error) {
//     toastHandler("Picture  Uploaded failed");
//     console.log("file: userActions.js:165 ~ saveImage ~ error:", error);
//   }
// };
// delete image to cloudinary
// export const deleteImage = async (user) => {
//   const cloudName = "dcl6ldsyl";
//   const apiKey = 254937453515298;
//   const apiSecret = "dcqtdmoxRIWORBm3L1JGYJl2ZEA";

//   const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?public_ids=${user.avatar.public_id}&api_key=${apiKey}&api_secret=${apiSecret}`;

//   try {
//     const response = await fetch(url, {
//       method: "DELETE",
//     });

//     console.log("file: userActions.js:418 ~ deleteImage ~ response:", response);

//     if (response.ok) {
//       console.log(
//         `Image with public ID ${user.avatar.public_idrs
//         } deleted successfully.`
//       );
//     } else {
//       console.error("Failed to delete image.");
//     }
//   } catch (error) {
//     console.error("Error deleting image:", error);
//   }
// };

// * ------------------------------Testin Cloudinary------------------------------

// Now, perform the upload using axios or fetch
// export const uploadData = async (formdata) => {
//   console.log(
//     `userActions.js => Line number: 116 =>  CLOUDINARY_API_KEY `,
//     process.env.CLOUDINARY_API_KEY
//   );

//   try {
//     const response = await axios.post(
//       "cloudinary://254937453515298:dcqtdmoxRIWORBm3L1JGYJl2ZEA@dcl6ldsyl",
//       formdata,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: 254937453515298,
//         },
//       }
//     );

//     console.log("Image uploaded:", response.data);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// };

// Call the function to initiate the upload
// uploadData();

// * ------------------------------Testin Cloudinary------------------------------
