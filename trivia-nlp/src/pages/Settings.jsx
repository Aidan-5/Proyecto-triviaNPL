import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const [config, setConfig] = useState({ musica: true, efectos: true, vibracion: false });

  const toggle = (key) => setConfig({ ...config, [key]: !config[key] });

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate("/")} style={closeBtnStyle}>✕</button>
      
      <div className="glass" style={cardStyle}>
        <h1 style={titleStyle}>CONFIGURACIÓN</h1>
        
        <SettingItem label="MÚSICA" active={config.musica} onClick={() => toggle("musica")} />
        <SettingItem label="EFECTOS DE SONIDO" active={config.efectos} onClick={() => toggle("efectos")} />
        <SettingItem label="VIBRACIÓN" active={config.vibracion} onClick={() => toggle("vibracion")} />
      </div>
    </div>
  );
}

const SettingItem = ({ label, active, onClick }) => (
  <div style={rowStyle}>
    <span style={{color: "white", fontWeight: "bold"}}>{label}</span>
    <div onClick={onClick} style={{...switchStyle, backgroundColor: active ? "#4CAF50" : "#555"}}>
      <div style={{...knobStyle, transform: active ? "translateX(25px)" : "translateX(0)"}} />
    </div>
  </div>
);

// --- ESTILOS (Aprovechamos los de arriba) ---
const containerStyle = { minHeight: "100vh", backgroundColor: "#90063a", display: "flex", alignItems: "center", justifyContent: "center" };
const closeBtnStyle = { position: "absolute", top: "30px", right: "30px", backgroundColor: "white", borderRadius: "50%", width: "40px", height: "40px", border: "none", cursor: "pointer" };
const cardStyle = { width: "350px", backgroundColor: "rgba(255,255,255,0.1)", padding: "40px", borderRadius: "30px", textAlign: "center" };
const titleStyle = { fontFamily: "'Keania One', sans-serif", color: "#daa520", marginBottom: "30px" };
const rowStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" };
const switchStyle = { width: "55px", height: "30px", borderRadius: "15px", padding: "3px", cursor: "pointer", transition: "0.3s" };
const knobStyle = { width: "24px", height: "24px", backgroundColor: "white", borderRadius: "50%", transition: "0.3s" };