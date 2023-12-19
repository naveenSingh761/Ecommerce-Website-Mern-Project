import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  getAllUser,
  getSingleUser,
  updateUserRole,
  updateProfile,
  deleteUser,
} from "../Controller/UserController.js";
import { isAuthenicated, authorizeRoles } from "../../utils/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);    // done
router.route("/login").post(loginUser);          // done

router.route("/logout").get(logout); // done

router.route("/password/forgot").post(forgotPassword); // work
router.route("/password/reset/:token").put(resetPassword); //work
router.route("/me").get(isAuthenicated, getUserDetails); //done

router.route("/password/update").put(isAuthenicated, updatePassword);
router.route("/me/update").put(isAuthenicated, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenicated, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenicated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenicated, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenicated, authorizeRoles("admin"), deleteUser);

export default router;
