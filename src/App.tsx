import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./routes/LandingPage";
import CreatePage from "./routes/CreatePage";
import UpdatePage from "./routes/UpdatePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
