import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="footer" >
      <div className="footer-content">
        <p> PROPERTIA LTD </p>
        <p> propertiaLTDBusiness@propertia.co </p>
        <p> +345 8976954</p>
        <div className="social-links">
          <p> Visit our socials: </p>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
        
      </div>
    </footer>
  );
};
export default Footer;