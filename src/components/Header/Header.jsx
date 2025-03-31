import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";
const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/dashboard" className="header-logo">
          Turing Calendar
        </Link>

        {user && (
          <div className="header-user">
            <span className="user-email">{user.email}</span>
            <button className="btn-logout" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
