import React, { useState } from 'react';
import './sidebar.css';
import Serial from './sidebarcomponents/serial.jsx';
import Layers from './sidebarcomponents/layers.jsx';
import Macros from './sidebarcomponents/macros.jsx';
import FileOptions from './sidebarcomponents/fileoptions.jsx';
import { FaBars } from 'react-icons/fa';
import { FiLayers } from "react-icons/fi";

function Sidebar({ config, onSave, onLayerNameChange, onLayerSelect }) {
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
        onLayerSelect(firstNonEmptyLayer); // Notify Main about the selected layer
      }
    } else {
      setSelectedLayer(index);
      onLayerSelect(index); // Notify Main about the selected layer
    }
  };

  const handleLayerNameChangeLocal = (index, name) => {
    const newLayerNames = [...layerNames];
    newLayerNames[index] = name;
    setLayerNames(newLayerNames);
    onLayerNameChange(index, name); // Update the config in Main
  };

  const handleSelectedDisable = () => {
    const availableLayerIndex = layerNames.findIndex(name => name !== '(empty)');
    if (availableLayerIndex !== -1) {
      setSelectedLayer(availableLayerIndex);
      onLayerSelect(availableLayerIndex); // Notify Main about the selected layer
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
            input={layerNames[index]} 
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
        <FileOptions onSave={onSave} />
      </div>
    </div>
  );
}

export default Sidebar;