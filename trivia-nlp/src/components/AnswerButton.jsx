import React from "react";

export default function AnswerButton({ id, text, onClick, disabled, isSelected, isCorrect }) {
  // Base style
  const style = {
    width: "100%",
    padding: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
    cursor: disabled ? "default" : "pointer",
    fontSize: "1rem",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    transition: "all 0.2s ease",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  };

  // State styling
  if (isCorrect) {
    style.backgroundColor = "#4caf50"; // Green
    style.color = "#fff";
    style.borderColor = "#4caf50";
  } else if (isSelected && !isCorrect && disabled) {
    style.backgroundColor = "#f44336"; // Red
    style.color = "#fff";
    style.borderColor = "#f44336";
  } else if (isSelected) {
    style.border = "2px solid #daa520";
    style.backgroundColor = "#fff8e1";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      className="answer-button" // hook for specialized hover if needed (using .css)
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = "#f9f9f9";
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = "#ffffff";
      }}
    >
      {text}
    </button>
  );
}
