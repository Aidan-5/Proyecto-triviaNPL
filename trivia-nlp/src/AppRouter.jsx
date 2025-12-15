import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Results from "./pages/Results";
import PlayerSetup from "./components/PlayerSetup";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Selección de nombres según modo */}
        <Route path="/setup" element={<PlayerSetup />} />

        {/* Pantalla del juego */}
        <Route path="/game" element={<Game />} />

        {/* Resultados */}
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}
