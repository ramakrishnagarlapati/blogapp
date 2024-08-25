import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useHistory, Link } from "react-router-dom";

import PostForm from "../../components/PostForm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./index.css";
const NewPost = () => {
  const history = useHistory();
  const handleSave = () => {
    history.push("/");
  };
  return (
    <div className="new-post-page-container">
      <Header />
      <main className="new-post-container">
        <Link to="/" className="back-link">
          <IoArrowBack /> Back
        </Link>
        <h2 className="new-post-heading">Create new Post</h2>
        <PostForm onSave={handleSave} />
      </main>
      <Footer />
    </div>
  );
};

export default NewPost;
