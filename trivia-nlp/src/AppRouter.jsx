import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Results from "./pages/Results";
import PlayerSetup from "./components/PlayerSetup";
import ConfigPanel from "./components/ConfigPanel";
import PuntajePanel from "./components/PuntajePanel";


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

        {/* Panel de Configuración */}
        <Route path="/config" element={<ConfigPanel />} />

        {/* Panel de Puntajes */}
        <Route path="/scores" element={<PuntajePanel />} />
      </Routes>
    </BrowserRouter>
  );
}
