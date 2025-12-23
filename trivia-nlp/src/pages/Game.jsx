import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { getQuestions } from "../services/triviaService";
import { isAnswerCorrect } from "../utils/nlp";
import BrandHeader from "../components/BrandHeader";

export default function Game() {
  const navigate = useNavigate();
  const location = useLocation();

  const mode = location.state?.mode || "single";
  const playersData = location.state?.players || { player1: "Jugador 1", player2: "Jugador 2" };

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [turn, setTurn] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPaused, setIsPaused] = useState(false);
  const [helpUsed, setHelpUsed] = useState([false, false]);

  const timerEnabled = JSON.parse(localStorage.getItem("timerEnabled") ?? "true");
  const helpEnabled = JSON.parse(localStorage.getItem("helpEnabled") ?? "false");

  const [disabled, setDisabled] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [correctId, setCorrectId] = useState(null);

  useEffect(() => {
    const qs = getQuestions(10);
    setQuestions(qs);
  }, []);

  useEffect(() => {
    if (!questions.length || disabled || isPaused || !timerEnabled) return;

    if (timeLeft === 0) {
      handleTimeout();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, disabled, questions.length, isPaused, timerEnabled]);

  useEffect(() => {
    setTimeLeft(60);
    setIsPaused(false);
  }, [index, turn]);

  const handleHelp = () => {
    if (disabled || isPaused) return;
    setHelpUsed((prev) => {
      const newUsed = [...prev];
      newUsed[turn] = true;
      return newUsed;
    });
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 60000);
  };

  const handleTimeout = () => {
    if (disabled) return;
    setDisabled(true);

    if (mode === "single") {
      finishGame();
    } else {
      setTimeout(() => {
        setDisabled(false);
        if (index + 1 >= questions.length) {
          finishGame();
        } else {
          setIndex((i) => i + 1);
          setTurn((prev) => (prev === 0 ? 1 : 0));
        }
      }, 1000);
    }
  };

  const handleAnswer = (optionText, optId) => {
    if (disabled) return;
    setDisabled(true);
    setSelectedId(optId);

    const correct = isAnswerCorrect(optionText, questions[index].answer, 0.7);
    const correctIndex = questions[index].options.findIndex((o) => o === questions[index].answer);
    const correctOptionId = `${questions[index].id}-opt-${correctIndex}`;
    setCorrectId(correctOptionId);

    if (correct) {
      setScores((prev) => {
        const newScores = [...prev];
        newScores[turn] += 10;
        return newScores;
      });
    }

    setTimeout(() => {
      if (mode === "single" && !correct) {
        finishGame();
        return;
      }

      setSelectedId(null);
      setCorrectId(null);
      setDisabled(false);

      if (index + 1 >= questions.length) {
        finishGame();
      } else {
        setIndex((i) => i + 1);
        if (mode === "multi") setTurn((prev) => (prev === 0 ? 1 : 0));
      }
    }, 1500);
  };

  const finishGame = () => {
    const scoresPayload = mode === "single"
      ? [{ name: playersData.player1, score: scores[0] }]
      : [{ name: playersData.player1, score: scores[0] }, { name: playersData.player2, score: scores[1] }];
    navigate("/results", { state: { mode, scores: scoresPayload } });
  };

  if (!questions.length) return <div style={{ color: "white", textAlign: "center", padding: "50px" }}>Cargando...</div>;

  const currentPlayerName = turn === 0 ? playersData.player1 : playersData.player2;
  const currentScore = scores[turn];

  return (
    <div style={containerStyle}>
      {/* Top Header */}
      <div style={{ marginTop: "20px" }}>
        <BrandHeader scale={0.8} />
      </div>

      {/* Timer Badge */}
      {timerEnabled && (
        <div style={timerBadgeStyle}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.05881 16.6229C5.87899 10.0457 11.4898 4.9562 18.2892 4.9562C25.6532 4.9562 31.6229 10.9257 31.6229 18.2895C31.6229 25.6534 25.6532 31.6229 18.2892 31.6229H9.95638M18.2899 18.2895V11.6229M14.9565 1.62286H21.6233M1.62286 21.6229H9.95638M4.95627 26.6229H13.2898" stroke="white" strokeWidth="3.24571" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: "1.8rem", color: "white", fontFamily: "'Koulen', sans-serif" }}>{timeLeft} S</span>
        </div>
      )}

      {/* Help Button (Phone) */}
      {helpEnabled && (
        <div
          onClick={handleHelp}
          style={{
            position: "absolute",
            top: "40px",
            right: "40px",
            cursor: "pointer",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "20px",
            borderRadius: "15px",
            opacity: helpUsed[turn] ? 0.3 : 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 6px 0 rgba(0,0,0,0.2)"
          }}
        >
          <svg width="60" height="60" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.8785 32.0774L33.6133 33.4092C33.6133 33.4092 30.606 36.5753 22.3977 27.9333C14.1894 19.2915 17.1966 16.1255 17.1966 16.1255L17.9933 15.2867C19.9561 13.2204 20.1411 9.90294 18.4286 7.48108L14.9259 2.52695C12.8066 -0.470591 8.71123 -0.866562 6.28204 1.69092L1.92204 6.28119C0.717544 7.54931 -0.0896219 9.19317 0.00826691 11.0168C0.258683 15.6821 2.25221 25.72 13.3762 37.4315C25.1727 49.851 36.2413 50.3445 40.7677 49.8977C42.1994 49.7565 43.4444 48.9845 44.4477 47.928L48.3938 43.7739C51.0574 40.9695 50.3063 36.1618 46.8983 34.2003L41.5913 31.1456C39.3535 29.8577 36.6274 30.2359 34.8785 32.0774Z" fill="#028B02" stroke="white" strokeWidth="0.000507937" />
          </svg>
        </div>
      )}

      {/* Question Card Container */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", width: "100%", padding: "50px", maxWidth: "1200px" }}>
        <QuestionCard
          questionObj={questions[index]}
          onAnswer={handleAnswer}
          disabled={disabled}
          selectedId={selectedId}
          correctId={correctId}
          playerName={currentPlayerName}
          score={currentScore}
        />
      </div>
    </div>
  );
}

const containerStyle = {
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "#90063a",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  overflow: "hidden"
};

const timerBadgeStyle = {
  backgroundColor: "#edb400",
  padding: "10px 40px",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginTop: "10px",
  border: "3px solid black",
  boxShadow: "0 6px 0 rgba(0,0,0,0.2)"
};
