import "./components.css";
import { AiOutlineCheckCircle } from 'react-icons/ai'; // Corrected import
import { TiRefresh } from "react-icons/ti";

function Serial() {
    return (
        <div className="serial">

            <div className="column1">
                <text className="serialText">connect to serial:</text>
                <select className="dropdown">
                    <option value="port1">COM1</option>
                    <option value="port2">COM2</option>
                    <option value="port3">COM3</option>
                    <option value="port4">COM4</option>
                </select>
                <button className="refresh">
                    <text className="refreshText">refresh</text>
                    <TiRefresh className="refreshIcon" />
                </button>
            </div>


            <div className="column2">
                <AiOutlineCheckCircle className="check" />
            </div>
        </div>
    );
}

export default Serial;