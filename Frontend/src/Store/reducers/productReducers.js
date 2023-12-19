import { createSlice } from "@reduxjs/toolkit";

export const productslice = createSlice({
  name: "products",
  initialState: {
    loading: true,
    totalproductsCount: 0,
    resultPerPage: 0,
    filteredProductsCount: 0,
    totalRecievedProducts: 0,
    productsList: [],
    SingleProduct: null,
    SingleProductReviewList: null,
  },
  reducers: {
    getProducts(state, action) {
      const {
        loading,
        totalproductsCount,
        resultPerPage,
        filteredProductsCount,
        totalRecievedProducts,
        productsList,
        SingleProduct,
        SingleProductReviewList,
      } = action.payload;
      console.log("file: productReducers.js:27 ~ getProducts ~ action.payload:", action.payload);

      if (loading !== undefined) state.loading = loading;
      if (totalproductsCount !== undefined)
        state.totalproductsCount = totalproductsCount;
      if (resultPerPage !== undefined) state.resultPerPage = resultPerPage;
      if (filteredProductsCount !== undefined)
        state.filteredProductsCount = filteredProductsCount;
      if (totalRecievedProducts !== undefined)
        state.totalRecievedProducts = totalRecievedProducts;
      if (productsList !== undefined) state.productsList = productsList;
      if (SingleProduct !== undefined) state.SingleProduct = SingleProduct;
      if (SingleProductReviewList !== undefined)
        state.SingleProductReviewList = SingleProductReviewList;
    },

    ProductRequest(state, action) {
      state.loading = true;
    },
    ProductSuccess(state, action) {
      state.loading = false;
      state.SingleProduct = action.payload;
    },
  },
});

export const { getProducts, ProductRequest, ProductSuccess } =
  productslice.actions;
