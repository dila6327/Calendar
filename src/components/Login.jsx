import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // In a real app, you would validate credentials against a backend
    // For demo purposes, we'll accept any valid-looking email
    if (email.includes("@") && password.length >= 6) {
      const userData = {
        email,
        name: email.split("@")[0], // Extract name from email for demo
        role: "student", // Default role
      };
      onLogin(userData);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Turing Calendar</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
        <div className="login-footer">
          <Link to="/signup" className="link">
            Sign up
          </Link>
          <Link to="/forgot-password" className="link">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
