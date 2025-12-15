import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BrainLogo from "../assets/Logo-BRAIN.svg";

export default function PlayerSetup() {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = location.state?.mode || "single"; // 'single' o 'multi'

  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleStart = () => {
    if (!player1Name.trim()) return;

    const players = {
      player1: player1Name.trim(),
      player2: mode === "multi" ? (player2Name.trim() || "Jugador 2") : null,
    };

    // Aquí navegas a la pantalla del juego pasando los nombres
    navigate("/game", { state: { mode, players } });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#90063a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        gap: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* LOGO + TÍTULO WOND */}
      <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
        <img src={BrainLogo} alt="logo brain" width="140" />
        <h1
          style={{
            fontFamily: "'Keania One', sans-serif",
            fontSize: "70px",
            color: "#FFFFFF",
            margin: 0,
            lineHeight: "70px",
          }}
        >
          WOND
        </h1>
      </div>

      {/* TÍTULO DE CONFIGURACIÓN */}
      <h2
        style={{
          color: "#daa520",
          fontSize: "2.2rem",
          fontFamily: "Arial, sans-serif",
          margin: 0,
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Configura tu partida
      </h2>

      {/* CONTENEDOR DE INPUTS (mismo estilo que las cards del Home) */}
      <div
        style={{
          display: "flex",
          flexDirection: mode === "multi" ? "row" : "column",
          gap: "40px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Jugador 1 */}
        <div style={cardStyle}>
          <h3 style={{ color: "#90063a", margin: "0 0 20px 0", fontSize: "1.5rem" }}>
            Jugador 1
          </h3>
          <input
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            placeholder="Ingresa tu nombre"
            style={inputStyle}
            autoFocus
          />
        </div>

        {/* Jugador 2 - solo en modo multi */}
        {mode === "multi" && (
          <div style={cardStyle}>
            <h3 style={{ color: "#90063a", margin: "0 0 20px 0", fontSize: "1.5rem" }}>
              Jugador 2
            </h3>
            <input
              type="text"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              placeholder="Ingresa tu nombre"
              style={inputStyle}
            />
          </div>
        )}
      </div>

      {/* BOTÓN COMENZAR */}
      <button onClick={handleStart} style={startButtonStyle}>
        ¡Comenzar Partida!
      </button>
    </div>
  );
}

/* === ESTILOS REUTILIZADOS Y ADAPTADOS === */
const cardStyle = {
  width: "320px",
  height: "180px",
  backgroundColor: "#daa520",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.2s",
};

const inputStyle = {
  width: "90%",
  padding: "14px 18px",
  fontSize: "1.1rem",
  borderRadius: "12px",
  border: "none",
  textAlign: "center",
  backgroundColor: "white",
  boxShadow: "inset 0 3px 8px rgba(0,0,0,0.15)",
  outline: "none",
  fontFamily: "inherit",
  color: "#000000",
};

const startButtonStyle = {
  backgroundColor: "#daa520",
  color: "#90063a",
  fontSize: "1.5rem",
  fontWeight: "bold",
  fontFamily: "Arial, sans-serif",
  padding: "16px 50px",
  borderRadius: "15px",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  transition: "all 0.3s ease",
  marginTop: "20px",
};