import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SlotSelection from "./components/SlotSelection";
import RoomSelection from "./components/RoomSelection";
import Description from "./components/Description";
import SuccessPage from "./components/SuccesPage";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    // Clear booking data
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedTimeSlots");
    localStorage.removeItem("selectedRoom");
    localStorage.removeItem("lessonType");
    localStorage.removeItem("owner");
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/slot-selection"
          element={
            isAuthenticated ? (
              <SlotSelection user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/room-selection"
          element={
            isAuthenticated ? (
              <RoomSelection user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/description"
          element={
            isAuthenticated ? <Description user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/success"
          element={
            isAuthenticated ? <SuccessPage user={user} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
