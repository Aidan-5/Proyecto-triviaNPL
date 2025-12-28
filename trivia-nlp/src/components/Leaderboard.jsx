import React, { useEffect, useState } from "react";

export default function Leaderboard() {
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setTopScores(data))
      .catch((err) => console.error("Error cargando ranking:", err));
  }, []);

  return (
    <div className="glass" style={leaderboardContainerStyle}>
      <h3 style={titleStyle}>🏆 MEJORES PUNTAJES</h3>
      <div style={listStyle}>
        {topScores.length > 0 ? (
          topScores.map((entry, index) => (
            <div key={index} style={itemStyle}>
              <span style={rankStyle}>#{index + 1}</span>
              <span style={nameStyle}>{entry.name}</span>
              <span style={scoreStyle}>{entry.score} pts</span>
            </div>
          ))
        ) : (
          <p style={{ color: "white", opacity: 0.7 }}>Aún no hay records.</p>
        )}
      </div>
    </div>
  );
}

// Estilos para el tablero
const leaderboardContainerStyle = {
  width: "100%",
  maxWidth: "400px",
  padding: "20px",
  borderRadius: "25px",
  border: "1px solid rgba(255,255,255,0.2)",
  marginTop: "20px",
  textAlign: "center"
};

const titleStyle = {
  fontFamily: "'Keania One', sans-serif",
  color: "#daa520",
  marginBottom: "15px",
  fontSize: "1.2rem"
};

const listStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 15px",
  backgroundColor: "rgba(255,255,255,0.1)",
  borderRadius: "15px",
  color: "white"
};

const rankStyle = { 
    fontWeight: "bold", 
    color: "#daa520", 
    width: "30px" };

const nameStyle = { 
    flex: 1, 
    textAlign: "left", 
    marginLeft: "10px" };

const scoreStyle = { 
    fontWeight: "bold" };