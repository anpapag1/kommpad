import React, { useState } from 'react';
import './sidebar.css';
import Serial from './sidebarcomponents/serial.jsx';
import Layers from './sidebarcomponents/layers.jsx';
import Macros from './sidebarcomponents/macros.jsx';
import FileOptions from './sidebarcomponents/fileoptions.jsx';
import { FaBars } from 'react-icons/fa';
import { FiLayers } from "react-icons/fi";


function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLayer, setSelectedLayer] = useState(1);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLayerClick = (number) => {
        setSelectedLayer(number);
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
                <Layers input='Media' number='1' isSelected={selectedLayer === 1} onClick={() => handleLayerClick(1)} />
                <Layers input='Apps' number='2' isSelected={selectedLayer === 2} onClick={() => handleLayerClick(2)} />
                <Layers input='Layer' number='3' isSelected={selectedLayer === 3} onClick={() => handleLayerClick(3)} />
                <Layers input='(empty)' number='4' isSelected={selectedLayer === 4} onClick={() => handleLayerClick(4)} />
                <Layers input='(empty)' number='5' isSelected={selectedLayer === 5} onClick={() => handleLayerClick(5)} />
            </div>
            <div className='down'>
                <Macros />
                <FileOptions />
            </div>
        </div>
    );
}

export default Sidebar;