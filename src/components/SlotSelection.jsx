import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Calendar from "./Calendar/Calendar";
import "../styles/SlotSelection.css";

const SlotSelection = ({ user }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const navigate = useNavigate();

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    if (selectedTimeSlots.includes(time)) {
      setSelectedTimeSlots(selectedTimeSlots.filter((t) => t !== time));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, time]);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTimeSlots.length > 0) {
      // Store selected date and time slots in localStorage
      localStorage.setItem("selectedDate", selectedDate);
      localStorage.setItem(
        "selectedTimeSlots",
        JSON.stringify(selectedTimeSlots)
      );
      navigate("/room-selection");
    } else {
      alert("Please select both date and time");
    }
  };

  return (
    <div className="slot-selection-page">
      <Header user={user} />

      <div className="slot-selection-container">
        <h2 className="section-title">Slot Selection</h2>

        <div className="date-picker-container">
          <input
            type="date"
            className="date-input"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <button
          className="btn-confirm-booking"
          onClick={handleConfirmBooking}
          disabled={!selectedDate || selectedTimeSlots.length === 0}
        >
          Confirm Booking
        </button>

        <div className="calendar-container">
          <div className="calendar-section">
            <Calendar
              onSelectDate={handleDateSelect}
              onSelectTime={handleTimeSelect}
              selectedTimeSlots={selectedTimeSlots}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotSelection;
