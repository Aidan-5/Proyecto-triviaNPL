import React from "react";
import BrainLogo from "../assets/Logo-BRAIN.svg";

export default function BrandHeader({ scale = 1.0 }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0px", transform: `scale(${scale})`, transformOrigin: "center" }}>
            <img src={BrainLogo} alt="logo brain" width="160" />
            <h1
                className="brand-title"
                style={{
                    fontFamily: "'Keania One', sans-serif",
                    fontSize: "80px",
                    color: "#FFFFFF",
                    margin: 0,
                    lineHeight: "80px",
                    WebkitTextStroke: "2px black", // Borde negro solicitado
                    textShadow: "4px 4px 0 #000", // Sombra dura para reforzar el borde
                }}
            >
                WOND
            </h1>
        </div>
    );
}
