import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Header = () => {
  const history = useHistory();
  //Function to handle the redirecting to new post form
  const onClickCreatePostBtn = () => {
    history.push("/posts/new");
  };

  //Function to handle logout functionality
  const onClickLogoutBtn = () => {
    //remove jwt_token from cookies and redirect the user to login page
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  return (
    <header className="header">
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          BLOG APP
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <p className="greet-message">Hello! Rahul</p>
          </li>
          <li className="nav-item">
            <button className="nav-btn" onClick={onClickCreatePostBtn}>
              Create post
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-btn" onClick={onClickLogoutBtn}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
