// src/utils/nlp.js
import stringSimilarity from "string-similarity";

export function normalize(text = "") {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .trim();
}

/**
 * Comprueba si la respuesta del usuario es correcta comparando
 * la cadena normalizada con la correcta mediante similitud.
 * threshold: valor entre 0 y 1 (ej: 0.65)
 */
export function isAnswerCorrect(userAnswer, correctAnswer, threshold = 0.65) {
  const ua = normalize(userAnswer);
  const ca = normalize(correctAnswer);
  if (!ua || !ca) return false;
  const score = stringSimilarity.compareTwoStrings(ua, ca);
  return score >= threshold;
}
