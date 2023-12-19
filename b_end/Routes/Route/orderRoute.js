import express from "express";

import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../Controller/ordercontroller.js";
import { authorizeRoles, isAuthenicated } from "../../utils/auth.js";

const router = express.Router();
router.route("/order/new").post(isAuthenicated, newOrder);
router.route("/order/:id").get(isAuthenicated, getSingleOrder);
router.route("/order/me").get(isAuthenicated, myOrders);
router
  .route("/admin/order")
  .get(isAuthenicated, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenicated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenicated, authorizeRoles("admin"), deleteOrder);

export default router;
