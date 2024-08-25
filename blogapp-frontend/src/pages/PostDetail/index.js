import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

import Loader from "../../components/Loader";
import Footer from "../../components/Footer";
import FailureView from "../../components/FailureView";
import { apiStatusConstants } from "../../constants";

import "./index.css";
import Header from "../../components/Header";

const PostDetail = () => {
  const history = useHistory();

  //Get postId from URL params
  const { postId } = useParams();

  //State to store post details
  const [postDetails, setPostDetails] = useState(null);

  // State to track the API call status
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  //Function to fetch post details from the API
  const getPostDetails = async () => {
    // Set status to inProgress before fetching data
    setApiStatus(apiStatusConstants.inProgress);

    // Fetch post details from the API
    const response = await fetch(
      `https://blogapp-4e6d.onrender.com/posts/${postId}`
    );

    if (response.ok) {
      // If the response is successful, Update apiStatus and post details states
      const data = await response.json();
      const { post } = data;
      setPostDetails(post);
      setApiStatus(apiStatusConstants.success);
    } else {
      // Update status to failure
      setApiStatus(apiStatusConstants.failure);
    }
  };

  // useEffect hook to call getPostDetails when the component mounts
  useEffect(() => {
    getPostDetails();
  }, [postId]);

  // Function to handle retrying the API request
  const handleRetry = () => {
    getPostDetails();
  };

  // Function to navigate to the edit page
  const onClickEditBtn = () => {
    history.push(`/posts/${postId}/edit`);
  };

  // Function to handle deleting a post
  const onClickDeleteBtn = async () => {
    try {
      const response = await fetch(
        `https://blogapp-4e6d.onrender.com/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        //Navigate to the home page after successful deletion
        history.replace("/");
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const renderBlogPost = () => {
    const { title, content, created_at: createdAt } = postDetails;
    const timestamp = new Date(createdAt);

    // Extract date, month, and year from the timestamp
    const date = timestamp.getDate();
    const month = timestamp.toLocaleString("default", { month: "short" });
    const year = timestamp.getFullYear();

    return (
      <>
        <div className="post-details-container">
          <h1 className="post-title">{title}</h1>
          <p className="post-content">{content}</p>
          <p className="post-timestamp">{`Written on ${month} ${date}, ${year}`}</p>
          <div className="btns-group">
            {/* Button to navigate to the edit page */}
            <button className="post-btn" onClick={onClickEditBtn}>
              <FiEdit size={16} color="#fff" /> Edit this post
            </button>
            {/* Button to delete a post*/}
            <button className="post-btn" onClick={onClickDeleteBtn}>
              <MdOutlineDelete size={18} color="#fff" /> Delete this post
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  };
  const renderFailureView = () => <FailureView onRetry={handleRetry} />;
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
      default:
        return null;
    }
  };
  return (
    <div className="post-details-page-container">
      <Header />
      <main className="post-details-main-container">
        {/*Link to navigate back to list of all posts*/}
        <Link className="all-posts-link" to="/">
          <IoArrowBack /> All Posts
        </Link>
        {rederViewBasedOnApiStatus()}
      </main>
    </div>
  );
};
export default PostDetail;
