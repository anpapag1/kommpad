import React, { useState, useEffect } from "react";
import "./components.css";

function Layers({ input = "Empty", number, isSelected, onClick }) {
    const [text, setText] = useState(input);
    const [buttonClass, setButtonClass] = useState(isSelected ? 'selected' : '');

    useEffect(() => {
        if (text.trim() === "") {
            setText("(empty)");
        } else {
            setButtonClass(isSelected ? "selected" :  "");
        }
    }, [text, isSelected]);

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="layer" >
            <div className="column1">
                <input 
                    className="textInput" 
                    value={text} 
                    onChange={handleInputChange} 
                />
            </div>
            <div className="column2">
                <button 
                    className={`number ${buttonClass}`} 
                    disabled={text === "(empty)"} 
                    onClick={onClick}
                >
                    {number}
                </button>
            </div>
        </div>
    );
}

export default Layers;