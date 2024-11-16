import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Sidebar from "./sidebar.jsx";
import Settings from "./settings.jsx";

function Main() {
  const [settingsText, setSettingsText] = useState("Button Configurator");

  const handleButtonClick = (text) => {
    setSettingsText(text);
  };

  const handleEncoderClick = (text) => {
    setSettingsText(text);
  };

  return (
    <React.StrictMode>
      <App onButtonClick={handleButtonClick} onEncoderClick={handleEncoderClick} />
      <Sidebar />
      <Settings value={settingsText} />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);