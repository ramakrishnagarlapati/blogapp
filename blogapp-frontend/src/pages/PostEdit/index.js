import { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";

import { useParams, useHistory, Link } from "react-router-dom";
import PostForm from "../../components/PostForm";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

import "./index.css";
import Header from "../../components/Header";

const PostEdit = () => {
  const { postId } = useParams();
  const history = useHistory();
  const [post, setPost] = useState(null);
  const fetchPost = async () => {
    const response = await fetch(
      `https://blogapp-4e6d.onrender.com/posts/${postId}`
    );
    const data = await response.json();
    if (response.ok) {
      const { post } = data;
      setPost(post);
    } else {
      console.error(data.message);
    }
  };
  useEffect(() => {
    fetchPost();
  });
  const handleSave = () => {
    history.push(`/posts/${postId}`);
  };
  return (
    <div className="edit-page-container">
      <Header />
      <main className="edit-container">
        <Link to={`/posts/${postId}`} className="back-link">
          <IoArrowBack /> Back
        </Link>
        <h2 className="edit-heading">Edit Post</h2>
        {post ? <PostForm post={post} onSave={handleSave} /> : <Loader />}
      </main>
      {post && <Footer />}
    </div>
  );
};
export default PostEdit;
