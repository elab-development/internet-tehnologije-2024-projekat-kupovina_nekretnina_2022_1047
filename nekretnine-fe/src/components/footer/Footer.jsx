import React from 'react';
import './Footer.css';
import logo from "../../assets/logo.png";
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>© 2025 PROPERTIA</p>
      </div>

      <div className="footer-center">
        <div className="footer-logo">
          <img src={logo} alt="propertia-logo" className="logo" />
          <p className="logo-text">PROPERTIA</p>
        </div>
      </div>

      <div className="footer-right">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a style={{ marginRight: "60px" }} href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterestP /></a>
      </div>
    </footer>
  );
};

export default Footer;
