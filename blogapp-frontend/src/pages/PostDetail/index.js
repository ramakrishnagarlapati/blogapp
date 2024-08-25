import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

import Loader from "../../components/Loader";
import Footer from "../../components/Footer";
import CommentItem from "../../components/CommentItem";
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

  //State to store the value of new comment
  const [newComment, setNewComment] = useState("");

  //State to store comments belongs to the post
  const [comments, setComments] = useState([]);

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

  const fetchComments = async () => {
    const response = await fetch(
      `https://blogapp-4e6d.onrender.com/posts/${postId}/comments`
    );
    const data = await response.json();
    if (response.ok) {
      setComments(data.comments);
    }
  };
  // useEffect hook to call getPostDetails when the component mounts
  useEffect(() => {
    getPostDetails();
    fetchComments();
  }, []);

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

  //Function to render list of comments
  const renderCommentsList = () => {
    return (
      <ul className="comments-list">
        {comments.map((eachComment) => (
          <CommentItem key={eachComment.id} commentDetails={eachComment} />
        ))}
      </ul>
    );
  };

  //Function to handle send API request to add a new comment
  const handleCommentForm = async (e) => {
    e.preventDefault();
    if (!newComment) {
      alert("Comment Cannot be empty");
      return;
    }

    try {
      const commentDetails = {
        postId,
        content: newComment,
      };
      const response = await fetch(
        `https://blogapp-4e6d.onrender.com/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentDetails),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to post comment");
      }
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error(err);
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
        <div className="comments-container">
          <form className="comment-form" onSubmit={handleCommentForm}>
            <textarea
              className="comment-form-control"
              value={newComment}
              placeholder="Type your comment here"
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              required
            ></textarea>
            <button className="add-comment-btn" type="submit">
              Add Comment
            </button>
          </form>
          <h2 className="comments-heading">Comments</h2>
          {renderCommentsList()}
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
