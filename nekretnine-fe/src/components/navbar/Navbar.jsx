import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
      <Link to="/" className="nav-link">
        <img src={logo} alt="propertia-logo" className="logo" />
        <span className="brand-name">Propertia</span>
      </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/our-agents" className="nav-link">Our Agents</Link>
        <Link to="/countries-we-are-in" className="nav-link">Our Locations</Link>
      </div>
    </nav>
  );
};

export default Navbar;
