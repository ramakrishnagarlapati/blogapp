import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

import Loader from "../../components/Loader";
import Footer from "../../components/Footer";
import { apiStatusConstants } from "../../constants";

import "./index.css";
import Header from "../../components/Header";

const PostDetail = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const getPostDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const response = await fetch(
      `https://blogapp-4e6d.onrender.com/posts/${postId}`
    );
    if (response.ok) {
      const data = await response.json();
      const { post } = data;
      setPostDetails(post);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };
  useEffect(() => {
    getPostDetails();
  }, []);
  const renderBlogPost = () => {
    const { id, title, content, created_at: createdAt } = postDetails;
    const timestamp = new Date(createdAt);

    const date = timestamp.getDate();
    const month = timestamp.toLocaleString("default", { month: "short" });

    const year = timestamp.getFullYear();
    return (
      <>
        <div className="post-details-container">
          <h1 className="post-title">{title}</h1>
          <p className="post-content">{content}</p>
          <p className="post-timestamp">{`Written on ${month} ${date}, ${year}`}</p>
          <button className="edit-post-btn">
            <FiEdit size={16} color="#fff" /> Edit this post
          </button>
        </div>
        <Footer />
      </>
    );
  };
  const renderFailureView = () => {};
  // Function to render the appropriate view based on the API status
  const rederViewBasedOnApiStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        // Render a loader while the API call is in progress
        return <Loader />;
      case apiStatusConstants.success:
        // Render the blog posts if the API call is successful
        return renderBlogPost();
      case apiStatusConstants.failure:
        // Render the failure view if the API call fails
        return renderFailureView();
    }
  };
  return (
    <div className="post-details-page-container">
      <Header />
      <main className="post-details-main-container">
        {rederViewBasedOnApiStatus()}
      </main>
    </div>
  );
};
export default PostDetail;
