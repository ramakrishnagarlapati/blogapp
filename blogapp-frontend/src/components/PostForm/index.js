import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";
const PostForm = ({ post = {}, onSave }) => {
  const [title, setTitle] = useState(post.title || "");
  const [content, setContent] = useState(post.content || "");
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "*Title is required";
    if (!content) newErrors.content = "*Content is required";
    setErrors(newErrors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const postData = { title, content };
    try {
      if (post.id) {
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
          onSave();
        }
      } else {
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
      <button type="submit" className="form-button">
        {post.id ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};
export default PostForm;
