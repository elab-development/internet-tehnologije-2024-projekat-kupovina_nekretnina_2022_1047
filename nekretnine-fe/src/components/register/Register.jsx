import React, { useState } from "react";
import "./Register.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
      });

      console.log(response.data);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="logo" className="auth-logo" />
        <h1>Create an Account</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Register</button>
          {error && <p className="auth-error">{error}</p>}
        </form>
        <p style={{ marginTop: "15px", color: "#ccc" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#fff", textDecoration: "underline" }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
