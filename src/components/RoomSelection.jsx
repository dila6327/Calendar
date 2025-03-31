import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import "../styles/RoomSelection.css";

const RoomSelection = ({ user }) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    timeSlots: [],
  });
  const navigate = useNavigate();

  const rooms = [
    { id: 1, name: "Room Atom", available: true },
    { id: 2, name: "Room Kelvin", available: true },
    { id: 3, name: "Room Uno", available: true },
    { id: 4, name: "Room Candela", available: false },
    { id: 5, name: "Room Byte", available: true },
    { id: 6, name: "Room Pixel", available: true },
    { id: 7, name: "Room Curie", available: false },
    { id: 8, name: "Room Elektron", available: true },
  ];

  useEffect(() => {
    // Retrieve booking details from localStorage
    const date = localStorage.getItem("selectedDate");
    const timeSlots = JSON.parse(
      localStorage.getItem("selectedTimeSlots") || "[]"
    );

    if (!date || timeSlots.length === 0) {
      // If no date or time slots are selected, redirect back to slot selection
      navigate("/slot-selection");
      return;
    }

    setBookingDetails({ date, timeSlots });
  }, [navigate]);

  const handleRoomSelect = (room) => {
    if (room.available) {
      setSelectedRoom(room.name);
    }
  };

  const handleConfirmRoom = () => {
    if (selectedRoom) {
      localStorage.setItem("selectedRoom", selectedRoom);
      navigate("/description");
    } else {
      alert("Please select a room");
    }
  };

  return (
    <div className="room-selection-page">
      <Header user={user} />

      <div className="room-selection-container">
        <h2 className="section-title">Room</h2>

        <div className="room-dropdown-container">
          <select
            className="room-dropdown"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="" disabled>
              Rooms
            </option>
            {rooms.map((room) => (
              <option
                key={room.id}
                value={room.name}
                disabled={!room.available}
              >
                {room.name} {!room.available && "* Dolu"}
              </option>
            ))}
          </select>
        </div>

        <div className="room-list">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`room-item ${!room.available ? "unavailable" : ""} ${
                selectedRoom === room.name ? "selected" : ""
              }`}
              onClick={() => handleRoomSelect(room)}
            >
              {room.name}
              {!room.available && (
                <span className="unavailable-tag">* Dolu</span>
              )}
            </div>
          ))}
        </div>

        <button
          className="btn-confirm-room"
          onClick={handleConfirmRoom}
          disabled={!selectedRoom}
        >
          Confirm Room
        </button>
      </div>
    </div>
  );
};

export default RoomSelection;
