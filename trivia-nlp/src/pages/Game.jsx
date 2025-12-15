import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { getQuestions } from "../services/triviaService";
import { isAnswerCorrect } from "../utils/nlp";

export default function Game() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read configuration from navigation state
  // Expected state: { mode: 'single'|'multi', players: { player1: "Name", player2: "Name" } }
  const mode = location.state?.mode || "single";
  const playersData = location.state?.players || { player1: "Jugador 1", player2: "Jugador 2" };

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0); // Current question index

  // Game state
  // Single player: uses scores[0]
  // Multi player: uses scores[0] and scores[1]
  const [scores, setScores] = useState([0, 0]);

  // Turn management (0 for player1, 1 for player2)
  const [turn, setTurn] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Timer state
  const [isPaused, setIsPaused] = useState(false);
  const [helpUsed, setHelpUsed] = useState([false, false]); // Tracks usage for [player1, player2]

  const [disabled, setDisabled] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [correctId, setCorrectId] = useState(null);

  // Initialize questions
  useEffect(() => {
    // Determine how many questions based on mode? keeping simple 10 for now.
    const qs = getQuestions(10);
    setQuestions(qs);
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (!questions.length || disabled || isPaused) return;

    // Reset timer on new question/turn is handled by effect dependnecies or manual reset?
    // Actually best to reset when index or turn changes. 
    // Let's us a separate effect to reset, or just reset in the "next question" logic.
    // Here strictly countdown.

    if (timeLeft === 0) {
      handleTimeout();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, disabled, questions.length, isPaused]);

  // Reset timer when question or turn changes
  useEffect(() => {
    setTimeLeft(60);
    setIsPaused(false); // Ensure timer runs when switching turns/questions
  }, [index, turn]);


  const handleHelp = () => {
    if (disabled || isPaused) return;

    // Mark help as used for current player
    setHelpUsed((prev) => {
      const newUsed = [...prev];
      newUsed[turn] = true;
      return newUsed;
    });

    setIsPaused(true);

    // Resume after 60 seconds (1 minute)
    setTimeout(() => {
      setIsPaused(false);
    }, 60000);
  };


  if (!questions.length) {
    return (
      <div style={{ padding: "40px", color: "white", textAlign: "center", fontFamily: "Arial" }}>
        Cargando preguntas...
      </div>
    );
  }

  const cur = questions[index];

  const handleTimeout = () => {
    if (disabled) return;
    setDisabled(true); // Lock inputs

    if (mode === "single") {
      // Single Player Timeout = Game Over
      finishGame();
    } else {
      // Multi Player Timeout = Switch Turn (no points)
      // Show "Time's up" message? For now just switch.
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

  // Logic to handle answer selection
  const handleAnswer = (optionText, optId) => {
    if (disabled) return;
    setDisabled(true);
    setSelectedId(optId);

    const correct = isAnswerCorrect(optionText, cur.answer, 0.7);

    // Find correct option index for highlighting
    const correctIndex = cur.options.findIndex((o) => o === cur.answer);
    const correctOptionId = `${cur.id}-opt-${correctIndex}`;
    setCorrectId(correctOptionId);

    if (correct) {
      // Update score for the current player 'turn'
      setScores((prev) => {
        const newScores = [...prev];
        newScores[turn] += 10;
        return newScores;
      });
    }

    // Delay before next step
    setTimeout(() => {
      // Logic for Single Player Sudden Death
      if (mode === "single" && !correct) {
        finishGame();
        return;
      }

      setSelectedId(null);
      setCorrectId(null);
      setDisabled(false);

      const isLastQuestion = index + 1 >= questions.length;

      if (isLastQuestion) {
        // Game Over
        finishGame();
      } else {
        // Next Question
        setIndex((i) => i + 1);

        // Switch turn if multiplayer
        if (mode === "multi") {
          setTurn((prev) => (prev === 0 ? 1 : 0));
        }
      }
    }, 1500);
  };

  const finishGame = () => {
    const scoresPayload = [];
    if (mode === "single") {
      scoresPayload.push({ name: playersData.player1, score: scores[0] });
    } else {
      scoresPayload.push({ name: playersData.player1, score: scores[0] });
      scoresPayload.push({ name: playersData.player2, score: scores[1] });
    }
    navigate("/results", { state: { mode, scores: scoresPayload } });
  };

  // --- RENDERING HELPERS ---

  // Header Component for a Player
  const PlayerHeader = ({ name, score, isActive, align = "left", showTimer, onHelp, canUseHelp }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        marginBottom: "20px",
        opacity: isActive ? 1 : 0.6,
      }}
    >
      <div>
        <div style={{ fontSize: "0.9rem", color: isActive ? "#555" : "#888" }}>The Player</div>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}>{name}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {/* TIMER DISPLAY */}
        {isActive && showTimer && (
          <div style={{
            backgroundColor: timeLeft <= 10 ? "#f44336" : "#2196f3",
            color: "white",
            padding: "5px 10px",
            borderRadius: "15px",
            fontWeight: "bold"
          }}>
            ⏱ {timeLeft}s
          </div>
        )}

        {/* Help Button */}
        {isActive && showTimer && canUseHelp && (
          <button
            onClick={onHelp}
            title="Ayuda: Pausar 1 min"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#2196f3",
              display: "flex",
              alignItems: "center",
              fontSize: "1.2rem",
              padding: "5px",
            }}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='1.25em' height='1em' viewBox='0 0 640 512'>
              {/* Icon from Font Awesome 6 Regular by Dave Gandy - https://creativecommons.org/licenses/by/4.0/ */}
              <path fill='currentColor' d='m272.2 64.6l-51.1 51.1c-15.3 4.2-29.5 11.9-41.5 22.5L153 161.9c-10.2 9.1-23.5 14.1-37.2 14.1H96v128c20.4.6 39.8 8.9 54.3 23.4l35.6 35.6l7 7l27 27c6.2 6.2 16.4 6.2 22.6 0c1.7-1.7 3-3.7 3.7-5.8c2.8-7.7 9.3-13.5 17.3-15.3s16.4.6 22.2 6.5l10.8 10.6c11.6 11.6 30.4 11.6 41.9 0c5.4-5.4 8.3-12.3 8.6-19.4c.4-8.8 5.6-16.6 13.6-20.4s17.3-3 24.4 2.1c9.4 6.7 22.5 5.8 30.9-2.6c9.4-9.4 9.4-24.6 0-33.9L340.1 243l-35.8 33c-27.3 25.2-69.2 25.6-97 .9c-31.7-28.2-32.4-77.4-1.6-106.5l70.1-66.2C303.2 78.4 339.4 64 377.1 64c36.1 0 71 13.3 97.9 37.2l30.1 26.8H624c8.8 0 16 7.2 16 16v208c0 17.7-14.3 32-32 32h-32c-11.8 0-22.2-6.4-27.7-16h-84.9c-3.4 6.7-7.9 13.1-13.5 18.7c-17.1 17.1-40.8 23.8-63 20.1c-3.6 7.3-8.5 14.1-14.6 20.2c-27.3 27.3-70 30-100.4 8.1c-25.1 20.8-62.5 19.5-86-4.1L159 404l-7-7l-35.6-35.6c-5.5-5.5-12.7-8.7-20.4-9.3c0 17.6-14.4 31.9-32 31.9H32c-17.7 0-32-14.3-32-32V144c0-8.8 7.2-16 16-16h99.8c2 0 3.9-.7 5.3-2l26.5-23.6C175.5 77.7 211.4 64 248.7 64H259c4.4 0 8.9.2 13.2.6M544 320V176h-48c-5.9 0-11.6-2.2-15.9-6.1l-36.9-32.8C425 120.9 401.5 112 377.1 112c-25.4 0-49.8 9.7-68.3 27.1l-70.1 66.2c-10.3 9.8-10.1 26.3.5 35.7c9.3 8.3 23.4 8.1 32.5-.3l71.9-66.4c9.7-9 24.9-8.4 33.9 1.4s8.4 24.9-1.4 33.9l-.8.8l74.4 74.4c10 10 16.5 22.3 19.4 35.1h74.8zM64 336a16 16 0 1 0-32 0a16 16 0 1 0 32 0m528 16a16 16 0 1 0 0-32a16 16 0 1 0 0 32' />
            </svg>
          </button>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#d2920d", fontWeight: "bold", fontSize: "1.2rem" }}>
          <span>🏆</span>
          <span>{score}</span>
        </div>
      </div>
    </div>
  );

  // Layout for Single Player matches Image 1
  if (mode === "single") {
    return (
      <div style={containerStyle}>
        {/* Main Card Area */}
        <div style={singleCardWrapperStyle}>
          {/* Header Area inside the wrapper? No, image showing it inside the white/pink rounded container maybe?
             Let's look at image 1:
             Top white area has "Jugador" "Evelyn Valverde" and Trophy.
             This looks like the header is part of the card container or separate?
             Actually it looks like one big rounded container with a header part and a question part.
          */}

          <div style={innerCardStyle}>
            {/* Header */}
            <PlayerHeader
              name={playersData.player1}
              score={scores[0]}
              isActive={true}
              showTimer={true}
              onHelp={handleHelp}
              canUseHelp={!helpUsed[0]} // Single player is always index 0
            />

            {/* Question Card Content */}
            {/* Since we refactored QuestionCard to include its own container, we should maybe render it directly.
                 However QuestionCard has a white background.
                 The image shows the header and question in one unified white card?
                 No, looks like a light pink/white large container.
                 Inside it, a section for header. Then a section for Question.
             */}

            <QuestionCard
              questionObj={cur}
              onAnswer={handleAnswer}
              disabled={disabled}
              selectedId={selectedId}
              correctId={correctId}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <div style={footerTextStyle}>Pregunta {index + 1}</div>
          <div style={footerTextStyle}>Puntos: {scores[0]}</div>
        </div>
      </div>
    );
  }

  // Layout for Multi Player matches Image 2
  // Two distinct columns. Left = Player 1 (Gold bg), Right = Player 2 (Pink/Maroon bg).
  return (
    <div style={{ ...containerStyle, flexDirection: "row", padding: 0 }}>

      {/* LEFT COLUMN - PLAYER 1 */}
      {/* Image 2 shows left side is yellow/gold background if active? 
          Actually Image 2:
          Left side: Gold background. Inside: Header + Question Card (White).
          Right side: Maroon background. Inside: Header + "Esperando turno...".
          
          Wait, is background dynamic? 
          "la primera imagen es para cundo se selecione un jugador, y la sigueinte es para 2 jugadores"
          
          If Player 1 is active (Left): Left is Gold, Right is Maroon.
          If Player 2 is active (Right): Left is Maroon? Right is Gold? 
          Or maybe fixed colors?
          Image 2 shows Player 1 is Gold. Player 1 Name is Evelyn.
          
          Let's assume fixed colors for P1 and P2 columns to match the "Design" of 2 columns.
          But the active player gets the Question Card visible.
      */}

      {/* Player 1 Region */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#daa520", // Gold
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          position: "relative",
          transition: "all 0.3s"
        }}
      >
        {/* Header P1 */}
        {/* Note: The header in Image 2 is in a semi-transparent white box? 
            Top left: "Jugador 1" "Evelyn". 
            It looks like a card header.
        */}
        <div style={multiHeaderStyle}>
          <PlayerHeader
            name={playersData.player1}
            score={scores[0]}
            isActive={true}
            showTimer={turn === 0}
            onHelp={handleHelp}
            canUseHelp={!helpUsed[0] && turn === 0}
          />
        </div>

        {/* Content P1 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {turn === 0 ? (
            <QuestionCard
              questionObj={cur}
              onAnswer={handleAnswer}
              disabled={disabled}
              selectedId={selectedId}
              correctId={correctId}
            />
          ) : (
            <div style={waitingStyle}>Esperando turno...</div>
          )}
        </div>
      </div>

      {/* Player 2 Region */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#90063a", // Updated to requested burgundy
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          position: "relative",
          transition: "all 0.3s",
          boxSizing: "border-box", // Ensure padding doesn't cause overflow
          overflow: "hidden" // Prevent child elements from spilling out
        }}
      >
        {/* Header P2 */}
        <div style={{ ...multiHeaderStyle, backgroundColor: "#ffffff" }}>
          <PlayerHeader
            name={playersData.player2}
            score={scores[1]}
            isActive={true}
            showTimer={turn === 1}
            onHelp={handleHelp}
            canUseHelp={!helpUsed[1] && turn === 1}
          />
        </div>

        {/* Content P2 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {turn === 1 ? (
            <QuestionCard
              questionObj={cur}
              onAnswer={handleAnswer}
              disabled={disabled}
              selectedId={selectedId}
              correctId={correctId}
            />
          ) : (
            <div style={waitingStyle}>Esperando turno...</div>
          )}
        </div>
      </div>

      {/* Footer Overlay ? */}
      <div style={fixedFooterStyle}>
        <div style={footerTextStyle}>Pregunta {index + 1}</div>
        <div style={footerTextStyle}>Jugadores activos: 2</div>
      </div>

    </div>
  );
}

// --- STYLES ---

const containerStyle = {
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "#90063a", // Burgundy
  display: "flex",
  flexDirection: "column",
  fontFamily: "Arial, sans-serif",
  position: "relative",
};

const singleCardWrapperStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const innerCardStyle = {
  backgroundColor: "#fce4ec", // Light pink/white
  borderRadius: "20px",
  padding: "20px",
  width: "100%",
  maxWidth: "600px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
};

const footerStyle = {
  backgroundColor: "#fce4ec",
  padding: "15px 30px",
  margin: "0 20px 20px 20px",
  borderRadius: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const fixedFooterStyle = {
  position: "absolute",
  bottom: "20px",
  left: "20px",
  right: "20px",
  backgroundColor: "#fce4ec",
  padding: "15px 30px",
  borderRadius: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 10,
};

const footerTextStyle = {
  color: "#555",
  fontSize: "1rem",
  fontWeight: "500",
};

const multiHeaderStyle = {
  backgroundColor: "rgba(255,255,255,0.9)",
  borderRadius: "12px",
  padding: "10px 20px",
  marginBottom: "20px",
};

const waitingStyle = {
  color: "rgba(255,255,255,0.5)",
  fontSize: "1.5rem",
  textAlign: "center",
  marginTop: "40px",
  fontWeight: "bold",
};
