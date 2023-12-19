import React from "react";
import "./Loader.css";

const Loader = ({ children }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <div className="ele"> {children}</div>
    </div>
  );
};

export default Loader;
