import axios from "axios";
import { isAuthen } from "../Store/reducers/userReducers";
import { mycart, removeFromCart } from "../Store/reducers/cartReducers";

export const addToCart = (product, quantity) => (dispatch, getState) => {
  console.log("file: cartAction.js:5 ~ addToCart ~ quantity:", quantity);
  const item = {
    productid: product._id || product.productid,
    name: product.name,
    description: product.description,
    price: product.price,
    ratings: product.ratings,
    Stock: product.Stock,
    category: product.category,
    Photo: product.Photo || product.images[0].url,
    quantity,
  };

  dispatch(mycart({ item }));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removefromcart = (product) => (dispatch, getState) => {
  console.log("file: cartAction.js:23 ~ removefromcart ~ product:", product);
  dispatch(removeFromCart({ item: product }));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
