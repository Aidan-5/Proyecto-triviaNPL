import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const [topScores, setTopScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        // El servidor ya filtra para que solo se vean los de modo "single"
        setTopScores(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el ranking:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>MEJORES PUNTAJES</h1>
        <p style={subtitleStyle}>TOP 10 - MODO INDIVIDUAL</p>

        <div style={boardStyle}>
          {loading ? (
            <p style={infoMsg}>Cargando posiciones...</p>
          ) : topScores.length > 0 ? (
            topScores.map((player, index) => (
              <div key={index} style={rowStyle}>
                <div style={rankStyle}>{index + 1}</div>
                <div style={nameStyle}>{player.name.toUpperCase()}</div>
                <div style={pointsStyle}>{player.score} PTS</div>
              </div>
            ))
          ) : (
            <p style={infoMsg}>¡Aún no hay récords!</p>
          )}
        </div>

        {/* 2. BOTÓN VOLVER (Parte Inferior para mejor acceso) */}
        <button onClick={() => navigate("/")} style={bottomReturnButton}>
          VOLVER AL INICIO
        </button>
      </div>
    </div>
  );
}

// --- ESTILOS ACTUALIZADOS ---

const containerStyle = {
  minHeight: "100vh",
  width: "100vw",
  backgroundColor: "#90063a",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxSizing: "border-box",
  fontFamily: "sans-serif",
  position: "relative"
};

const closeButtonStyle = {
  position: "absolute",
  top: "30px",
  right: "30px",
  backgroundColor: "white",
  border: "none",
  borderRadius: "50%",
  width: "45px",
  height: "45px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#90063a",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  zIndex: 10
};

const bottomReturnButton = {
  marginTop: "30px",
  padding: "15px 40px",
  backgroundColor: "#daa520",
  color: "#90063a",
  border: "none",
  borderRadius: "15px",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  transition: "transform 0.2s ease",
  fontFamily: "'Keania One', sans-serif"
};

const contentStyle = {
  width: "100%",
  maxWidth: "500px",
  textAlign: "center",
};

const titleStyle = {
  fontFamily: "'Keania One', sans-serif",
  color: "#daa520",
  fontSize: "2.5rem",
  margin: "0 0 5px 0",
};

const subtitleStyle = {
  color: "white",
  letterSpacing: "2px",
  fontSize: "0.9rem",
  marginBottom: "30px",
  opacity: 0.8,
};

const boardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "25px",
  padding: "20px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
};

const rowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 20px",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
  marginBottom: "10px",
  color: "white",
};

const rankStyle = {
  backgroundColor: "#daa520",
  color: "#90063a",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
};

const nameStyle = {
  flex: 1,
  textAlign: "left",
  marginLeft: "20px",
  fontWeight: "bold",
};

const pointsStyle = {
  fontWeight: "bold",
  color: "#daa520",
};

const infoMsg = {
  color: "white",
  opacity: 0.6,
  padding: "20px",
};