import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, scores } = location.state || { mode: "single", scores: [] };

  const sorted = (scores || []).slice().sort((a, b) => b.score - a.score);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#90063a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "white", fontSize: "3rem", marginBottom: "40px", fontFamily: "'Keania One', sans-serif" }}>
        Resultados
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", maxWidth: "600px" }}>
        {sorted.map((s, i) => (
          <div
            key={s.name}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "15px", // Consistent with Game.jsx
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              border: i === 0 ? "4px solid #daa520" : "none", // Highlight winner with gold border
            }}
          >
            <div>
              <div style={{ fontSize: "1.2rem", color: "#555" }}>
                {i === 0 ? "🏆 Ganador" : "Jugador"}
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#333" }}>
                {s.name}
              </div>
            </div>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#90063a",
              }}
            >
              {s.score} pts
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "50px", display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={() => navigate("/")}
          style={buttonStyle}
        >
          Volver al Inicio
        </button>
        {/* Optional: Retry button logic could go here, but usually requires re-setup */}
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#daa520",
  color: "#90063a",
  fontSize: "1.2rem",
  fontWeight: "bold",
  fontFamily: "Arial, sans-serif",
  padding: "15px 40px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  transition: "transform 0.2s",
};
