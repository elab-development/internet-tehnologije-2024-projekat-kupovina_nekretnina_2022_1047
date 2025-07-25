// src/components/navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('auth_user');
    const storedRole = sessionStorage.getItem('auth_role');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedRole) setRole(storedRole);
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

  const initial = user?.name?.charAt(0).toUpperCase() || '';
  const home = role === 'admin' ? '/admin-dashboard' : '/home';

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to={home} className="nav-link">
          <img src={logo} alt="propertia-logo" className="logo" />
          <span className="brand-name">Propertia</span>
        </Link>
      </div>

      <div className="nav-links">
        {role === 'admin' ? (
          <>
            <Link to="/admin-dashboard"            className="nav-link">Admin Dashboard</Link>
            <Link to="/admin-properties" className="nav-link">Admin Properties</Link>
          </>
        ) : (
          <>
            <Link to="/home"               className="nav-link">Home</Link>
            <Link to="/about"              className="nav-link">About Us</Link>
            <Link to="/our-agents"         className="nav-link">Our Agents</Link>
            <Link to="/countries-we-are-in" className="nav-link">Our Locations</Link>
            <Link to="/properties"         className="nav-link">Properties</Link>
            <Link to="/my-purchases"       className="nav-link">My Purchases</Link>
          </>
        )}
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
