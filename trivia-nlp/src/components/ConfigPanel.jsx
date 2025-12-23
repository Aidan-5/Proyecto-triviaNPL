import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandHeader from "./BrandHeader";

export default function ConfigPanel() {
    const navigate = useNavigate();

    // Load from localStorage or defaults
    const [timerEnabled, setTimerEnabled] = useState(() => {
        const saved = localStorage.getItem("timerEnabled");
        return saved === null ? true : JSON.parse(saved);
    });
    const [helpEnabled, setHelpEnabled] = useState(() => {
        const saved = localStorage.getItem("helpEnabled");
        return saved === null ? false : JSON.parse(saved);
    });

    const handleSave = () => {
        localStorage.setItem("timerEnabled", JSON.stringify(timerEnabled));
        localStorage.setItem("helpEnabled", JSON.stringify(helpEnabled));
        navigate("/");
    };

    const handleBack = () => {
        navigate("/");
    };

    // SVG ICONS provided by user
    const stopwatchSvg = (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.05881 16.6229C5.87899 10.0457 11.4898 4.9562 18.2892 4.9562C25.6532 4.9562 31.6229 10.9257 31.6229 18.2895C31.6229 25.6534 25.6532 31.6229 18.2892 31.6229H9.95638M18.2899 18.2895V11.6229M14.9565 1.62286H21.6233M1.62286 21.6229H9.95638M4.95627 26.6229H13.2898" stroke="white" strokeWidth="3.24571" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const phoneSvg = (
        <svg width="34" height="34" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.8785 32.0774L33.6133 33.4092C33.6133 33.4092 30.606 36.5753 22.3977 27.9333C14.1894 19.2915 17.1966 16.1255 17.1966 16.1255L17.9933 15.2867C19.9561 13.2204 20.1411 9.90294 18.4286 7.48108L14.9259 2.52695C12.8066 -0.470591 8.71123 -0.866562 6.28204 1.69092L1.92204 6.28119C0.717544 7.54931 -0.0896219 9.19317 0.00826691 11.0168C0.258683 15.6821 2.25221 25.72 13.3762 37.4315C25.1727 49.851 36.2413 50.3445 40.7677 49.8977C42.1994 49.7565 43.4444 48.9845 44.4477 47.928L48.3938 43.7739C51.0574 40.9695 50.3063 36.1618 46.8983 34.2003L41.5913 31.1456C39.3535 29.8577 36.6274 30.2359 34.8785 32.0774Z" fill="white" />
        </svg>
    );

    return (
        <div style={containerStyle}>

            <div style={{ marginBottom: "20px" }}>
                <BrandHeader scale={1.2} />
            </div>

            <div style={titleBadgeStyle}>
                CONFIGURACON DEL JUEGO
            </div>

            <div style={cardStyle}>
                <div style={rowWrapper}>
                    {/* ROW 1: TEMPORIZADOR */}
                    <div style={optionBox}>
                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            {stopwatchSvg}
                            <span style={labelStyle}>TEMPORIZADOR</span>
                        </div>
                        <Switch active={timerEnabled} onChange={() => setTimerEnabled(!timerEnabled)} />
                    </div>

                    {/* ROW 2: MOSTRAR AYUDA */}
                    <div style={optionBox}>
                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            {phoneSvg}
                            <span style={labelStyle}>MOSTRAR AYUDA</span>
                        </div>
                        <Switch active={helpEnabled} onChange={() => setHelpEnabled(!helpEnabled)} />
                    </div>
                </div>

                <div style={divider}></div>

                {/* BUTTONS */}
                <div style={{ display: "flex", gap: "40px", marginTop: "10px" }}>
                    <button style={btnBack} onClick={handleBack}>VOLVER</button>
                    <button style={btnSave} onClick={handleSave}>GUARDAR</button>
                </div>
            </div>
        </div>
    );
}

// Simple Switch Component
function Switch({ active, onChange }) {
    return (
        <div
            onClick={onChange}
            style={{
                width: "60px",
                height: "32px",
                backgroundColor: active ? "#2e7d32" : "#424242",
                borderRadius: "20px",
                padding: "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: active ? "flex-end" : "flex-start",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "2px solid white"
            }}
        >
            <div style={{
                width: "24px",
                height: "24px",
                backgroundColor: "white",
                borderRadius: "50%",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }} />
        </div>
    );
}

const containerStyle = {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#90063a", // Original Maroon
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    position: "relative",
    boxSizing: "border-box",
    fontFamily: "'Koulen', sans-serif"
};

const titleBadgeStyle = {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: "12px 40px",
    borderRadius: "30px",
    color: "white",
    fontSize: "1.4rem",
    letterSpacing: "2px",
    fontWeight: "normal",
    marginBottom: "40px",
    textTransform: "uppercase",
    fontFamily: "'Koulen', sans-serif"
};

const cardStyle = {
    width: "100%",
    maxWidth: "900px",
    backgroundColor: "#d18d1f", // Golden brown from image
    borderRadius: "25px",
    padding: "60px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
    border: "2px solid rgba(255,255,255,0.1)"
};

const rowWrapper = {
    display: "flex",
    width: "100%",
    gap: "40px",
    marginBottom: "50px",
    flexWrap: "wrap",
    justifyContent: "center"
};

const optionBox = {
    flex: "1 1 350px",
    maxWidth: "400px",
    border: "3px solid white",
    borderRadius: "25px",
    padding: "20px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)"
};

const labelStyle = {
    color: "white",
    fontSize: "1.3rem",
    fontWeight: "normal",
    fontFamily: "'Koulen', sans-serif"
};

const divider = {
    width: "60%",
    height: "2px",
    backgroundColor: "rgba(255,255,255,0.4)",
    marginBottom: "40px"
};

const btnBack = {
    padding: "15px 60px",
    borderRadius: "12px",
    border: "3px solid white",
    backgroundColor: "transparent",
    color: "white",
    fontWeight: "normal",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "transform 0.1s",
    minWidth: "180px",
    fontFamily: "'Koulen', sans-serif"
};

const btnSave = {
    padding: "15px 60px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#edb400", // Bright yellow/gold
    color: "#90063a",
    fontWeight: "normal",
    fontSize: "1.2rem",
    cursor: "pointer",
    boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
    transition: "transform 0.1s",
    minWidth: "180px",
    fontFamily: "'Koulen', sans-serif"
};
