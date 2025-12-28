import React from "react";

export default function QuestionCard({ questionObj, onAnswer }) {
  if (!questionObj) return null;

  return (
    <div style={cardStyle}>
      <h3 style={qTextStyle}>{questionObj.question}</h3>
      <div style={optionsGrid}>
        {questionObj.options.map((opt, i) => (
          <button 
            key={`${questionObj.id}-${i}`} // Key dinámica para forzar refresco de botones
            style={optBtnStyle} 
            onClick={() => onAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  padding: "30px",
  borderRadius: "20px",
  backgroundColor: "rgba(255,255,255,0.15)",
  width: "100%",
  boxSizing: "border-box",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.2)"
};

const qTextStyle = { color: "white", textAlign: "center", marginBottom: "30px", fontSize: "1.2rem", fontFamily: "sans-serif" };
const optionsGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" };
const optBtnStyle = {
  padding: "15px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "white",
  color: "#90063a",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "0.2s"
};