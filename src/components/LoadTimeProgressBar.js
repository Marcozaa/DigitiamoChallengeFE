import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const LoadTimeProgressBar = ({ loadTime }) => {
  const [percentage, setPercentage] = useState(0); // Percentuale per la barra
  const [color, setColor] = useState("#00FF00"); // Colore iniziale (verde)

  useEffect(() => {
    // Calcola una percentuale su base 5 secondi
    const progressPercentage = Math.min((loadTime / 5) * 100, 100); // massimo 100%
    setPercentage(progressPercentage);

    // Cambia colore in base al tempo di caricamento
    if (loadTime < 2) {
      setColor("#00FF00"); // Verde: veloce
    } else if (loadTime >= 2 && loadTime < 4) {
      setColor("#FFD700"); // Giallo: medio
    } else {
      setColor("#FF4500"); // Rosso: lento
    }
  }, [loadTime]); // Esegui quando cambia il valore di loadTime

  return (
    <div style={{ width: "200px", height: "200px", margin: "auto" }}>
      <CircularProgressbar
        value={percentage}
        text={`${loadTime}s`} // Mostra il tempo di caricamento con 2 decimali
        styles={buildStyles({
          pathColor: color, // Cambia il colore dinamicamente
          textColor: "#000",
          trailColor: "#d6d6d6",
        })}
      />
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Tempo di caricamento: {loadTime} secondi
      </p>
    </div>
  );
};

export default LoadTimeProgressBar;
