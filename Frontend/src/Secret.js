import React, { useEffect, useState } from "react";
import axios from "axios";

const Secret = () => {
  const [pageno, setPageno] = useState([1, 2, 3, 4, 5, 6]);
  const [ActivePage, setActivePage] = useState(0);
  const [Data, SetData] = useState("");
  const [RightData, SetRightData] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("default");
  const [inputValue, setinputValue] = useState("");

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const fetchData = async (index = 1) => {
    const url = `http://localhost:5000/GivemeData?page=${index}&${selectedFilter}=${inputValue}`;

    SetData(await axios.get(url));
  };

  const fetchData2 = async () => {
    const url = `http://localhost:5000/GivemeData?${selectedFilter}=${inputValue}`;
    console.log(`Secret.js => Line number: 23 =>  url `, url);

    SetData(await axios.get(url));
  };

  useEffect(() => {
    console.log(
      `Secret.js => Line number: 23 =>  selectedFilter `,
      selectedFilter
    );
  }, [selectedFilter]);

  return (
    <div className="Secret_MainContainer">
      <div className="__searchContainer2">
        <select onChange={handleFilterChange}>
          <option value="default">Filter</option>
          <option value="Age">Age</option>
          <option value="Gender">Gender</option>
          <option value="Country">Country</option>
        </select>
        <input
          type="text"
          // name=""
          placeholder=" @ john Cena"
          value={inputValue}
          onChange={(event) => {
            setinputValue(event.target.value);
          }}
        />

        <p
          onClick={() => {
            fetchData();
          }}
        >
          Search
        </p>
      </div>

      <div className="Secret_Container">
        {/* // * left Section  Start   */}
        <div
          className="Secret_leftSection"
          style={{
            width: RightData ? "70vw" : "100vw",
          }}
        >
          <div className="image_section">
            {Data !== "" ? (
              Data.data.TransferredData.map((item, index) => (
                <>
                  <div key={index.toString()}>
                    <img
                      className="Secret_image"
                      src={item.Photo[0]}
                      onClick={() => {
                        SetRightData(item);
                      }}
                    />

                    <div className="image_info">
                      <p> @ {(item.name + "").slice(0, 10)}</p>
                      <p>Age {item.age}</p>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <Dummy fetchData={fetchData} />
            )}
          </div>

          <Pagination
            fetchData={fetchData}
            setActivePage={setActivePage}
            pageno={pageno}
            ActivePage={ActivePage}
          />
        </div>

        {/* // * left Section  end   */}

        {/* // = Right Section  start   */}

        {RightData && (
          <div className="Secret_rightSection">
            <div>
              {RightData ? (
                <>
                  {/* ---------------------Trial-------------------------- */}

                  <ImageRendering arrImage={RightData.Photo} start={0} />

                  {/* ---------------------Trial-------------------------- */}

                  <div className="image_info">
                    <div className="image_basic1">
                      <p> @ {RightData.name}</p>
                      <p>Age {RightData.age}</p>
                    </div>

                    <div className="image_basic2">
                      <p>Gender: {RightData.gender}</p>
                      <p>Country: {RightData.Country}</p>
                    </div>
                    <div className="image_basic3">
                      <p>Contact : {RightData.phoneNo}</p>
                      <button
                        onClick={() => {
                          SetRightData(null);
                        }}
                      >
                        Hide
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}

        {/* ------------content Hidder---------- */}
      </div>

      {/* // = Right Section  end   */}
    </div>
  );
};

export default Secret;

const ImageRendering = ({ arrImage }) => {
  const [initImage, setinitImage] = useState(0);
  useEffect(() => {
    setinitImage(0);
  }, [arrImage]);

  const length = arrImage.length;
  return (
    <>
      <img
        key={initImage}
        className="Secret_image"
        src={arrImage[initImage]}
        onClick={() => {
          setinitImage((initImage + 1) % length);
        }}
      />
    </>
  );
};

const Dummy = ({ fetchData }) => {
  return (
    <>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ab
        dolorem recusandae, adipisci nesciunt aliquam ullam beatae quasi
        voluptas nemo natus! Ducimus amet quis incidunt distinctio, aperiam
        necessitatibus quod eos.
      </h1>
      <button
        onClick={() => {
          fetchData();
        }}
      >
        Get Stated
      </button>
    </>
  );
};

const Pagination = ({ pageno, fetchData, setActivePage, ActivePage }) => {
  return (
    <div className="Secret_pagination_main">
      <div className="Secret_pagination">
        {pageno.map((item, index) => {
          return (
            <div
              key={item}
              className="pageDiv"
              style={{
                backgroundColor: ActivePage === item ? "DeepPink" : "#fff",
                textDecoration: ActivePage === item ? "underline" : "none",
                color: ActivePage === item ? "white" : "black",
                width: "5vmin",
                height: "5vmin",
                borderRadius: "2rem",
                
              }}
            >
              <p
                onClick={() => {
                  fetchData(item);
                  setActivePage(index + 1);
                }}
              >
                {index + 1}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
