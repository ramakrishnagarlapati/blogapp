import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { MdArrowOutward } from "react-icons/md";

import "./index.css";
const PostItem = ({ blogPost }) => {
  const { id, title, content } = blogPost;
  return (
    <li className="post-item">
      <h2 className="post-item-title">{title}</h2>
      <p className="post-item-content">
        {content.split(" ").slice(0, 40).join(" ") + "..."}
      </p>
      <Link to={`/posts/${id}`} className="read-more-link">
        Read More <MdArrowOutward size={15} />
      </Link>
    </li>
  );
};
export default PostItem;
