import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Sidebar from "./sidebar.jsx";
import Settings from "./settings.jsx";
import macroData from "./code/macro.json"; // Import the JSON data

function Main() {
  const [settingsText, setSettingsText] = useState("Button Configurator");
  const [config, setConfig] = useState(macroData); // Set initial state with JSON data

  const handleButtonClick = (text) => {
    setSettingsText(text);
  };

  const handleEncoderClick = (text) => {
    setSettingsText(text);
  };

  useEffect(() => {
    // Update the state if macroData changes
    setConfig(macroData);
  }, [macroData]);

  return (
    <React.StrictMode>
      <App 
        onButtonClick={handleButtonClick} 
        onEncoderClick={handleEncoderClick} 
        config={config} // Pass the config to App
      />
      <Sidebar config={config} /> {/* Pass the config to Sidebar */}
      <Settings value={settingsText} config={config} /> {/* Pass the config to Settings */}
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);