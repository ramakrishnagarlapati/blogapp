import "./index.css";
const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          BLOG APP
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button class="nav-btn">Login</button>
          </li>
          <li className="nav-item">
            <button class="nav-btn">Register</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
