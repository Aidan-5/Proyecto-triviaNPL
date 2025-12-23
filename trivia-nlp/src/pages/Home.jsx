import React from "react";
import { useNavigate } from "react-router-dom";
import BrainLogo from "../assets/Logo-BRAIN.svg";
import BrandHeader from "../components/BrandHeader";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#90063a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      {/* LOGO + TEXTO WOND */}
      <BrandHeader />

      {/* CONTENEDOR DE MODOS */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* === 1 JUGADOR === */}
        <div
          style={{ ...cardStyle, cursor: "pointer" }}
          onClick={() => navigate("/setup", { state: { mode: "single" } })}
        >
          <div style={iconBox}>
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 21 21'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' d='M10.5 2.5a3 3 0 0 1 3 3v2a3 3 0 1 1-6 0v-2a3 3 0 0 1 3-3m7 14v-.728c0-3.187-3.686-5.272-7-5.272s-7 2.085-7 5.272v.728a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1'/%3E%3C/svg%3E"
              alt="single player icon"
              width="45"
            />
          </div>

          <h2 style={{ color: "#90063a", marginTop: "10px", fontSize: "1.8rem", fontFamily: "'Koulen', sans-serif" }}>1 Jugador</h2>
          <p style={{ textAlign: "center", padding: "0 12px", fontFamily: "'Koulen', sans-serif" }}>
            Modo individual. Responde hasta fallar.
          </p>
        </div>

        {/* === 2 JUGADORES === */}
        <div
          style={{ ...cardStyle, cursor: "pointer" }}
          onClick={() => navigate("/setup", { state: { mode: "multi" } })}
        >
          <div style={iconBox}>
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 21 21'%3E%3Cg fill='none' fill-rule='evenodd' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M8.5 2.5a3 3 0 0 1 3 3v2a3 3 0 1 1-6 0v-2a3 3 0 0 1 3-3m7 14v-.728c0-3.187-3.686-5.272-7-5.272s-7 2.085-7 5.272v.728a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1'/%3E%3Cpath fill='currentColor' d='M12.52 2.678A3 3 0 0 1 14.5 5.5v1c0 1.297-.848 2.581-2 3q1.01-1.379 1.01-3.5c0-2.122-.331-2.523-.99-3.322M17.5 17.5h1a1 1 0 0 0 1-1v-.728c0-2.17-1.71-3.83-3.847-4.667c0 0 2.847 2.395 1.847 6.395'/%3E%3C/g%3E%3C/svg%3E"
              alt="users"
              width="45"
            />
          </div>

          <h2 style={{ color: "#90063a", marginTop: "10px", fontSize: "1.8rem", fontFamily: "'Koulen', sans-serif" }}>2 Jugadores</h2>
          <p style={{ textAlign: "center", padding: "0 12px", fontFamily: "'Koulen', sans-serif" }}>
            Modo por turnos. Eliminación individual.
          </p>
        </div>
      </div>

      {/* ICONO GRANDE CENTRADO-Configuracion */}
      <div style={{ marginTop: "80px", display: "flex", gap: "20px", justifyContent: "center" }}>
        {/* Config Icon - Ajustes */}
        <div
          onClick={() => navigate("/config")}
          style={{ cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "150px", height: "50px" }}
          >
            <path
              d="M7.5 37.9032H4.83871C2.17742 37.9032 0 40.2419 0 42.9032V57.4194C0 60.1613 2.17742 62.0968 4.83871 62.0968H7.58065C11.9355 62.0968 14.5968 68.4677 11.4516 71.6129L9.67742 73.3871C7.74194 75.2419 7.74194 78.3871 9.67742 80.2419L19.8387 90.4839C21.6935 92.3387 24.7581 92.3387 26.6935 90.4839L29.6774 87.5C32.7419 84.4355 37.9032 86.6129 37.9032 90.9677V95.3226C37.9032 97.9839 40.0806 100 42.7419 100H57.2581C59.9194 100 62.0968 98.0645 62.0968 95.3226V90.9677C62.0968 86.6936 67.3387 84.5161 70.3226 87.5806L73.3064 90.5645C75.1613 92.4194 78.2258 92.4194 80.1613 90.5645L90.3226 80.4032C92.2581 78.4677 92.1774 75.4032 90.3226 73.5484L88.5484 71.6936C85.4032 68.629 88.0645 62.1774 92.4194 62.1774H95.1613C97.8226 62.1774 100 60.2427 100 57.5V42.9839C100 40.3226 97.8226 37.9839 95.1613 37.9839H92.5C88.1452 37.9839 85.4032 31.4516 88.4677 28.3871L90.4024 26.5323C92.2581 24.6774 92.2581 21.6129 90.4024 19.7581L80.2419 9.59677C78.3064 7.66129 75.2419 7.74194 73.3871 9.59677L71.4516 11.2903C68.3871 14.4355 62.0968 11.8548 62.0968 7.41935V5C62.0968 2.33871 59.9194 0 57.2581 0H42.7419C40.0806 0 37.9032 2.33871 37.9032 5V7.41935C37.9032 11.8548 31.6129 14.4355 28.5484 11.2903L26.6935 9.43548C24.8387 7.5 21.6935 7.5 19.8387 9.43548L9.59677 19.6774C7.74194 21.5323 7.74194 24.5968 9.59677 26.5323L11.5323 28.3064C14.5968 31.371 11.8548 37.9032 7.5 37.9032ZM50.1613 30.8065C60.8871 30.8065 69.5161 39.4355 69.5161 50.1613C69.5161 60.8871 60.8871 69.5161 50.1613 69.5161C39.4355 69.5161 30.8065 60.8871 30.8065 50.1613C30.8065 39.4355 39.5161 30.8065 50.1613 30.8065Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Trophy Icon - Mejores Jugadores */}
        <div
          onClick={() => navigate("/scores")}
          style={{ cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "150px", height: "50px" }}
          >
            <path
              d="M100 29.6978V30.0474C100 34.1955 100 36.2696 98.964 37.9665C97.928 39.6634 96.047 40.6706 92.285 42.6851L88.3185 44.8094C91.0515 35.9026 91.9635 26.333 92.301 18.149C92.315 17.7982 92.3315 17.4429 92.348 17.084L92.3595 16.8325C95.616 17.9225 97.444 18.7351 98.5845 20.2604C100.001 22.1536 100.001 24.6684 100 29.6978Z"
              fill="white"
            />
            <path
              d="M3.0567e-06 29.698V30.0475C0.000153057 34.1956 0.000203476 36.2697 1.03616 37.9667C2.07211 39.6636 3.95317 40.6708 7.71529 42.6852L11.6841 44.8105C8.9504 35.9036 8.03839 26.3335 7.70129 18.1492C7.68684 17.7983 7.67054 17.4431 7.65409 17.0841L7.64254 16.832C4.38508 17.9223 2.55632 18.735 1.41551 20.2606C-0.000197441 22.1538 -0.000146944 24.6685 3.0567e-06 29.698Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M71.8858 1.67104C66.2657 0.75706 58.9187 0 50.0012 0C41.0831 0 33.7363 0.75706 28.116 1.67104C22.4223 2.59696 19.5754 3.05995 17.1969 5.88352C14.8182 8.70713 14.9439 11.7589 15.1953 17.8625C16.0584 38.8164 20.7498 64.9884 46.2501 67.3046V84.3373H39.0991C36.7157 84.3373 34.6636 85.959 34.1962 88.2116L33.2501 92.7711H20C17.929 92.7711 16.25 94.3894 16.25 96.3855C16.25 98.3817 17.929 100 20 100H80.0003C82.0713 100 83.7503 98.3817 83.7503 96.3855C83.7503 94.3894 82.0713 92.7711 80.0003 92.7711H66.7502L65.8042 88.2116C65.3367 85.959 63.2847 84.3373 60.9012 84.3373H53.7502V67.3046C79.2518 64.9894 83.9433 38.8169 84.8063 17.8625C85.0578 11.7589 85.1838 8.70713 82.8048 5.88352C80.4263 3.05995 77.5798 2.59696 71.8858 1.67104Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* === ESTILOS === */
const cardStyle = {
  width: "320px",
  height: "180px",
  backgroundColor: "#daa520",
  borderRadius: "15px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.5)", // Stronger shadow
  padding: "30px", // More padding
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.2s",
};

const iconBox = {
  width: "60px",
  height: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
