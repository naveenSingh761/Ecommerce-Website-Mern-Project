import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Product name"],
    },
    description: {
      type: String,
      required: [true, "Please Enter Product Description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter Product Description"],
      maxLength: [8, "Price cannot exceed 6 character"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      //we use cloud navi which provide url and public id
      {
        public_id: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          // required: true,
        },
      },
    ],

    category: {
      type: String,
      required: [true, "Please enter Product Category"],
    },
    Stock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      maxLength: [4, "Stock cannot exceed 4"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    Reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "user",
          required: true,
        },

        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const productModel = mongoose.model("product", ProductSchema);
