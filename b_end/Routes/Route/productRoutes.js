import express from "express";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  getALlproducts,
  getSingle_ProdDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} from "../Controller/productController.js";
import { isAuthenicated, authorizeRoles } from "../../utils/auth.js";

const router = express.Router();

//user Route
router.get("/products", getALlproducts);
router.get("/product/:id", getSingle_ProdDetails);
// router.get("/product/:id", isAuthenicated);

//Admin Route

router.get(
  "/admin/products",
  isAuthenicated,
  authorizeRoles("admin"),
  getAdminProducts
);

router
  .route("/admin/product/new")
  .post(isAuthenicated, authorizeRoles("admin"), createProduct);

router.put(
  "/product/:id",
  isAuthenicated,
  authorizeRoles("admin"),
  updateProduct
);
router.delete(
  "/product/:id",
  isAuthenicated,
  authorizeRoles("admin"),
  deleteProduct
);

router.route("/review").put(isAuthenicated, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenicated, deleteReview);

export default router;
