import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SetupPlayers() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "single";
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  const handleStart = () => {
    if (!p1) return alert("Ingresa nombre");
    navigate("/game", { state: { mode, players: { player1: p1, player2: p2 } } });
  };

  return (
    <div style={{
      backgroundColor: "#90063a", 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      color: "white"}}>
      <h2>{mode === "single" ? "1 JUGADOR" : "2 JUGADORES"}</h2>
      <input placeholder="Nombre Jugador 1" onChange={e => setP1(e.target.value)} style={inputStyle} />
      {mode === "multi" && <input placeholder="Nombre Jugador 2" onChange={e => setP2(e.target.value)} style={inputStyle} />}
      <button onClick={handleStart} style={btnStyle}>EMPEZAR</button>
    </div>
  );
}
const inputStyle = { 
  padding: "12px", 
  margin: "10px", 
  borderRadius: "10px", 
  border: "none", 
  width: "250px" };

const btnStyle = { 
  padding: "12px 30px", 
  backgroundColor: "#daa520", 
  border: "none", 
  borderRadius: "10px", 
  fontWeight: "bold", 
  cursor: "pointer", 
  marginTop: "20px" };