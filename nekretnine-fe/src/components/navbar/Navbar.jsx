import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link nav-brand">Propertia</Link>
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