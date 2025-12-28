import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, results } = location.state || { mode: "single", results: [] };

  // Determinar ganador si es multi
  const winner = mode === "multi" 
    ? (results[0].score > results[1].score ? results[0].name : results[1].name)
    : null;

  return (
    <div style={containerStyle}>
      <div className="glass" style={cardStyle}>
        <h1 style={titleStyle}>¡JUEGO TERMINADO!</h1>
        
        {mode === "multi" && results[0].score !== results[1].score && (
          <div style={winnerBanner}>🏆 ¡GANADOR: {winner}! 🏆</div>
        )}

        <div style={scoreContainer}>
          {results.map((p, i) => (
            (mode === "multi" || i === 0) && (
              <div key={i} style={playerRow}>
                <span style={nameStyle}>{p.name}</span>
                <span style={pointsStyle}>{p.score} PTS</span>
              </div>
            )
          ))}
        </div>

        <div style={buttonGroup}>
          <button onClick={() => navigate("/game", { state: { mode, players: { player1: results[0].name, player2: results[1].name } } })} style={retryBtn}>
            REINTENTAR
          </button>
          <button onClick={() => navigate("/")} style={homeBtn}>
            INICIO
          </button>
        </div>
      </div>
    </div>
  );
}

// --- ESTILOS ---
const containerStyle = { minHeight: "100vh", backgroundColor: "#90063a", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" };
const cardStyle = { backgroundColor: "rgba(255,255,255,0.1)", padding: "40px", borderRadius: "30px", textAlign: "center", width: "100%", maxWidth: "450px", border: "1px solid rgba(255,255,255,0.2)" };
const titleStyle = { fontFamily: "'Keania One', sans-serif", color: "#daa520", fontSize: "2.5rem", marginBottom: "20px" };
const winnerBanner = { backgroundColor: "#daa520", color: "#90063a", padding: "10px", borderRadius: "10px", fontWeight: "bold", marginBottom: "20px", fontSize: "1.2rem" };
const scoreContainer = { margin: "30px 0" };
const playerRow = { display: "flex", justifyContent: "space-between", padding: "15px", backgroundColor: "rgba(0,0,0,0.3)", borderRadius: "15px", marginBottom: "10px", color: "white" };
const nameStyle = { fontWeight: "bold", fontSize: "1.1rem" };
const pointsStyle = { color: "#daa520", fontWeight: "bold", fontSize: "1.2rem" };
const buttonGroup = { display: "flex", gap: "15px", marginTop: "30px" };
const retryBtn = { flex: 1, padding: "15px", borderRadius: "10px", border: "none", backgroundColor: "#daa520", color: "#90063a", fontWeight: "bold", cursor: "pointer" };
const homeBtn = { flex: 1, padding: "15px", borderRadius: "10px", border: "1px solid white", backgroundColor: "transparent", color: "white", fontWeight: "bold", cursor: "pointer" };