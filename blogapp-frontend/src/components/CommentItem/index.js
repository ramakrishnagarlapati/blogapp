import React from "react";

import "./index.css";
const index = ({ commentDetails }) => {
  const { content, created_at: createdAt } = commentDetails;
  const timestamp = new Date(createdAt);

  // Extract date, month, and year from the timestamp
  const date = timestamp.getDate();
  const month = timestamp.toLocaleString("default", { month: "short" });
  const year = timestamp.getFullYear();
  return (
    <li className="comment-item">
      <p className="comment-content">{content}</p>
      <p className="comment-timestamp">
        -{`Commented on ${month} ${date}, ${year}`}
      </p>
    </li>
  );
};

export default index;
