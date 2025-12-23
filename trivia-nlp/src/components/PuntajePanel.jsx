import React from "react";
import { useNavigate } from "react-router-dom";
import BrandHeader from "./BrandHeader";

export default function PuntajePanel() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    };

    const scores = [
        { name: "EVELYN", score: 100 },
        { name: "AIDAN", score: 90 },
        { name: "SEBASTIÁN", score: 80 },
        { name: "TAIS", score: 80 },
        { name: "KADENS", score: 50 },
        { name: "LANDER", score: 40 },
        { name: "...", score: "..." },
        { name: "...", score: "..." },
    ];

    const backArrowSvg = (
        <svg width="60" height="49" viewBox="0 0 60 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.75 1V12.25H41.25C51.053 12.25 59 20.197 59 30C59 39.803 51.053 47.75 41.25 47.75H16V42.25H41.25C48.0157 42.25 53.5 36.7657 53.5 30C53.5 23.2345 48.0157 17.75 41.25 17.75H17.75V29H15.4141L1.41406 15L15.4141 1H17.75Z" fill="white" stroke="black" strokeWidth="2" />
        </svg>
    );

    return (
        <div style={containerStyle}>
            {/* Back Arrow Button Top Left */}
            <div
                onClick={handleBack}
                style={{ position: "absolute", top: "60px", left: "60px", cursor: "pointer", zIndex: 10 }}
            >
                {backArrowSvg}
            </div>

            <div style={{ marginBottom: "20px" }}>
                <BrandHeader scale={1.2} />
            </div>

            <div style={titleBadgeStyle}>
                MEJORES PUNTAJES
            </div>

            <div style={cardStyle}>
                {/* Crown Icon */}
                <div style={{ marginBottom: "20px" }}>
                    <svg width="80" height="80" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M53.7907 32.3309L54.4019 25.8368C54.8819 20.7365 55.1219 18.1864 54.2494 17.1322C53.7774 16.5619 53.1355 16.2125 52.4494 16.1523C51.1809 16.0409 49.5878 17.8544 46.4017 21.4815C44.7539 23.3573 43.9302 24.2952 43.011 24.4405C42.5019 24.5208 41.983 24.4381 41.5126 24.2016C40.6641 23.7744 40.0982 22.615 38.9665 20.296L33.0017 8.07293C30.8633 3.69099 29.7939 1.5 28.1667 1.5C26.5395 1.5 25.4702 3.69099 23.3318 8.07296L17.3669 20.2961C16.2353 22.615 15.6694 23.7744 14.8207 24.2016C14.3505 24.4381 13.8316 24.5208 13.3224 24.4405C12.4033 24.2952 11.5794 23.3573 9.93171 21.4815C6.7456 17.8544 5.15254 16.0409 3.88403 16.1523C3.19782 16.2125 2.556 16.5619 2.08403 17.1322C1.21152 18.1864 1.45152 20.7365 1.93155 25.8368L2.54272 32.3309C3.54979 43.0312 4.05334 48.3813 7.20696 51.6072C10.3606 54.8333 15.0872 54.8333 24.5403 54.8333H31.7931C41.2462 54.8333 45.9729 54.8333 49.1265 51.6072C52.2801 48.3813 52.7835 43.0312 53.7907 32.3309Z" stroke="#FFB900" strokeWidth="3" />
                        <path d="M25.8891 29.56C26.9025 27.7422 27.4091 26.8334 28.1667 26.8334C28.9243 26.8334 29.431 27.7422 30.4443 29.56L30.7065 30.0304C30.9942 30.547 31.1382 30.8051 31.3627 30.9755C31.5873 31.1459 31.8667 31.2094 32.4259 31.3358L32.935 31.451C34.9027 31.8963 35.8867 32.1187 36.1209 32.8715C36.355 33.6243 35.6841 34.4086 34.3427 35.9774L33.9955 36.3832C33.6145 36.8288 33.4238 37.0518 33.3379 37.3275C33.2523 37.6032 33.2811 37.9006 33.3387 38.4955L33.3913 39.0368C33.5939 41.1299 33.6955 42.1763 33.0827 42.6416C32.4697 43.1067 31.5486 42.6827 29.7062 41.8344L29.2297 41.615C28.7059 41.3739 28.4443 41.2534 28.1667 41.2534C27.8891 41.2534 27.6275 41.3739 27.1038 41.615L26.6273 41.8344C24.7849 42.6827 23.8638 43.1067 23.2507 42.6416C22.638 42.1763 22.7394 41.1299 22.9422 39.0368L22.9947 38.4955C23.0523 37.9006 23.0811 37.6032 22.9955 37.3275C22.9097 37.0518 22.7191 36.8288 22.3379 36.3832L21.9908 35.9774C20.6493 34.4086 19.9786 33.6243 20.2127 32.8715C20.4467 32.1187 21.4306 31.8963 23.3985 31.451L23.9075 31.3358C24.4667 31.2094 24.7462 31.1459 24.9707 30.9755C25.1953 30.8051 25.3393 30.547 25.627 30.0304L25.8891 29.56Z" stroke="#FFB900" strokeWidth="3" />
                    </svg>
                </div>

                <div style={tableHeader}>
                    <span style={headerText}>NOMBRE DEL JUGADOR</span>
                    <div style={verticalDivider}></div>
                    <span style={headerText}>PUNTAJE</span>
                </div>

                <div style={scoresList}>
                    {scores.map((s, idx) => (
                        <div key={idx} style={scoreRow}>
                            <span style={rowText}>{s.name}</span>
                            <span style={rowText}>{s.score}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const containerStyle = {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#90063a",
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
    maxWidth: "600px",
    backgroundColor: "#d18d1f",
    borderRadius: "25px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
    border: "2px solid rgba(255,255,255,0.1)",
    position: "relative"
};

const tableHeader = {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    padding: "0 20px"
};

const headerText = {
    color: "white",
    fontSize: "1.5rem",
    fontFamily: "'Koulen', sans-serif",
    flex: 1,
    textAlign: "center"
};

const verticalDivider = {
    width: "2px",
    height: "400px",
    backgroundColor: "white",
    position: "absolute",
    left: "50%",
    top: "160px",
    transform: "translateX(-50%)"
};

const scoresList = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
};

const scoreRow = {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: "0 40px"
};

const rowText = {
    color: "white",
    fontSize: "1.2rem",
    fontFamily: "'Koulen', sans-serif",
    flex: 1,
    textAlign: "center"
};
