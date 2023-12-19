import { orderModel } from "../../Model/ordermodel.js ";
import { productModel } from "../../Model/productModel.js ";
import catchAsyncError from "../../middlewares/CatchAsyncError.js ";
import Errorhandler from "../../middlewares/Errorhandler.js ";

const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    savedorder,
  });
});
const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id).populate("name email");
  if (!order)
    return next(new Errorhandler("Order not found with this id", 404));

  res.status(200).json({
    success: true,
    order,
  });
});

const myOrders = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    order,
  });
});

const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find();

  let totalAmount = 0;
  orders.forEach((ele) => {
    totalAmount += ele.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new Errorhandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new Errorhandler("You have already delivered this order", 400));
  }
  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (ele) => {
      await updateStock(ele.product, ele.quantity); // / need helper
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//  /  helper
async function updateStock(id, quantity) {
  const product = await productModel.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

export {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
