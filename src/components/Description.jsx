import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import "../styles/Description.css";

const Description = ({ user }) => {
  const [lessonType, setLessonType] = useState("");
  const [owner, setOwner] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    timeSlots: [],
    room: "",
  });
  const navigate = useNavigate();

  const lessonTypes = [
    "Frontend",
    "Backend",
    "UI/UX",
    "DevOps",
    "Data Science",
  ];
  const owners = ["John Doe", "Jane Smith", "Alex Johnson", "Maria Garcia"];

  useEffect(() => {
    // Retrieve booking details from localStorage
    const date = localStorage.getItem("selectedDate");
    const timeSlots = JSON.parse(
      localStorage.getItem("selectedTimeSlots") || "[]"
    );
    const room = localStorage.getItem("selectedRoom");

    if (!date || timeSlots.length === 0 || !room) {
      // If any required details are missing, redirect back
      navigate("/room-selection");
      return;
    }

    setBookingDetails({ date, timeSlots, room });
  }, [navigate]);

  const handleConfirm = () => {
    if (lessonType && owner) {
      localStorage.setItem("lessonType", lessonType);
      localStorage.setItem("owner", owner);
      navigate("/success");
    } else {
      alert("Please select both lesson type and owner");
    }
  };

  return (
    <div className="description-page">
      <Header user={user} />

      <div className="description-container">
        <h2 className="section-title">Description</h2>

        <div className="form-group">
          <select
            className="form-select"
            value={lessonType}
            onChange={(e) => setLessonType(e.target.value)}
          >
            <option value="" disabled>
              Lesson
            </option>
            {lessonTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <select
            className="form-select"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          >
            <option value="" disabled>
              Owner
            </option>
            {owners.map((person, index) => (
              <option key={index} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn-confirm-description"
          onClick={handleConfirm}
          disabled={!lessonType || !owner}
        >
          Confirm Room
        </button>
      </div>
    </div>
  );
};

export default Description;
