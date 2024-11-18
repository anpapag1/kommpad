import './components.css';

function Configurator({ value, config, onChange }) {
    const handleInputChange = (field, value) => {
        const newConfig = {
            ...config,
            [field]: value
        };
        if (onChange) { // Check if onChange is defined before calling it
            onChange(newConfig);
        } else {
            console.error("onChange prop is not defined in Configurator component.");
        }
    };

    const handleModifierChange = (modifier, checked) => {
        const newConfig = {
            ...config,
            modifiers: {
                ...config?.modifiers,
                [modifier]: checked
            }
        };
        if (onChange) { // Check if onChange is defined before calling it
            onChange(newConfig);
        } else {
            console.error("onChange prop is not defined in Configurator component.");
        }
    };

    const getKeyOptions = (type) => {
        switch(type) {
            case 'Keyboard':
                return [
                    'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
                    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                    'UP', 'DOWN', 'LEFT', 'RIGHT',
                    'INSERT', 'DELETE', 'HOME', 'END', 'PAGE_UP', 'PAGE_DOWN',
                    'NUM_LOCK', 'SCROLL_LOCK', 'CAPS_LOCK', 'PAUSE',
                    'ENTER', 'ESC', 'BACKSPACE', 'TAB', 'SPACE', 'PRINT_SCREEN'
                ];
            case 'Media':
                return ['PLAY/PAUSE', 'NEXT', 'PREV', 'VOL_UP', 'VOL_DOWN', 'MUTE'];
            case 'Mouse':
                return ['LEFT_CLICK', 'RIGHT_CLICK', 'MIDDLE_CLICK', 'SCROLL_UP', 'SCROLL_DOWN'];
            case 'System':
                return ['SLEEP', 'WAKE', 'POWER'];
            default:
                return [];
        }
    };

    return (
        <div className='configurator'>
            <div className='marg'>
                {/* title */}
                <div className='configuratorHeader'>{value}</div>
                <div className='configuratorTitle'>Action type:</div>
                <select 
                    // dropdown for action type
                    className='configuratorDD'
                    value={config?.type || ''}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                >
                    <option value='Keyboard'>Keyboard</option>
                    <option value='Media'>Media Control</option>
                    <option value='Mouse'>Mouse</option>
                    <option value='System'>System</option>
                </select>

                <div className='configuratorTitle'>Key:</div>
                <select 
                    // dropdown for key
                    className='configuratorDD'
                    value={config?.key || ''}
                    onChange={(e) => handleInputChange('key', e.target.value)}
                >
                    {getKeyOptions(config?.type).map(key => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>

                <div className='configuratorTitle'>Label:</div>
                <input 
                    type='text' 
                    className='configuratorInput'
                    value={config?.label || ''}
                    onChange={(e) => handleInputChange('label', e.target.value)}
                />

                <div className='configuratorTitle'>Modifiers:</div>
                <div className='configuratorModifiers'>
                    <label>
                        <input 
                            type='checkbox' 
                            name="ctrl"
                            checked={config?.modifiers?.ctrl || false}
                            onChange={(e) => handleModifierChange('ctrl', e.target.checked)}
                        />
                        Ctrl
                    </label>
                    <label>
                        <input 
                            type='checkbox' 
                            name="alt"
                            checked={config?.modifiers?.alt || false}
                            onChange={(e) => handleModifierChange('alt', e.target.checked)}
                        />
                        Alt
                    </label>
                    <label>
                        <input 
                            type='checkbox' 
                            name="shift"
                            checked={config?.modifiers?.shift || false}
                            onChange={(e) => handleModifierChange('shift', e.target.checked)}
                        />
                        Shift
                    </label>
                    <label>
                        <input 
                            type='checkbox' 
                            name="win"
                            checked={config?.modifiers?.win || false}
                            onChange={(e) => handleModifierChange('win', e.target.checked)}
                        />
                        Win
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Configurator;