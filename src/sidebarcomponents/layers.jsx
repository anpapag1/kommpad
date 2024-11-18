import React, { useState, useEffect } from "react";
import "./components.css";

function Layers({ input = "Empty", number, isSelected, onClick, onNameChange, onDisable }) {
  const [text, setText] = useState(input);
  const [buttonClass, setButtonClass] = useState(isSelected ? 'selected' : '');

  useEffect(() => {
    if (isSelected) {
      setButtonClass("selected");
    } else if (!isSelected && text !== "(empty)") {
      setButtonClass("notSelected");
    } else {
      setButtonClass("");
    }
  }, [isSelected, text]);

  const handleInputChange = (e) => {
    setText(e.target.value);
    onNameChange(e.target.value); // Notify parent about the change
  };

  const handleBlur = () => {
    if (text.trim() === "") {
      setText("(empty)");
      onNameChange("(empty)"); // Notify parent about the change
      onDisable(); // Notify parent about the disable
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