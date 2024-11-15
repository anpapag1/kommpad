import "./components.css";

function Layers({ input = "Empty", number }) {
    return (
        <div className="layer">
            <input className="textInput" defaultValue={input} />
            <button className="number">{number}</button>
        </div>
    );
}

export default Layers;