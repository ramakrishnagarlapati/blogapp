import { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";

import { useParams, useHistory, Link } from "react-router-dom";
import PostForm from "../../components/PostForm";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

import "./index.css";
import Header from "../../components/Header";

const PostEdit = () => {
  //Destructure the postId from URL params
  const { postId } = useParams();

  const history = useHistory();

  //State to store the post details
  const [post, setPost] = useState(null);

  //Function to fetch post details
  const fetchPost = async () => {
    const response = await fetch(
      `https://blogapp-4e6d.onrender.com/posts/${postId}`
    );
    const data = await response.json();
    //If response is successful, Update post state
    if (response.ok) {
      const { post } = data;
      setPost(post);
    } else {
      console.error(data.message);
    }
  };

  //Hook to call fetchPost when the component mounts
  useEffect(() => {
    fetchPost();
  });

  //Function to handle redirceting to post details page after successful updation
  const handleSave = () => {
    history.push(`/posts/${postId}`);
  };

  return (
    <div className="edit-page-container">
      <Header />
      <main className="edit-container">
        {/*Link to navigate back to post details */}
        <Link to={`/posts/${postId}`} className="back-link">
          <IoArrowBack /> Back
        </Link>
        <h2 className="edit-heading">Edit Post</h2>

        {/*Display Loader until API request is completed*/}
        {post ? <PostForm post={post} onSave={handleSave} /> : <Loader />}
      </main>
      {post && <Footer />}
    </div>
  );
};
export default PostEdit;
