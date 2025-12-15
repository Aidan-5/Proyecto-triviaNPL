import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Pega aquí tu config de la consola
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  // ... resto de campos
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);  // Instancia de Firestore