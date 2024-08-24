import PostItem from "../../components/PostItem";
import "./index.css";
const PostList = ({ blogPosts }) => {
  return (
    <ul className="post-list">
      {blogPosts.map((eachPost) => (
        <PostItem key={eachPost.id} blogPost={eachPost} />
      ))}
    </ul>
  );
};
export default PostList;
