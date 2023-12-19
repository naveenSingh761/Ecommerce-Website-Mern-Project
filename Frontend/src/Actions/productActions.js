import axios from "axios";
import {
  getProducts,
  ProductRequest,
  ProductSuccess,
} from "../Store/reducers/productReducers.js";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toastHandler } from "./userActions.js";

export const getALlproducts = () => async (dispatch) => {
  const url = process.env.REACT_APP_baseUrl + "products";

  const response = await axios.get("http://localhost:5000/products", {
    headers: {
      "Content-Type": "form-data/json",
      withCredentials: true,
    },
  });
  const {
    totalproductsCount,
    resultPerPage,
    filteredProductsCount,
    totalRecievedProducts,
    productsList,
  } = response.data;

  await dispatch(
    getProducts({
      loading: false,
      totalproductsCount,
      resultPerPage,
      filteredProductsCount,
      totalRecievedProducts,
      productsList,
    })
  );

  return productsList;
};

export const fetchData =
  (value, currentpage = 1, inputValue) =>
  async (dispatch) => {
    const url = `http://localhost:5000/products?page=${currentpage}&keyword=${inputValue.keyword}&price[gte]=${value[0]}&price[lte]=${value[1]}`;

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "form-data/json",
        withCredentials: true,
      },
    });
    const {
      totalproductsCount,
      resultPerPage,
      filteredProductsCount,
      totalRecievedProducts,
      productsList,
    } = response.data;

    await dispatch(
      getProducts({
        loading: false,
        totalproductsCount,
        resultPerPage,
        filteredProductsCount,
        totalRecievedProducts,
        productsList,
      })
    );

    return productsList;
  };

export const createProductHandler = (data, navigate) => async (dispatch) => {
  console.log(
    "file: productActions.js:71 ~ createProductHandler ~ data:",
    data
  );
  const url = `${process.env.REACT_APP_baseUrl}/admin/product/new`;

  console.log("file: productActions.js:73 ~ createProductHandler ~ url:", url);
  const response = await axios.post(url, data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  try {
    if (response.data) {
      console.log(
        "file: productActions.js:83 ~ createProduct ~ response.data:",
        response.data
      );
      toastHandler(
        `${response.data.product.name} has been register Successfully`
      );

      navigate("/Home");
    }
  } catch (error) {
    console.log("file: productActions.js:86 ~ createProduct ~ error:", error);
  }
};

export const reviewFormHandler = (data) => async (dispatch) => {
  const url = `${process.env.REACT_APP_baseUrl}/review`;

  const response = await axios.put(url, data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  try {
    if (response.data) {
      dispatch(
        getProducts({
          SingleProductReviewList: response.data.ReviewList,
        })
      );
    }
  } catch (error) {
    console.log(
      "file: productActions.js:111 ~ reviewFormHandler ~ error:",
      error
    );
  }
};

export const getProductDetailHandler = (_id) => async (dispatch) => {
  dispatch(ProductRequest());

  const url = `${process.env.REACT_APP_baseUrl}/product/${_id}`;

  const response = await axios.get(url, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  try {
    if (response.data) {
      dispatch(ProductSuccess(response.data.product));
      dispatch(
        getProducts({
          SingleProductReviewList: response.data.product.Reviews,
        })
      );
    }
    console.log(
      "file: productActions.js:138 ~ getProductDetailHandler ~ response.data.product:",
      response.data.product
    );
  } catch (error) {
    console.log(
      "file: productActions.js:136 ~ getProductDetailHandler ~ error:",
      error
    );
  }
};
