import './components.css';
import { BiExport } from "react-icons/bi";
import { BiImport } from "react-icons/bi";
import { BiReset } from "react-icons/bi";
import { BiCloudUpload } from "react-icons/bi";





function FileOptions() {
    return (
        <div className="file-options">
            <button className="file-option-button" title="Export to PC">
                <BiExport />
            </button>
            <button className="file-option-button" title="Import from PC">
                <BiImport />
            </button>
            <button className="file-option-button" title="Reset to defauls">
                <BiReset />
            </button>
            <button className="file-option-button" title="Upload to device">
                <BiCloudUpload />
            </button>
        </div>
    );
}

export default FileOptions;