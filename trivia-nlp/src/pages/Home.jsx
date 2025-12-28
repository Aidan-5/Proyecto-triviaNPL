import React from "react";
import { useNavigate } from "react-router-dom";
// Si no tienes el logo, puedes usar el emoji de cerebro como placeholder
// import BrainLogo from "../assets/Logo-BRAIN.svg";

export default function Home() {
  const navigate = useNavigate();

  const handleSelectMode = (mode) => {
    // Enviamos el modo a SetupPlayers para que pida 1 o 2 nombres
    navigate("/setup", { state: { mode } });
  };

  return (
    <div style={containerStyle}>
      {/* SECCIÓN DEL LOGO Y TÍTULO */}
      <div style={headerStyle}>
        <div style={logoWrapper}>
          <span style={{ fontSize: "100px" }}>🧠</span>
        </div>
        <h1 style={mainTitleStyle}>WOND</h1>
      </div>

      {/* INDICADOR CENTRAL */}
      <div style={indicatorWrapper}>
        <div style={selectionIndicator}>SELECCIONA TU DESAFÍO</div>
      </div>

      {/* CONTENEDOR DE MODOS DE JUEGO */}
      <div style={cardsContainer}>
        {/* MODO 1 JUGADOR */}
        <div style={cardStyle} onClick={() => handleSelectMode("single")}>
          <div style={iconLarge}>👤</div>
          <h2 style={cardTitle}>1 JUGADOR</h2>
          <p style={cardDesc}>MODO INDIVIDUAL. RESPONDE HASTA FALLAR.</p>
          {/* Decoración de fondo */}
          <div style={bgIconLeft}>👤</div>
        </div>

        {/* MODO 2 JUGADORES */}
        <div style={cardStyle} onClick={() => handleSelectMode("multi")}>
          <div style={iconLarge}>👥</div>
          <h2 style={cardTitle}>2 JUGADORES</h2>
          <p style={cardDesc}>MODO POR TURNOS (DUELO).</p>
          <div style={bgIconLeft}>👥</div>
        </div>
      </div>

      {/* FOOTER CON BOTONES DE NAVEGACIÓN */}
      <div style={footerStyle}>
        <div style={dotDecoration}>••</div>
        <div style={footerButtons}>
          {/* Botón de Ranking (Copa) */}
          <button style={circleBtn} onClick={() => navigate("/leaderboard-page")}>
            🏆
          </button>
        </div>
      </div>
    </div>
  );
}

// --- SISTEMA DE ESTILOS (Fiel a tu diseño) ---

const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  backgroundColor: "#90063a", // Borgoña oscuro
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxSizing: "border-box",
  overflowX: "hidden"
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "30px"
};

const logoWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const mainTitleStyle = {
  fontFamily: "'Keania One', sans-serif",
  fontSize: "110px",
  color: "#FFFFFF",
  margin: 0,
  letterSpacing: "5px"
};

const indicatorWrapper = {
  marginBottom: "50px"
};

const selectionIndicator = {
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  color: "white",
  padding: "10px 40px",
  borderRadius: "50px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  letterSpacing: "1px"
};

const cardsContainer = {
  display: "flex",
  gap: "40px",
  flexWrap: "wrap",
  justifyContent: "center"
};

const cardStyle = {
  width: "360px",
  height: "210px",
  backgroundColor: "#daa520", // Amarillo/Dorado
  borderRadius: "35px",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "transform 0.2s ease",
  border: "2px solid rgba(0,0,0,0.1)",
  boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
};

const iconLarge = {
  fontSize: "3.5rem",
  color: "#90063a",
  marginBottom: "5px",
  zIndex: 2
};

const cardTitle = {
  fontFamily: "'Keania One', sans-serif",
  fontSize: "1.8rem",
  color: "#90063a",
  margin: 0,
  zIndex: 2
};

const cardDesc = {
  fontSize: "0.8rem",
  fontWeight: "bold",
  color: "#90063a",
  textAlign: "center",
  maxWidth: "80%",
  zIndex: 2
};

const bgIconLeft = {
  position: "absolute",
  bottom: "-15px",
  left: "-15px",
  fontSize: "6rem",
  opacity: 0.1,
  transform: "rotate(15deg)",
  zIndex: 1
};

const footerStyle = {
  marginTop: "60px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px"
};

const dotDecoration = {
  color: "white",
  fontSize: "1.5rem",
  letterSpacing: "10px",
  opacity: 0.8
};

const footerButtons = {
  display: "flex",
  gap: "25px"
};

const circleBtn = {
  width: "60px",
  height: "60px",
  backgroundColor: "white",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.6rem",
  cursor: "pointer",
  border: "none",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  transition: "transform 0.2s",
};