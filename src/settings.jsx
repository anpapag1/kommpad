import React, { useState } from 'react';
import Configurator from './settingscomponents/configurator.jsx';
import './settings.css';
import { TbKeyboard } from "react-icons/tb";
import { TbRotateClockwise } from "react-icons/tb";


function Settings({ value }) {
    const [open, setShow] = useState(false);

    return (
        <div 
            className={`settings ${open ? 'open' : ''}`} 
            onMouseEnter={() => setShow(true)} 
            onMouseLeave={() => setShow(false)}
        >
            <div className='settingsHeader'>
                <div className='settingsIcon'>
                    {value === "Button Configurator" ? (
                        <TbKeyboard />
                    ) : value === "Encoder Configurator" ? (
                        <TbRotateClockwise />
                    ) : null}
                </div>
                <div className='settingsTitle'>{value}</div>
            </div>
            <div className='border'>
                {value === "Button Configurator" ? (
                    <>
                    <Configurator value="Button 1"/>
                    <Configurator value="Button 2"/>
                    <Configurator value="Button 3"/>
                    <Configurator value="Button 4"/>
                    <Configurator value="Button 5"/>

                    </>
                ) : value === "Encoder Configurator" ? (
                    <>
                    <Configurator value="Clockwise"/>
                    <Configurator value="Counter-Clockwise"/>
                    <Configurator value="Press"/>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Settings;