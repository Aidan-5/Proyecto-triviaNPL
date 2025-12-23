import React from "react";
import AnswerButton from "./AnswerButton";

export default function QuestionCard({
  questionObj,
  onAnswer,
  disabled,
  selectedId,
  correctId,
  playerName = "JUGADOR",
  score = 0
}) {
  const optionColors = ["#90063a", "#edb400", "#daa520", "#90063A"];

  return (
    <div
      style={{
        backgroundColor: "#d18d1f",
        borderRadius: "25px",
        width: "100%",
        maxWidth: "950px",
        margin: "0 auto",
        boxSizing: "border-box",
        border: "3px solid black",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
      }}
    >
      {/* Header Strip inside the card */}
      <div style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid rgba(255,255,255,0.1)"
      }}>
        <span style={{ color: "white", fontSize: "1.4rem", fontFamily: "'Koulen', sans-serif" }}>
          [ {playerName.toUpperCase()} ]
        </span>
        <span style={{ color: "white", fontSize: "1.4rem", fontFamily: "'Koulen', sans-serif" }}>
          $ {score}
        </span>
      </div>

      <div style={{ padding: "40px 60px" }}>
        {/* Question Text */}
        <h2
          style={{
            fontSize: "2.8rem",
            color: "#fff",
            marginBottom: "60px",
            textAlign: "center",
            fontFamily: "'Koulen', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "2px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
          }}
        >
          ¿ {questionObj.question.toUpperCase()} ?
        </h2>

        {/* Options Grid 2x2 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px"
        }}>
          {questionObj.options.map((opt, i) => {
            const id = `${questionObj.id}-opt-${i}`;
            return (
              <AnswerButton
                key={id}
                id={id}
                text={opt}
                baseColor={optionColors[i % 4]}
                onClick={() => onAnswer(opt, id)}
                disabled={disabled}
                isSelected={selectedId === id}
                isCorrect={correctId === id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
