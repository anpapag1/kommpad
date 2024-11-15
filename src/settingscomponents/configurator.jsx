import './components.css';

function Configurator () {
    return (
        <div className='configurator'>
            <div className='configuratorHeader'>Button 1</div>
            <div className='configuratorTitle'>Action type:</div>
            <select className='configuratorDD'>
                <option value='action1'>Action 1</option>
                <option value='action2'>Action 2</option>
                <option value='action3'>Action 3</option>
            </select>
            <div className='configuratorTitle'>Key:</div>
            <input type='text' className='configuratorInput' />
            <div className='configuratorTitle'>Lable:</div>
            <input type='text' className='configuratorInput' />
            <div className='configuratorTitle'>Modifiers:</div>
        </div>
    );
};

export default Configurator;