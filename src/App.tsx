import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./routes/LandingPage";
import CreatePage from "./routes/CreatePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
