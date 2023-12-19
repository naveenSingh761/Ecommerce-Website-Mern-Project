import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Demo from "../../layout/Demo";
import { createProductHandler } from "../../Actions/productActions.js";
const RegisterProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });

  const ProductFields = ["name", "description", "category", "price", "stock"];
  const ProductPlaceholder = [
    "Enter Product Name",
    "Description Of Product",
    "Category Of Product",
    "Price Of Product",
    "Available Stock",
  ];

  const [avatar, setAvatar] = useState("/Profile.png");
  const [loading, setLoading] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const registerSubmit = async (e) => {
    for (const i of Object.entries(user)) {
      if (!i[1]) {
        return alert(`${i[1]} is missing`);
      }
    }
    if (avatar === null) {
      return alert("Please Upload image");
    }

    setLoading(1);
    const myForm = new FormData();
    myForm.append("name", user.name);
    myForm.append("description", user.description);
    myForm.append("category", user.category);
    myForm.append("price", user.price);
    myForm.append("stock", user.stock);
    myForm.append("images", avatar);

    console.log(`File=>  RegisterProduct.js => Line number: 52    `, user);

    dispatch(createProductHandler(myForm, navigate));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  return loading !== 0 ? (
    <Demo />
  ) : (
    <Fragment>
      <div className="Loginmaincontainer">
        <div className="dashboard">
          <div className="FormContainer">
            <form
              className="signUpForm"
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="inputContainer">
                <div>
                  {ProductFields.map((item, index) => (
                    <div className="fieldInput">
                      <input
                        type={
                          item === "price" || item === "stock"
                            ? "number"
                            : "text"
                        }
                        placeholder={ProductPlaceholder[index]}
                        required
                        name={item}
                        value={user[item]}
                        onChange={registerDataChange}
                        max={
                          item === "price"
                            ? 300000
                            : item === "stock"
                            ? 1000
                            : null
                        }
                      />
                    </div>
                  ))}

                  <div className="signUpAvatar my-3 ms-2">
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                      className="custom-file-input"
                    />
                  </div>
                </div>

                {avatar !== "/Profile.png" && (
                  <div className="imageContainer">
                    <>
                      <img src={avatarPreview} className="avatarImage" />
                    </>
                  </div>
                )}
              </div>

              <div className="text-center Register">
                <button type="submit" value="Register" className="dashButton1">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterProduct;
