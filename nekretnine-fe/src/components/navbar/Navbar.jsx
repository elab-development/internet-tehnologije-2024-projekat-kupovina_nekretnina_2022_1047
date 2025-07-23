// src/components/navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('auth_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('auth_token');
      await axios.post(
        'http://localhost:8000/api/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      sessionStorage.clear();
      navigate('/');
    }
  };

  // first initial for avatar
  const initial = user?.name?.charAt(0).toUpperCase() || '';

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/home" className="nav-link">
          <img src={logo} alt="propertia-logo" className="logo" />
          <span className="brand-name">Propertia</span>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/our-agents" className="nav-link">Our Agents</Link>
        <Link to="/countries-we-are-in" className="nav-link">Our Locations</Link>
      </div>

      {user && (
        <div className="nav-user">
          <div className="avatar">{initial}</div>
          <span className="nav-username">{user.name}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
