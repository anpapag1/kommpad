import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Sidebar from "./sidebar.jsx";
import Settings from "./settings.jsx";
import macroData from "./code/macro.json";
import fs from 'fs';
import Button from "./appcomponents/button.jsx";

function Main() {
  const [settingsText, setSettingsText] = useState("Button Configurator");
  const [config, setConfig] = useState(macroData);
  const [selectedLayer, setSelectedLayer] = useState(0); // Track the selected layer

  const handleButtonClick = (text) => {
    setSettingsText(buttonConfigurator);
  };

  const handleEncoderClick = (text) => {
    setSettingsText(text);
  };

  const handleSave = () => {
    fs.writeFile('./src/code/macro.json', JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.error('Error saving configuration:', err);
      } else {
        console.log('Configuration saved successfully!');
      }
    });
  };

  const handleLayerNameChange = (index, name) => {
    const newConfig = { ...config };
    newConfig.layers[index].name = name;
    setConfig(newConfig);
  };

  const handleLayerSelect = (index) => {
    setSelectedLayer(index);
  };

  const handleConfigChange = (newConfig) => {
    const updatedConfig = { ...config };
    // Update the current layer's configuration
    updatedConfig.layers[selectedLayer] = newConfig;
    setConfig(updatedConfig);
  };
  
  useEffect(() => {
    setConfig(macroData);
  }, [macroData]);

  return (
    <React.StrictMode>
      <App 
        onButtonClick={handleButtonClick} 
        onEncoderClick={handleEncoderClick} 
        config={config.layers[selectedLayer]} // Pass the selected layer's config
      />
      <Sidebar 
        config={config} 
        onSave={handleSave} 
        onLayerNameChange={handleLayerNameChange} 
        onLayerSelect={handleLayerSelect} // Pass the layer select handler
      />
      <Settings 
        value={settingsText} 
        config={config.layers[selectedLayer]} // Pass the selected layer's config
        onConfigChange={handleConfigChange} // Handle config changes
      />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);