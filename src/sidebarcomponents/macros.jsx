import "./components.css";
import { FaPaintBrush } from "react-icons/fa";

function Macros() {
    return (
        <div className="macros">
            <label className="macrosTxt"> Macros   </label>
            <div className="icon"> 
                <FaPaintBrush />
            </div>
        </div>
    );
};

export default Macros;