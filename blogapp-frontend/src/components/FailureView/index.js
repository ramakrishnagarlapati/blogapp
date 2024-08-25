import React from "react";

import "./index.css";

const FailureView = ({ onRetry }) => {
  // Function to handle the retry button click
  const onClickRetryButton = () => {
    onRetry();
  };
  return (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h3 className="failure-view-title">Oops! Something Went Wrong</h3>
      <p className="failure-view-desc">
        We are having some trouble to complete your request. Please try again
        later.
      </p>
      {/* Button to retry the action */}
      <button
        className="retry-button"
        type="button"
        onClick={onClickRetryButton}
      >
        Retry
      </button>
    </div>
  );
};

export default FailureView;
