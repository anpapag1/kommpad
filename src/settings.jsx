import React, { useState } from 'react';
import Configurator from './settingscomponents/configurator.jsx';
import './settings.css';
import { TbKeyboard } from "react-icons/tb";


function Settings(text) {
    const [open, setShow] = useState(false);

    return (
        <div 
            className={`settings ${open ? 'open' : ''}`} 
            onMouseEnter={() => setShow(true)} 
            onMouseLeave={() => setShow(false)}
        >
            <div className='settingsHeader'>
                <div className='settingsIcon'>
                    <TbKeyboard />
                </div>
                <div className='settingsTitle'>{text.value}</div>
            </div>
            <div className='border'>
                <Configurator />
                <Configurator />
                <Configurator />
                <Configurator />
                <Configurator />
                
            </div>
        </div>
    );
};

export default Settings;