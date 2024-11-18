import React, { useState } from 'react';
import './sidebar.css';
import Serial from './sidebarcomponents/serial.jsx';
import Layers from './sidebarcomponents/layers.jsx';
import Macros from './sidebarcomponents/macros.jsx';
import FileOptions from './sidebarcomponents/fileoptions.jsx';
import { FaBars } from 'react-icons/fa';
import { FiLayers } from "react-icons/fi";

function Sidebar({ config, onSave, onLayerNameChange, onLayerSelect, setConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [layerNames, setLayerNames] = useState(config.layers.map(layer => layer.name));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLayerClick = (index) => {
    if (layerNames[index] === "(empty)") {
      const firstNonEmptyLayer = layerNames.findIndex(name => name !== "(empty)");
      if (firstNonEmptyLayer !== -1) {
        setSelectedLayer(firstNonEmptyLayer);
        onLayerSelect(firstNonEmptyLayer);
      }
    } else {
      setSelectedLayer(index);
      onLayerSelect(index);
    }
  };

  const handleLayerNameChangeLocal = (index, name) => {
    setConfig(prevConfig => {
      const newConfig = { ...prevConfig };
      newConfig.layers[index] = {
        ...newConfig.layers[index],
        name: name
      };
      return newConfig;
    });
    onLayerNameChange(index, name);
  };

  const handleSelectedDisable = () => {
    const availableLayerIndex = layerNames.findIndex(name => name !== '(empty)');
    if (availableLayerIndex !== -1) {
      setSelectedLayer(availableLayerIndex);
      onLayerSelect(availableLayerIndex);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div 
      className={`sidebar ${isOpen ? 'open' : ''}`} 
      onMouseLeave={handleMouseLeave}
    >
      <div className='up'>
        <FaBars className='moreIcon' onClick={toggleSidebar} />
        <Serial />
      </div>
      <div className='middle'>
        <div className='layersIcon'>
          <FiLayers />
        </div>
        {config.layers.map((layer, index) => (
          <Layers 
            key={index}
            input={layer.name}
            number={index + 1}
            isSelected={selectedLayer === index}
            onClick={() => handleLayerClick(index)}
            onNameChange={(name) => handleLayerNameChangeLocal(index, name)}
            onDisable={handleSelectedDisable}
          />
        ))}
      </div>
      <div className='down'>
        <Macros />
        <FileOptions 
          onSave={onSave}
          config={config}
          onConfigUpdate={setConfig}
        />
      </div>
    </div>
  );
}

export default Sidebar;