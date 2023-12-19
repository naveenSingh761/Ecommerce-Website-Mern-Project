import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useRef, useState } from "react";
import { addToCart, removefromcart } from "../../Actions/cartAction";
import { toast } from "react-toastify";
import { removeFromCart } from "../../Store/reducers/cartReducers";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink, useNavigate } from "react-router-dom";
const Mycart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="container">
      <div className="mt-5">
        <h1>My Cart</h1>
      </div>
      {cartItems.length === 0 && <EmptyCart />}

      <div className="mainCartContainer mt-5">
        {cartItems.map((item, index) => (
          <>
            <div className="forEachContainer" key={index}>
              <div>
                <img src={item.Photo} alt="" />
                <p>
                  <Rating
                    name="half-rating"
                    defaultValue={item.ratings}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </p>
              </div>
              <div className="ms-4">
                <p>{item.name}</p>
                <p>{item.description}</p>
                <div>
                  <UpdateToggle item={item} key={index} />
                  <p>
                    {" "}
                    ₹{" "}
                    {item.quantity === 1
                      ? item.price
                      : item.quantity * item.price}
                  </p>
                </div>
              </div>
            </div>
            <hr />





            
          </>
        ))}
      </div>

      {cartItems.length !== 0 && (
        <div className="cartPriceUtilitySection">
          <label htmlFor="">
            GST: (18%) ₹ {Number(0.18 * sumOFPrice(cartItems)).toFixed(2)}{" "}
          </label>
          <label htmlFor="">
            Instant Discount: ₹{" "}
            {Number(0.2 * 0.18 * sumOFPrice(cartItems)).toFixed(2)}
          </label>
          <hr />
          <label htmlFor="">
            Total Price: ₹ {Number(1.18 * sumOFPrice(cartItems)).toFixed(2)}{" "}
          </label>
        </div>
      )}
      <hr />
    </div>
  );
};

const sumOFPrice = (cartItems) => {
  const TotalPrice = cartItems.reduce(
    (sum, current) => {
      sum += current.price * current.quantity;
      return sum;
    },

    0
  );

  return TotalPrice;
};

export default Mycart;

const UpdateToggle = ({ item: product }) => {
  console.log("file: Mycart.js:90 ~ UpdateToggle ~ product:", product);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

  const ShowMessagae = (message) => {
    toast(message, {
      className: "toast-message",
      style: { fontSize: "10px", color: "black" },
    });
  };

  return (
    <div className="myproduct_CartInput InCart_section">
      <label htmlFor="">Quantity </label>
      <button
        onClick={() => {
          if (quantity + 1 <= product.Stock)
            setQuantity((prev) => Number(prev) + 1);
          else alert(`Only ${product.Stock} quantity remains in the Stock`);
        }}
      >
        ➕
      </button>{" "}
      <input
        type="Number"
        value={quantity}
        onChange={(element) => {
          const inputValue = Number(element.target.value);
          console.log(
            "file: Mycart.js:115 ~ UpdateToggle ~ inputValue:",
            inputValue,
            product.Stock
          );

          if (inputValue > -1) {
            if (inputValue === product.Stock) {
              setQuantity(product.Stock);
            }
            if (inputValue > product.Stock) {
              alert(`Huury Up Only ${product.Stock} quantity left in stock`);
              setQuantity(product.Stock);
            }

            if (inputValue < product.Stock) setQuantity(inputValue);
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
      <div className="mycartButtonSection">
        <div>
          <button
            onClick={() => {
              ShowMessagae("Order has been updated");
              dispatch(addToCart(product, quantity));
            }}
          >
            <p>update order</p>
          </button>
          <button
            onClick={() => {
              ShowMessagae("Order Removed from cart");
              dispatch(removefromcart(product));
            }}
          >
            <p>Remove order</p>
          </button>
        </div>
      </div>
    </div>
  );
};

const EmptyCart = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/Home");
    }, 2000);
  }, []);
  return (
    <>
      <div className="text-center mt-5">
        <ShoppingCartOutlinedIcon
          style={{ fontSize: "100px", color: "MediumVioletRed" }}
        />
        <p>Your Cart is empty, Shop More</p>
      </div>
    </>
  );
};
