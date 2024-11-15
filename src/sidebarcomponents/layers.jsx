import "./components.css";

function Layers({ input = "Empty", number, isSelected, onClick }) {
    return (
        <div className="layer" onClick={onClick}>
            <div className="column1">
                <input className="textInput" defaultValue={input} />
            </div>
            <div className="column2">
                <button className={`number ${isSelected ? 'selected' : ''}`}>{number}</button>
            </div>
        </div>
    );
}

export default Layers;