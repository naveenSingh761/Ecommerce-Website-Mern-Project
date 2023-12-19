import { user } from "../../Model/userModel.js";
import catchAsyncError from "../../middlewares/CatchAsyncError.js";
import Errorhandler from "../../middlewares/Errorhandler.js";
import { sentToken } from "../../utils/jwtToken.js";
import sendMail from "../../utils/sendMail.js";
import jwt from "jsonwebtoken";
import cloudinary from "./../../utils/Cloudinary.js";
import crypto from "crypto";

export const registerUser = catchAsyncError(async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "banners",
    width: 1920,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  let User = await user.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id || "no id ",
      url: result.secure_url || " No url",
    },
  });
  sentToken(User, 201, res);
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  console.log(" DarkCyan ");
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandler("Please Enter email and password", 400));
  }

  const User = await user.findOne({ email: email }).select("+password");

  if (!User) {
    return next(new Errorhandler("Invalid email or password", 404));
  }

  const ispasswordMatched = await User.comparePassword(password);
  if (!ispasswordMatched) {
    return next(
      new Errorhandler("Please Enter correct  email and password", 404)
    );
  }

  sentToken(User, 200, res);
});

export const logout = catchAsyncError(async (req, res, next) => {
  const { Ltoken } = req.cookies;

  res.cookie("Ltoken", null, {
    expires: new Date(Date.now()),
    httponly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const User = await user.findOne({ email: req.body.email });
  console.log(
    "file: UserController.js:64 ~ forgotPassword ~ req.body.email :",
    req.body.email
  );
  if (!User) return next(new Errorhandler("User not found", 404));

  const resettoken = await User.getResetPasswordToken();
  console.log(
    "file: UserController.js:67 ~ forgotPassword ~ resettoken:",
    resettoken
  );

  await User.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resettoken}`;
  console.log(
    "file: UserController.js:73 ~ forgotPassword ~ resetPasswordUrl:",
    resetPasswordUrl
  );

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendMail({
      email: user.email,
      subject: `Password Recovery Mail`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${User.email} successfully`,
    });
  } catch (error) {
    console.log("file: UserController.js:97 ~ forgotPassword ~ error:", error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await User.save({ validateBeforeSave: false });

    return next(new Errorhandler(error.message, 500));
  }
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const User = await user.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  console.log("file: UserController.js:108 ~ resetPassword ~ User:", User);
  if (!User) {
    return next(
      new Errorhandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Errorhandler("Password does not match", 400));
  }
  User.password = req.body.newPassword;
  User.resetPasswordToken = undefined;
  User.resetPasswordExpire = undefined;

  await User.save();
  sentToken(User, 200, res);
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const User = await user.findById(req.user.id).select("-updatedAt -__v");
  res.status(200).json({
    success: true,
    user: User,
  });
});

export const updatePassword = catchAsyncError(async (req, res, next) => {
  const User = await user.findById(req.user.id).select("+password");

  const isPasswordMatched = await User.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new Errorhandler("old password does not match", 404));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Errorhandler("Password does not match", 400));
  }

  User.password = req.body.newPassword;
  User.resetPasswordToken = undefined;
  User.resetPasswordExpire = undefined;

  await User.save();
  sentToken(User, 200, res);
});

export const getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await user.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

export const getSingleUser = catchAsyncError(async (req, res, next) => {
  const User = await user.findById(req.params.id);

  if (!User) {
    return next(
      new Errorhandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    User,
  });
});
export const updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await user.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const User = await user.findById(req.params.id);

  if (!User) {
    return next(
      new Errorhandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const User = await user.findById(req.user.id).select("+password");

  if (!User) return new Errorhandler(`User does not exist`, 400);

  const ispasswordMatched = await User.comparePassword(
    req.body.confirmPassword
  );

  if (!ispasswordMatched) {
    return next(
      new Errorhandler("Please Enter correct  email and password", 404)
    );
  }

  if (req.body.avatar) {
    const imageId = req.user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);

    const result = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "banners",
      width: 1920,
      crop: "scale",
    });

    User.avatar.public_id = result.public_id;

    User.avatar.url = result.secure_url;
  }

  User.email = req.body.updatedEmail;
  await User.save({ validateModifiedOnly: true });

  sentToken(User, 200, res, "Profile Updated Successfully");
});

// export const saveImage = async (avatar) => {
//   console.log("file: userActions.js:146 ~ saveImage ~ avatar:", avatar.type);
//   const data = new FormData();
//   data.append("file", avatar);
//   data.append("upload_preset", "Zodiac");
//   data.append("cloud_name", "dcl6ldsyl");

//   try {
//     if (avatar === null) {
//       return alert("Please Upload image");
//     }

//     const res = await fetch(
//       "https://api.cloudinary.com/v1_1/dcl6ldsyl/image/upload",
//       {
//         method: "POST",
//         body: data,
//       }
//     );

//     const cloudData = await res.json();
//     console.log(cloudData);
//     alert("Image Upload Successfully");
//   } catch (error) {
//     console.log("file: userActions.js:165 ~ saveImage ~ error:", error);
//   }
// };
