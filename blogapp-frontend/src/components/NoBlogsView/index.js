import React from "react";

import "./index.css";

const NoBlogsView = ({ searchValue }) => {
  return (
    <div className="no-blogs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="no-blogs"
        className="no-blogs-img"
      />
      <h3 className="no-blogs-title">No Blogs Found</h3>
      <p className="no-blogs-desc">
        We couldnot find any blogs related to "{searchValue}"
      </p>
    </div>
  );
};

export default NoBlogsView;
