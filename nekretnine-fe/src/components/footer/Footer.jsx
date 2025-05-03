import React from 'react';
import './Footer.css';
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>© 2025 PROPERTIA</p>
      </div>

      <Link style={{ cursor: 'pointer' }} to="/" className="nav-link-1">
        <div className="footer-center" style={{ cursor: 'pointer' }}>
          <div className="footer-logo" style={{ cursor: 'pointer' }}>
              <img src={logo} alt="propertia-logo" className="logo" style={{ cursor: 'pointer' }}/>
              <p className="logo-text" style={{ cursor: 'pointer' }}>PROPERTIA</p>
          </div>
        </div>
      </Link>

      <div className="footer-right">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a style={{ marginRight: "60px" }} href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterestP /></a>
      </div>
    </footer>
  );
};

export default Footer;
