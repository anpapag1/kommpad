import React, { useState } from 'react';
import './sidebar.css';
import Serial from './sidebarcomponents/serial.jsx';
import Layers from './sidebarcomponents/layers.jsx';
import { FaBars } from 'react-icons/fa';
import { FiLayers } from "react-icons/fi";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className='up'>
                <FaBars className='moreIcon' />
                <Serial />
            </div>
            <div className='middle'>
                <div className='layersIcon'>
                    <FiLayers />
                </div>
                <Layers input='Media' number='1' />
                <Layers input='Apps' number='2' />
                <Layers input='Layer' number='3' />
                <Layers input='(empty)' number='4' />
                <Layers input='(empty)' number='5' />
            </div>
            <div className='down'></div>
        </div>
    );
}

export default Sidebar;
