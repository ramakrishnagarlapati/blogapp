//import necessary react hooks and components for use
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import PostList from "../../components/PostList";

import "./index.css";

//Constants to represent the status of the API call
const apiStatusConstants = {
  initial: "INITIAL", // Initial state, before any API call
  success: "SUCCESS", // State when API call is successful
  failure: "FAILURE", // State when API call fails
  inProgress: "IN_PROGRESS", // State when API call is in progress
};
const Home = () => {
  // State to store the fetched blog posts data
  const [blogPosts, setBlogPosts] = useState([]);

  // State to track the status of the API call
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  // Function to fetch blog posts data from the API
  const getBlogPostsData = async () => {
    // Set the API status to in progress before making the API call
    setApiStatus(apiStatusConstants.inProgress);

    // Fetch data from the API
    const response = await fetch(`https://blogapp-4e6d.onrender.com/posts`);
    if (response.ok) {
      // If the response is successful, parse the data and update the blogPosts state
      const data = await response.json();
      const { posts } = data;
      setBlogPosts(posts);

      // Set the API status to success after successfully fetching the data
      setApiStatus(apiStatusConstants.success);
    } else {
      // Set the API status to failure if the API call fails
      setApiStatus(apiStatusConstants.failure);
    }
  };

  // useEffect to trigger the getBlogPostsData function when the component mounts
  useEffect(() => {
    getBlogPostsData();
  }, []);

  // Function to render the list of blog posts
  const renderBlogPosts = () => {
    return <PostList blogPosts={blogPosts} />;
  };

  // Function to render the failure view
  const renderFailureView = () => {};

  // Function to render the appropriate view based on the API status
  const rederViewBasedOnApiStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        // Render a loader while the API call is in progress
        return <Loader />;
      case apiStatusConstants.success:
        // Render the blog posts if the API call is successful
        return renderBlogPosts();
      case apiStatusConstants.failure:
        // Render the failure view if the API call fails
        return renderFailureView();
    }
  };
  return (
    <div className="container">
      <Header />
      <main className="home-page-content">{rederViewBasedOnApiStatus()}</main>
    </div>
  );
};
export default Home;
