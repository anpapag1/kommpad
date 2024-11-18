import React from "react";
import "./App.css";
import Button from "./appcomponents/button.jsx";
import Encoder from "./appcomponents/encoder.jsx";

function App({ onButtonClick, onEncoderClick, config }) {
  return (
    <main className="container">
      <h1 className="text">KOMM.PAD</h1>
      <div className="box">
        <div className="buttonMatrix">
          {config.buttons.map((button, index) => (
            <Button 
              key={index} 
              value={button.label} 
              onClick={() => onButtonClick(button.label)} 
            />
          ))}
        </div>
        <div className="encoderDisplay">
          <Encoder onClick={() => onEncoderClick("Encoder Configurator")} />
          <div className="disp"></div>
        </div>
      </div>
    </main>
  );
}

export default App;