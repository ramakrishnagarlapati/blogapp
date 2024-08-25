//import necessary react hooks and components for use
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import PostList from "../../components/PostList";
import { AiOutlineSearch } from "react-icons/ai";

import "./index.css";
import Footer from "../../components/Footer";
import NoBlogsView from "../../components/NoBlogsView";

//import apiStatusConstants object from constants folder
import { apiStatusConstants } from "../../constants";

const Home = () => {
  //state to store value searched by user
  const [searchValue, setSearchValue] = useState("");

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

  //Update search value on change
  const onInputChange = (e) => setSearchValue(e.target.value);

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  //On click, filter the blog posts with search value and update blogposts state
  const onClickSearchBtn = () => {
    getBlogPostsData();
  };

  //if search value doesnot match with any title in blog posts, render no blog match view
  const renderNoBlogsView = () => <NoBlogsView searchValue={searchValue} />;

  // Function to render the list of blog posts
  const renderBlogPosts = () => {
    const filteredBlogPosts = blogPosts.filter((eachBlog) =>
      //Before filter, Convert the search value and title of blog post to lowercase to compare
      eachBlog.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (filteredBlogPosts.length > 0) {
      return (
        <>
          <PostList blogPosts={filteredBlogPosts} />
          <Footer />
        </>
      );
    }

    return renderNoBlogsView();
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

      <main className="home-page-content">
        <h1 className="blog-posts-title">Blog Posts</h1>

        <form className="search-form" onSubmit={onFormSubmit}>
          <input
            name="search"
            type="text"
            placeholder="Search by blog title"
            className="search-input"
            value={searchValue}
            onChange={onInputChange}
          />
          <button
            type="button"
            className="search-btn"
            onClick={onClickSearchBtn}
          >
            <AiOutlineSearch size={24} color="#a6a6a6" />
          </button>
        </form>
        {rederViewBasedOnApiStatus()}
      </main>
    </div>
  );
};
export default Home;
