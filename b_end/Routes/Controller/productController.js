import Errorhandler from "../../middlewares/Errorhandler.js";
import { productModel } from "../../Model/productModel.js";
import catchAsyncError from "../../middlewares/CatchAsyncError.js";
import { Apifeatures } from "../../utils/apifeatures.js";
import cloudinary from "./../../utils/Cloudinary.js";

// -------------------------------------------------------------Admin Routes

// create     Product     => Admin_ Route
const createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
      width: 700,
      crop: "scale",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const product = await productModel.create(req.body);

  res.status(200).json({
    success: true,
    product: product,
  });
});

// update     Product     => Admin_ Route
const updateProduct = catchAsyncError(async (req, res, next) => {
  const _id = req.params.id;
  const product = await productModel.findById(_id);

  product
    ? res.status(200).json({
        message: "Product updated Successfully",
        product: await productModel.findByIdAndUpdate(_id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }),
      })
    : res.status(400).json({
        message: "Please enter a valid id",
      });
});

// delete     Product     => Admin_ Route
const deleteProduct = catchAsyncError(async (req, res, next) => {
  const _id = req.params.id;
  const product = await productModel.findById(_id);
  res.status(200).json({
    message: "Delete product Successfully",
    product: await productModel.findByIdAndDelete(_id),
  });
});

//Get All Product   => User Route
const getAdminProducts = catchAsyncError(async (req, res) => {
  res.status(200).json({
    "Total Products": await productModel.countDocuments(),
    "Products List": await productModel.find({}),
  });
});

// -------------------------------------------------------------User Routes

//Get All Product   => User Route
const getALlproducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const totalproductsCount = await productModel.countDocuments();

  const apiFeature = new Apifeatures(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  let products = await apiFeature.query;
  let totalRecievedProducts = products.length;

  const apiFeaturecopy = new Apifeatures(productModel.find(), req.query)
    .search()
    .filter();

  let Filteredproducts = await apiFeaturecopy.query;

  let filteredProductsCount = Filteredproducts.length;

  res.status(200).json({
    success: true,
    totalproductsCount,
    resultPerPage,
    filteredProductsCount,
    totalRecievedProducts,
    productsList: products,
  });
});

//Get single  Product   => User Route
const getSingle_ProdDetails = catchAsyncError(async (req, res, next) => {
  const _id = req.params.id;
  const product = await productModel.findById(_id);

  if (!product) {
    return next(new Errorhandler("Product not found", 400));
  }

  res.status(200).json({
    suceess: true,
    message: "Product Found Successfully",
    product,
  });
});

const createProductReview = catchAsyncError(async (req, res, next) => {
  // / productid in body
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productModel.findById(productId);
  console.log(
    "file: productController.js:142 ~ createProductReview ~ product:",
    product
  );

  const isReviewed = product.Reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  console.log(
    "file: productController.js:147 ~ createProductReview ~ isReviewed:",
    isReviewed
  );

  if (isReviewed) {
    product.Reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.Reviews.push(review);
    product.numOfReviews = product.Reviews.length;
  }
  let avg = 0;

  product.Reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.Reviews.length;

  const Updatedproduct = await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    ReviewList: Updatedproduct.Reviews.slice(0, 5),
  });
});

const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.query.id);
  console.log(
    "file: productController.js:181 ~ getProductReviews ~ product:",
    product
  );

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  getALlproducts,
  getSingle_ProdDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
};
