import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// IMPORTACIONES BÁSICAS
import Home from "./pages/Home";
import SetupPlayers from "./pages/SetupPlayers";
import Game from "./pages/Game";
import Results from "./pages/Results";
import LeaderboardPage from "./pages/LeaderboardPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<SetupPlayers />} />
        <Route path="/game" element={<Game />} />
        {/* Ruta de emergencia por si algo falla, vuelve al inicio */}
        <Route path="/results" element={<Results />} />
        <Route path="/leaderboard-page" element={<LeaderboardPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}