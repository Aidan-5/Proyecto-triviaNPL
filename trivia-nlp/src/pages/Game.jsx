import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

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
  const [loading, setLoading] = useState(true);

  // Comodín Llamada
  const [callUsed, setCallUsed] = useState([false, false]);
  const [isCalling, setIsCalling] = useState(false);
  const [callTime, setCallTime] = useState(30);

  // Función para mezclar opciones (Fisher-Yates)
  const shuffleOptions = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          // MEZCLAR OPCIONES AL CARGAR
          const dataWithShuffledOptions = data.map(q => ({
            ...q,
            options: shuffleOptions(q.options)
          }));
          setQuestions(dataWithShuffledOptions);
        }
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || questions.length === 0) return;
    let timer;
    if (isCalling) {
      if (callTime > 0) timer = setInterval(() => setCallTime(t => t - 1), 1000);
      else setIsCalling(false);
    } else {
      if (timeLeft <= 0) handleAction(null);
      else timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isCalling, callTime, loading]);

  const handleAction = (selectedOption) => {
    if (isCalling) setIsCalling(false);
    const currentQuestion = questions[index];
    const isCorrect = selectedOption === currentQuestion.answer;

    let newScores = [...scores];
    if (isCorrect) newScores[turn] += 10;
    setScores(newScores);

    if (!isCorrect && mode === "single") {
      finishGame(newScores);
    } else {
      const nextIdx = index + 1;
      if (nextIdx >= questions.length) {
        finishGame(newScores);
      } else {
        setIndex(nextIdx);
        setTimeLeft(60);
        setCallTime(30);
        if (mode === "multi") setTurn(turn === 0 ? 1 : 0);
      }
    }
  };

  const useCallWildcard = (pIdx) => {
    if (!callUsed[pIdx]) {
      setCallUsed(prev => {
        const up = [...prev]; up[pIdx] = true; return up;
      });
      setIsCalling(true);
      setCallTime(30);
    }
  };

  const finishGame = async (finalScores) => {
    if (mode === "single" && finalScores[0] > 0) {
      await fetch("http://localhost:3000/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playersData.player1, score: finalScores[0], mode: "single" }),
      });
    }
    navigate("/results", { state: { mode, results: [
      { name: playersData.player1, score: finalScores[0] },
      { name: playersData.player2, score: finalScores[1] }
    ]}});
  };

  const PlayerView = ({ pIdx, pName, pScore, isActive }) => (
    <div style={{...viewStyle, filter: isActive ? "none" : "grayscale(1) brightness(0.4)", pointerEvents: isActive ? "all" : "none"}}>
      <div style={headerStyle}>
        <h2 style={{color: 'white', margin: 0}}>{pName}</h2>
        <div style={{color: '#daa520', fontWeight: 'bold'}}>{pScore} PTS</div>
      </div>
      <button 
        disabled={callUsed[pIdx] || !isActive || isCalling}
        onClick={() => useCallWildcard(pIdx)}
        style={{...callBtn, backgroundColor: callUsed[pIdx] ? "#444" : "#25D366"}}
      >
        {callUsed[pIdx] ? "🚫 LLAMADA USADA" : "📞 COMODÍN LLAMADA"}
      </button>
      {isCalling && isActive && <div style={{color: '#25D366', fontWeight: 'bold'}}>☎️ LLAMADA: {callTime}s</div>}
      <div style={{width: '100%', maxWidth: '450px'}}>
        <QuestionCard questionObj={questions[index]} onAnswer={handleAction} />
      </div>
      <div style={{fontSize: '2rem', color: timeLeft < 10 ? 'red' : 'white', marginTop: '15px', opacity: isCalling ? 0.3 : 1}}>
        ⏱ {isCalling ? "PAUSADO" : `${timeLeft}s`}
      </div>
    </div>
  );

  if (loading) return <div style={msgStyle}>Cargando...</div>;

  return (
    <div style={{display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#90063a'}}>
      {mode === "multi" ? (
        <><PlayerView pIdx={0} pName={playersData.player1} pScore={scores[0]} isActive={turn === 0} />
          <div style={{width: '2px', backgroundColor: 'rgba(255,255,255,0.2)'}} />
          <PlayerView pIdx={1} pName={playersData.player2} pScore={scores[1]} isActive={turn === 1} /></>
      ) : (
        <PlayerView pIdx={0} pName={playersData.player1} pScore={scores[0]} isActive={true} />
      )}
    </div>
  );
}

const viewStyle = { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" };
const headerStyle = { width: "85%", display: "flex", justifyContent: "space-between", padding: "10px 20px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "15px", marginBottom: "15px" };
const callBtn = { padding: "10px 20px", borderRadius: "50px", border: "none", color: "white", fontWeight: "bold", cursor: "pointer", marginBottom: "10px" };
const msgStyle = { height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "#90063a" };