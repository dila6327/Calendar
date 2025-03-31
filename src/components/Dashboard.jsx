import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import "../styles/Dahboard.css";

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const rooms = [
    "JBE 1610",
    "JBE 0102",
    "JBE 1210",
    "PM",
    "FE 2610",
    "MS 1103",
    "UX-UI 0903",
    "UX-UI 1101",
  ];

  const roles = ["Mentor", "Teacher"];

  const handleBookSlot = () => {
    navigate("/slot-selection");
  };

  return (
    <div className="dashboard-page">
      <Header user={user} onLogout={onLogout} />

      <div className="dashboard-container">
        <div className="dashboard-card">
          <h1 className="dashboard-title">Turing Calendar</h1>
          <button className="btn-book-slot" onClick={handleBookSlot}>
            Book a Slot
          </button>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Available Rooms</h2>
          <div className="room-grid">
            {rooms.map((room, index) => (
              <div key={index} className="room-card">
                {room}
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Roles</h2>
          <div className="role-grid">
            {roles.map((role, index) => (
              <div key={index} className="role-card">
                {role}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
