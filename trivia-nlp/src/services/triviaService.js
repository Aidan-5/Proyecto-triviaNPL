// src/services/triviaService.js
// Por ahora carga preguntas desde un JSON local (data/questions.example.json).
// Más adelante puedes reemplazar por consultas a Firestore.

import questionsExample from "../data/questions.example.json";

/**
 * Obtener preguntas mezcladas y limitadas.
 * count: número de preguntas a devolver.
 */
export function getQuestions(count = 10) {
  const shuffled = [...questionsExample].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
