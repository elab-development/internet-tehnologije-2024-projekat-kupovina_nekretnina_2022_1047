import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      sessionStorage.setItem("auth_token", token);
      sessionStorage.setItem("auth_user", JSON.stringify(user));
      sessionStorage.setItem("auth_role", user.role || "buyer");

      user.role === 'buyer' ? navigate("/home") : navigate("/admin-dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="logo" className="auth-logo" />
        <h1>Login to Propertia</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="auth-error">{error}</p>}
        </form>
        <p style={{ marginTop: "15px", color: "#ccc" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#fff", textDecoration: "underline" }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
