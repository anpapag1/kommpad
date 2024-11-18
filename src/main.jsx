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
    setConfig(prevConfig => {
      const newConfig = { ...prevConfig };
      newConfig.layers[index] = {
        ...newConfig.layers[index],
        name: name
      };
      return newConfig;
    });
  };

  const handleLayerSelect = (index) => {
    setSelectedLayer(index);
  };

  const handleConfigChange = (newConfig) => {
    setConfig(prevConfig => {
      const updatedConfig = { ...prevConfig };
      // Update the specific layer while preserving other layers
      updatedConfig.layers[selectedLayer] = {
        ...updatedConfig.layers[selectedLayer],
        ...newConfig
      };
      return updatedConfig;
    });
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
        onLayerSelect={handleLayerSelect}
        setConfig={setConfig} // Add this line
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