import React, { useEffect, useRef, useState } from "react";
import "./../../Styles/home.scss";
import { fetchData, getALlproducts } from "../../Actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Pagination from "react-js-pagination";
import { Fragment } from "react";
import Rating from "@mui/material/Rating";
import { isAuthenicatedHandler } from "../../Actions/userActions.js";
import Demo from "../../layout/Demo.js";

const Home = () => {
  const { loading, productsList } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [value, setValue] = useState([0, 150000]);
  const [currentpage, setCurrentPage] = useState(1);
  const [inputValue, setinputValue] = useState({
    categories: "",
    keyword: "",
  });

  useEffect(() => {
    const productList = dispatch(getALlproducts());
  }, [dispatch]);

  function fetch_Fucn() {
    return dispatch(fetchData(value, currentpage, inputValue));
  }

  useEffect(() => {
    fetch_Fucn();
  }, [currentpage, value]);

  return loading ? (
    <Demo />
  ) : (
    <Fragment>
      <div className="HomeMainContainer">
        <SearchComponent
          inputValue={inputValue}
          setinputValue={setinputValue}
          fetch_Fucn={fetch_Fucn}
        />
        <hr />
        <div className="mainrenderProduct">
          <div className="renderProduct">
            {productsList && <ProductCard productsList={productsList} />}
          </div>
        </div>
        <PaginationComponent // slider and pagination
          value={value}
          setValue={setValue}
          currentpage={currentpage}
          setCurrentPage={setCurrentPage}
          fetch_Fucn={fetch_Fucn}
        />
      </div>
    </Fragment>
  );
};

export default Home;

const SearchComponent = ({ fetch_Fucn, inputValue, setinputValue }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setinputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="Homesearch_MainContainer">
      <div className="Homesearch__searchContainer2">
        <select name="categories" onChange={handleFilterChange}>
          <option value="default">categories</option>
          <option value="Accessories"> Accessories</option>
          <option value="Appliances"> Appliances</option>
          <option value="Mobile"> Mobile</option>
          <option value="kitchen"> kitchen</option>
          <option value="Cosmetics"> Cosmetics</option>
          <option value="Medical"> Medical</option>
        </select>
        <input
          type="text"
          name="keyword"
          placeholder=" @ john Cena"
          value={inputValue.keyword}
          onChange={handleFilterChange}
        />

        <p
          onClick={() => {
            fetch_Fucn();
          }}
        >
          Search
        </p>
      </div>
    </div>
  );
};

const PaginationComponent = ({
  value,
  setValue,
  currentpage,
  setCurrentPage,
}) => {
  const { resultPerPage, filteredProductsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (resultPerPage > filteredProductsCount || filteredProductsCount === 0)
      setCurrentPage(1);
  }, [filteredProductsCount]);

  return (
    <>
      <div className="Slider">
        <label htmlFor="">Price</label>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={(event, value) => {
            setValue(value);
          }}
          valueLabelDisplay="auto"
          getAriaValueText={(e) => {
            return e;
          }}
          color="info"
          max={150000}
        />
      </div>

      <hr />
      {resultPerPage < filteredProductsCount && (
        <div className="paginationBox">
          <div>
            <Pagination
              activePage={
                resultPerPage < filteredProductsCount ? currentpage : 1
              }
              itemsCountPerPage={resultPerPage}
              totalItemsCount={filteredProductsCount}
              onChange={(e) => {
                setCurrentPage(resultPerPage < filteredProductsCount ? e : 1);
              }}
              nextPageText={window.innerWidth < "600" ? "⟩" : "next"}
              prevPageText={window.innerWidth < "600" ? "⟨" : "prev"}
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
              pageRangeDisplayed={window.innerWidth < "600" ? 3 : 5}
            />
          </div>
        </div>
      )}
    </>
  );
};

const ProductCard = ({ productsList }) => {
  const navigate = useNavigate();

  return productsList
    .slice()
    .sort((a, b) => a.price - b.price)
    .map((item, index) => {
      const url = ` ${item.images[0].url}` + "";
      const rating = item.ratings;

      return (
        <div className="renderProduct2 " key={index}>
          <NavLink to={`/product/${item._id}`}>
            <img src={url} alt="png.com" />
          </NavLink>
          <div className="infoSection">
            <p>name : {item.name}</p>
            <p>price: {item.price}</p>
            <p>
              Rating:
              <Rating
                name="half-rating"
                defaultValue={rating}
                precision={0.5}
                readOnly
                size="small"
              />
            </p>
            <p>Total Reviews: {item.numOfReviews}</p>
            <div className="mypro__stock">
              <p
                style={{
                  backgroundColor: item.Stock === 0 ? "red" : "green",
                  display: "inline",
                }}
              >
                {item.Stock ? "In Stock " : "Out of Stock "}
              </p>
            </div>
          </div>
        </div>
      );
    });
};
