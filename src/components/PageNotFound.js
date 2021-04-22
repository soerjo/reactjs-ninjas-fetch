import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="page">
      <h2>Sorry the page is not found!</h2>
      <p>
        Please come back to <Link to="/">Home Page</Link>
      </p>
    </div>
  );
}

export default PageNotFound;
