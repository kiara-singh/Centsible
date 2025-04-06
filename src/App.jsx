import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Filter from "./pages/filter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import SpeechToText from "./pages/voiceCommand";

function App() {
  const [user,setUser]=useState(null);



  return (

    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Use ProtectedRoute for protected pages */}
        <Route path="/home" element={<ProtectedRoute element={Home} />} />
        <Route path="/filter/:category" element={<ProtectedRoute element={Filter} />} />
        <Route path="/voice" element={<SpeechToText />} />
      </Routes>
    </Router>

  );
}

export default App;
