import React, { useState } from 'react';
import './sidebar.css';
import Serial from './sidebarcomponents/serial.jsx';
import Layers from './sidebarcomponents/layers.jsx';
import Macros from './sidebarcomponents/macros.jsx';
import FileOptions from './sidebarcomponents/fileOptions.jsx';
import { FaBars } from 'react-icons/fa';
import { FiLayers } from "react-icons/fi";

function Sidebar({ config, onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState(1);
  const [layerNames, setLayerNames] = useState(config.layers.map(layer => layer.name));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLayerClick = (number) => {
    setSelectedLayer(number);
  };

  const handleLayerNameChange = (index, name) => {
    const newLayerNames = [...layerNames];
    newLayerNames[index] = name;
    setLayerNames(newLayerNames);
  };

  const handleSave = () => {
    const updatedConfig = {
      ...config,
      layers: config.layers.map((layer, index) => ({
        ...layer,
        name: layerNames[index]
      }))
    };
    onSave(updatedConfig);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
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
            isSelected={selectedLayer === index + 1} 
            onClick={() => handleLayerClick(index + 1)} 
            onNameChange={(name) => handleLayerNameChange(index, name)}
          />
        ))}
      </div>
      <div className='down'>
        <Macros />
        <FileOptions onSave={handleSave} /> {/* Pass the onSave to FileOptions */}
      </div>
    </div>
  );
}

export default Sidebar;