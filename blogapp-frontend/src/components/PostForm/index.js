import { useState } from "react";

import "./index.css";

//PostForm allows creating or editing a blog post
const PostForm = ({ post = {}, onSave }) => {
  //set variables for title and content of the post, intialised with empty string or value from post
  const [title, setTitle] = useState(post.title || "");
  const [content, setContent] = useState(post.content || "");

  // State to track validation errors
  const [errors, setErrors] = useState({});

  //Validation function to ensure title and content are not empty
  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "*Title is required";
    if (!content) newErrors.content = "*Content is required";
    setErrors(newErrors);
    //return true if there are any validation errors
    return Object.keys(errors).length === 0;
  };

  //Handle form submission to either create or update a post
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validate from inputs
    if (!validate()) return;

    //data to be sent to the server
    const postData = { title, content };

    try {
      //If post ID exists, Update the post. Else, create a post
      if (post.id) {
        //Updating the post with new values
        const response = await fetch(
          `https://blogapp-4e6d.onrender.com/posts/${post.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(postData),
          }
        );

        if (response.ok) {
          // Call onSave callback after successful update
          onSave();
        }
      } else {
        //creating new post
        const response = await fetch(
          "https://blogapp-4e6d.onrender.com/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        );
        if (response.ok) {
          onSave();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          className={`form-control ${errors.title && "has-error"}`}
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="content">
          Content
        </label>
        <textarea
          className={`form-control ${errors.content && "has-error"}`}
          id="content"
          cols={50}
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {errors.content && <p className="error-message">{errors.content}</p>}
      </div>

      {/* Submit button changes text based on whether the post is being created or updated */}
      <button type="submit" className="form-button">
        {post.id ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};
export default PostForm;
