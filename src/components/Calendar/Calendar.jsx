import React, { useState, useEffect } from "react";
import "../../styles/Calendar.css";

const Calendar = ({ onSelectDate, onSelectTime, selectedTimeSlots = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDays, setCalendarDays] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "Aprel",
    "May",
    "June",
    "July",
    "Augost",
    "September",
    "Octaber",
    "November",
    "December",
  ];

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate]);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    // Adjust for Monday as the first day of the week
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: "", isCurrentMonth: false });
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, isCurrentMonth: true });
    }

    setCalendarDays(days);
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateClick = (day) => {
    if (!day) return;

    const newSelectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newSelectedDate);

    // Format date as YYYY-MM-DD for parent component
    const formattedDate = newSelectedDate.toISOString().split("T")[0];
    onSelectDate(formattedDate);
  };

  const formatDay = (date) => {
    if (!date) return "";

    const day = date.getDate();
    const month = months[date.getMonth()];

    const weekday = date.getDay();
    const weekdayName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
      weekday
    ];

    return `${weekdayName}, ${month} ${day}`;
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <div className="calendar-year-month">
          <div className="calendar-year">2024</div>
          <div className="calendar-date">
            {selectedDate ? formatDay(selectedDate) : "Seg, julho 15"}
          </div>
        </div>
      </div>

      <div className="time-slots-container">
        {selectedTimeSlots.length > 0 ? (
          selectedTimeSlots.map((time, index) => (
            <div key={index} className="time-slot">
              {time}
            </div>
          ))
        ) : (
          <>
            <div className="time-slot">00:00</div>
            <div className="time-slot">00:00</div>
          </>
        )}
      </div>

      <div className="calendar-navigation">
        <button className="nav-button" onClick={handlePrevMonth}>
          &lt;
        </button>
        <div className="current-month">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button className="nav-button" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {weekdays.map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {calendarDays.map((dayObj, index) => (
            <div
              key={index}
              className={`calendar-day ${
                !dayObj.isCurrentMonth ? "empty" : ""
              } ${
                selectedDate &&
                dayObj.day === selectedDate.getDate() &&
                currentDate.getMonth() === selectedDate.getMonth() &&
                currentDate.getFullYear() === selectedDate.getFullYear()
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                dayObj.isCurrentMonth && handleDateClick(dayObj.day)
              }
            >
              {dayObj.day}
            </div>
          ))}
        </div>
      </div>

      <div className="time-slots-grid">
        {timeSlots.map((time, index) => (
          <div
            key={index}
            className={`time-slot-item ${
              selectedTimeSlots.includes(time) ? "selected" : ""
            }`}
            onClick={() => onSelectTime(time)}
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
