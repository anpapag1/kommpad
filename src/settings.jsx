import React, { useState } from 'react';
import Configurator from './settingscomponents/configurator.jsx';
import './settings.css';
import { TbKeyboard } from "react-icons/tb";
import { TbRotateClockwise } from "react-icons/tb";


function Settings({ value, config, onConfigChange }) {
    const [open, setShow] = useState(false);

    return (
        <div 
            className={`settings ${open ? 'open' : ''}`} 
            onMouseEnter={() => setShow(true)} 
            onMouseLeave={() => setShow(false)}
        >
            <div className='settingsHeader'>
                <div className='settingsIcon'>
                    { value === "Encoder Configurator" ? (
                        <TbRotateClockwise />
                    ) : <TbKeyboard />}
                </div>
                <div className='settingsTitle'>{value}</div>
            </div>
            <div className='border'>
                {value === "Encoder Configurator" ? (
                    <>
                    <Configurator 
                        value="Clockwise" 
                        config={config?.encoder[0]}
                        onChange={(newConfig) => {
                            const updatedConfig = {...config};
                            updatedConfig.encoder[0] = newConfig;
                            onConfigChange(updatedConfig);
                        }}
                    />
                    <Configurator 
                        value="Counter-Clockwise" 
                        config={config?.encoder[1]}
                        onChange={(newConfig) => {
                            const updatedConfig = {...config};
                            updatedConfig.encoder[1] = newConfig;
                            onConfigChange(updatedConfig);
                        }}
                    />
                    <Configurator 
                        value="Press" 
                        config={config?.encoder[2]}
                        onChange={(newConfig) => {
                            const updatedConfig = {...config};
                            updatedConfig.encoder[2] = newConfig;
                            onConfigChange(updatedConfig);
                        }}
                    />
                    </>
                ) : value === "Button Configurator" ? (
                    <>
                    <Configurator 
                        value="Button 1" 
                        config={config?.buttons[0]}
                        onChange={(newConfig) => {
                            const updatedConfig = {...config};
                            updatedConfig.buttons[0] = newConfig;
                            onConfigChange(updatedConfig);
                        }}
                    />
                    <Configurator 
                        value="Button 2" 
                        config={config?.buttons[1]}
                        onChange={(newConfig) => {
                            const updatedConfig = {...config};
                            updatedConfig.buttons[1] = newConfig;
                            onConfigChange(updatedConfig);
                        }}
                    />
                    <Configurator 
                        value="Button 3" 
                        config={config?.buttons[2]}
                        onChange={(newConfig) => {
                            const updatedConfig = {...config};
                            updatedConfig.buttons[2] = newConfig;
                            onConfigChange(updatedConfig);
                        }}
                    />
                    <Configurator 
                        value="Button 4" 
                        config={config?.buttons[3]}
                        onChange={(newConfig) => {
                            const updatedConfig = {...config};
                            updatedConfig.buttons[3] = newConfig;
                            onConfigChange(updatedConfig);
                        }}
                    />
                    <Configurator 
                        value="Button 5" 
                        config={config?.buttons[4]}
                        onChange={(newConfig) => {
                            const updatedConfig = {...config};
                            updatedConfig.buttons[4] = newConfig;
                            onConfigChange(updatedConfig);
                        }}
                    />
                    </>
                ) : null
                }
            </div>
        </div>
    );
};

export default Settings;