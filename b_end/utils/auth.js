import { user } from "../Model/userModel.js";
import catchAsyncError from "../middlewares/CatchAsyncError.js";
import Errorhandler from "../middlewares/Errorhandler.js";
import jwt from "jsonwebtoken";

export const isAuthenicated = catchAsyncError(async (req, res, next) => {
  try {
    const { Ltoken } = req.cookies;
    if (!Ltoken) {
      return next(new Errorhandler("Please login to access the resouces", 401));
    }
    const { id } = await jwt.decode(Ltoken, process.env.SecretKey);
    req.user = await user.findById(id);

    next();
  } catch (error) {
    console.log("file: auth.js:18 ~ isAuthenicated ~ error:", error);
  }
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Errorhandler(
          `Role ${req.user.role} is not allowed to access to resouces`,
          403
        )
      );
    }

    next();
  };
};
