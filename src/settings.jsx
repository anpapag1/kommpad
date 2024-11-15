import React, { useState } from 'react';
import './settings.css';
import { TbKeyboard } from "react-icons/tb";


function Settings(text) {
    const [open, setShow] = useState(true);

    return (
        <div 
            className={`settings ${open ? 'open' : ''}`} 
            onMouseEnter={() => setShow(true)} 
            // onMouseLeave={() => setShow(false)}
        >
            <div className='settingsHeader'>
                <div className='settingsIcon'>
                    <TbKeyboard />
                </div>
                <div className='settingsTitle'>{text.value}</div>
            </div>
            <div className='border'>
                
            </div>
        </div>
    );
};

export default Settings;