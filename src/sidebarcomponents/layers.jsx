import React, { useState, useEffect } from "react";
import "./components.css";

function Layers({ input = "Empty", number, isSelected, onClick }) {
  const [text, setText] = useState(input);
  const [buttonClass, setButtonClass] = useState(isSelected ? 'selected' : '');

  useEffect(() => {
    setButtonClass(isSelected ? "selected" :  "");
  }, [isSelected]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    if (text.trim() === "") {
      setText("(empty)");
    }
  };

  return (
    <div className="layer">
      <div className="column1">
        <input 
          className="textInput" 
          value={text} 
          onChange={handleInputChange} 
          onBlur={handleBlur}
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