import './components.css';

function Configurator ({value}) {
    return (
        <div className='configurator'>
            <div className='marg'>
                <div className='configuratorHeader'>{value}</div>
                <div className='configuratorTitle'>Action type:</div>
                <select className='configuratorDD'>
                    <option value='action1'>Action 1</option>
                    <option value='action2'>Action 2</option>
                    <option value='action3'>Action 3</option>
                </select>
                <div className='configuratorTitle'>Key:</div>
                <select className='configuratorDD'>
                    <option value='action1'>Action 1</option>
                    <option value='action2'>Action 2</option>
                    <option value='action3'>Action 3</option>
                </select>
                <div className='configuratorTitle'>Lable:</div>
                <input type='text' className='configuratorInput' />
                <div className='configuratorTitle'>Modifiers:</div>
                <div className='configuratorModifiers'>
                <label>
                    <input type='checkbox' name="ctrl" />
                    Ctrl
                </label>
                <label>
                    <input type='checkbox' name="alt" />
                    Alt
                </label>
                <label>
                    <input type='checkbox' name="shift" />
                    Shift
                </label>
                <label>
                    <input type='checkbox' name="Win"/>
                    Win
                </label>
                </div>
            </div>
        </div>
    );
};

export default Configurator;