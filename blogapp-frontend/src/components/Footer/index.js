import { LuInstagram } from "react-icons/lu";
import { FiYoutube } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";

import "./index.css";
const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer-title">BLOG APP</h3>
      <nav className="footer-nav">
        <a href="#" className="footer-nav-link">
          <LuInstagram className="footer-nav-link-icon" />
        </a>
        <a href="#" className="footer-nav-link">
          <FiYoutube className="footer-nav-link-icon" />
        </a>
        <a href="#" className="footer-nav-link">
          <FiTwitter className="footer-nav-link-icon" />
        </a>
      </nav>
      <p className="made-by">
        Made by <span className="made-by-sub-part">Ramakrishna Garlapati</span>
      </p>
    </footer>
  );
};
export default Footer;
