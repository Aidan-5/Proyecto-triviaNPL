import React from "react";

export default function AnswerButton({ id, text, onClick, disabled, isSelected, isCorrect, baseColor = "#ffffff" }) {
  // Base style
  const style = {
    width: "100%",
    height: "100px",
    padding: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    border: isSelected ? "4px solid white" : "none",
    backgroundColor: baseColor,
    cursor: disabled ? "default" : "pointer",
    fontSize: "1.8rem",
    color: "#fff",
    fontFamily: "'Koulen', sans-serif",
    transition: "all 0.2s ease",
    boxShadow: "0 6px 0 rgba(0,0,0,0.2)",
    textTransform: "uppercase",
    letterSpacing: "1px"
  };

  // State styling overrides
  if (isCorrect) {
    style.backgroundColor = "#2e7d32"; // Success Green
    style.border = "4px solid #fff";
  } else if (isSelected && !isCorrect && disabled) {
    style.backgroundColor = "#c62828"; // Error Red
    style.border = "4px solid #fff";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {text}
    </button>
  );
}
