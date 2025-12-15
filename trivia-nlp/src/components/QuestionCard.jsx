import React from "react";
import AnswerButton from "./AnswerButton";

export default function QuestionCard({ questionObj, onAnswer, disabled, selectedId, correctId }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff", // Fondo casi blanco/rosaceo como la imagen? La imagen 2 muestra blanco dentro de la card.
        borderRadius: "16px",
        padding: "30px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        boxSizing: "border-box", // Important for preventing overflow
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          display: "inline-block",
          padding: "4px 12px",
          backgroundColor: "#f0f4f8",
          color: "#555",
          borderRadius: "8px",
          fontSize: "0.85rem",
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {questionObj.category || "General"}
      </div>

      {/* Question Text */}
      <h2
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "1.4rem",
          color: "#333",
          marginBottom: "30px",
          lineHeight: "1.4",
        }}
      >
        {questionObj.question}
      </h2>

      {/* Options Stack */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {questionObj.options.map((opt, i) => {
          const id = `${questionObj.id}-opt-${i}`;
          const isSelected = selectedId === id;
          const isCorrect = correctId === id;
          return (
            <AnswerButton
              key={id}
              id={id}
              text={opt}
              onClick={() => onAnswer(opt, id)}
              disabled={disabled}
              isSelected={isSelected}
              isCorrect={isCorrect}
            />
          );
        })}
      </div>
    </div>
  );
}
