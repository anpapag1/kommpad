import React, { useState } from "react";
import "./App.css";
import Button from "./appcomponents/button.jsx";
import Encoder from "./appcomponents/encoder.jsx";

function App({ onButtonClick, onEncoderClick }) {
  return (
    <main className="container">
      <h1 className="text">KOMM.PAD</h1>
      <div className="box">
        <div className="buttonMatrix">
          <Button value="PREV" onClick={() => onButtonClick("Button Configurator")} />
          <Button value="NEXT" onClick={() => onButtonClick("Button Configurator")} />
          <Button value="PLAY PAUSE" onClick={() => onButtonClick("Button Configurator")} />
          <Button value="SPKER" onClick={() => onButtonClick("Button Configurator")} />
          <Button value="HD/NES" onClick={() => onButtonClick("Button Configurator")} />
          <Button value="LAYER CHANGE" onClick={() => onButtonClick("Button Configurator")} />
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