import { LuInstagram } from "react-icons/lu";
import { FiYoutube } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";

import "./index.css";
const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer-title">BLOG APP</h3>
      <nav className="footer-nav">
        <button className="footer-nav-button">
          <LuInstagram className="footer-nav-icon" />
        </button>
        <button className="footer-nav-button">
          <FiYoutube className="footer-nav-icon" />
        </button>
        <button className="footer-nav-button">
          <FiTwitter className="footer-nav-icon" />
        </button>
      </nav>
      <p className="made-by">
        Made by <span className="made-by-sub-part">Ramakrishna Garlapati</span>
      </p>
    </footer>
  );
};
export default Footer;
