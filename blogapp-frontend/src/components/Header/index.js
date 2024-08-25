import { useHistory } from "react-router-dom";

import "./index.css";

const Header = () => {
  const history = useHistory();
  const onClickCreatePostBtn = () => {
    history.push("/posts/new");
  };
  return (
    <header className="header">
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          BLOG APP
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <p className="greet-message">Hello! User</p>
          </li>
          <li className="nav-item">
            <button className="nav-btn" onClick={onClickCreatePostBtn}>
              Create New post
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
