import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import "../styles/SuccessPage.css";

const SuccessPage = ({ user }) => {
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    timeSlots: [],
    room: "",
    lessonType: "",
    owner: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve booking details from localStorage
    const date = localStorage.getItem("selectedDate");
    const timeSlots = JSON.parse(
      localStorage.getItem("selectedTimeSlots") || "[]"
    );
    const room = localStorage.getItem("selectedRoom");
    const lessonType = localStorage.getItem("lessonType");
    const owner = localStorage.getItem("owner");

    if (!date || timeSlots.length === 0 || !room || !lessonType || !owner) {
      // If any required details are missing, redirect back
      navigate("/description");
      return;
    }

    setBookingDetails({ date, timeSlots, room, lessonType, owner });

    // Redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="success-page">
      <Header user={user} />

      <div className="success-container">
        <div className="booking-details">
          <div className="booking-info">
            {formatDate(bookingDetails.date)}{" "}
            {bookingDetails.timeSlots.join(", ")} - {bookingDetails.room}{" "}
            {bookingDetails.lessonType}
          </div>
        </div>

        <h1 className="success-title">Process successful</h1>

        <div className="success-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="#E6F7EC" />
            <path
              d="M8 12L11 15L16 9"
              stroke="#4CAF50"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
