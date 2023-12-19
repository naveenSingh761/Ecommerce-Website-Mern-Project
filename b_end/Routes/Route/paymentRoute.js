import express from "express";
import {
  processPayment,
  sendStripeApiKey,
} from "../Controller/paymentController.js";
import { authorizeRoles, isAuthenicated } from "../../utils/auth.js";

const router = express.Router();

router.route("/payment/process").get(isAuthenicated, processpayment);
router.route("/stripeapikey").get(isAuthenicated, sendStripeApiKey);

export default router;
