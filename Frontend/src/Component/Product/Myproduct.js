import React, { useEffect, useRef, useState } from "react";
import { useParams, useMatches, useLocation } from "react-router";
import Carousel from "react-material-ui-carousel";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Actions/cartAction";
import { toast } from "react-toastify";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink } from "react-router-dom";
import {
  getProductDetailHandler,
  reviewFormHandler,
} from "../../Actions/productActions";
import Demo from "../../layout/Demo";

const Myproduct = () => {
  const params = useParams();
  const { _id } = params;
  const dispatch = useDispatch();

  const { SingleProduct: product, loading } = useSelector(
    (state) => state.products
  );

  const [quantity, setQuantity] = useState(1);
  const [cartStatus, setcartStatus] = useState(false);
  const isFirstRender = useRef(true);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProductDetailHandler(_id));
  }, [_id]);

  useEffect(() => {
    if (!isFirstRender.current) {
      if (cartStatus) {
        ShowMessage("Item Added to cart");
        dispatch(addToCart(product, quantity));
      }
    } else {
      isFirstRender.current = false;
    }
  }, [cartStatus]);

  const ShowMessage = (message) => {
    toast(message, {
      className: "toast-message",
      style: { fontSize: "10px", color: "black" },
    });
  };

  return loading || product === null ? (
    <Demo />
  ) : (
    <>
      <div className="myproductMainContainer">
        <div className="myproductImagesection">
          <Carousel interval={200000} animation="slide">
            {product?.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
        <div className="myproductinfosection">
          <div>
            <div className="MycartIcon">
              <Badge
                badgeContent={cartItems.length}
                color="secondary"
                max={10}
                overlap="circular"
              >
                <NavLink to={"/Mycart"}>
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: "8vmin", color: "DeepPink" }}
                  />
                </NavLink>
              </Badge>
            </div>

            <div>
              <p> name: {product.name} </p>
              <p> description: {product.description} </p>
              <p> price: {product.price} </p>
              <p>
                ratings:
                <Rating
                  name="half-rating"
                  // defaultValue={}
                  precision={0.5}
                  readOnly
                  size="small"
                  value={product.ratings}
                />
                <small>{product.numOfReviews} Reviews</small>
              </p>
              <p> category: {product.category} </p>
              <div>
                <div className="mypro__stock mb-5">
                  <p
                    style={{
                      backgroundColor: product.Stock === 0 ? "red" : "green",
                      display: "inline",
                    }}
                  >
                    {product.Stock ? "In Stock " : "Out of Stock "}
                  </p>
                </div>

                {product.Stock !== 0 && (
                  <div className="myproduct_CartInput">
                    <label htmlFor="">Add to </label>
                    <button
                      onClick={() => {
                        if (quantity + 1 <= product.Stock)
                          setQuantity((prev) => Number(prev) + 1);
                        else
                          alert(
                            `Only ${product.Stock} quantity remains in the Stock`
                          );
                      }}
                    >
                      ➕
                    </button>
                    <input
                      type="Number"
                      value={quantity}
                      onChange={(element) => {
                        const input = Number(element.target.value);

                        if (input > -1) {
                          if (input === product.Stock) {
                            setQuantity(product.Stock);
                          }
                          if (input > product.Stock) {
                            alert(
                              `Huury Up Only ${product.Stock} quantity left in stock`
                            );
                            setQuantity(product.Stock);
                          }

                          if (input < product.Stock) setQuantity(input);
                        } else {
                          setQuantity(1);
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (quantity - 1 > 0) setQuantity(quantity - 1);
                        else setQuantity(1);
                      }}
                    >
                      ➖
                    </button>
                    <div style={{ display: cartStatus ? "contents" : "none" }}>
                      <button
                        onClick={() => {
                          ShowMessage("Order has been updated");
                          dispatch(addToCart(product, quantity));
                        }}
                      >
                        <p>update order</p>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {product.Stock !== 0 && (
              <div className="Cart_utility">
                <button
                  onClick={() => {
                    setcartStatus(true);
                  }}
                >
                  {cartStatus ? "Added to cart 😊" : "Add to cart"}
                </button>
                <NavLink to={"/Mycart"}>
                  <button
                    onClick={() => {
                      dispatch(addToCart(product, quantity));
                    }}
                  >
                    Buy Now
                  </button>
                </NavLink>
              </div>
            )}
          </div>

          <div>
            <hr />
          </div>
          <Reviews product={product} />
        </div>
      </div>
    </>
  );
};

const Reviews = ({ product }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState();
  const [rating, setRating] = useState();
  const { SingleProductReviewList: listReviews } = useSelector(
    (state) => state.products
  );

  const reviewForm = (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("rating", rating);
    formdata.append("comment", review);
    formdata.append("productId", product._id);

    dispatch(reviewFormHandler(formdata));
    setReview("");
    setRating("");
  };
  return (
    <div className="myproductReviewSection mt-2 mb-5">
      <p>Ratings & Reviews</p>
      <form onSubmit={reviewForm}>
        <div>
          <p>Give Rating</p>
          <div>
            <Rating
              name="half-rating"
              defaultValue={0}
              precision={1}
              size="large"
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder=" Give a Review about Product"
            onChange={(e) => setReview(e.target.value)}
          />
          <button type="submit" onClick={reviewForm}>
            Add Review
          </button>
        </div>
      </form>
      {listReviews.map((item, index) => {
        return (
          <div key={index}>
            <p>@ {item.name}</p>
            <p>#Comment {item.comment}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Myproduct;
