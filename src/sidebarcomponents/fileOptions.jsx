import './components.css';
import { BiExport } from "react-icons/bi";
import { BiImport } from "react-icons/bi";
import { BiSave } from "react-icons/bi";
import { BiCloudUpload } from "react-icons/bi";





function FileOptions({ onSave }) {
    return (
        <div className="file-options">
            <button className="file-option-button" title="Export to PC">
                <BiExport />
            </button>
            <button className="file-option-button" title="Import from PC">
                <BiImport />
            </button>
            <button className="file-option-button" title="Save config" onClick={onSave}>
                <BiSave />
            </button>
            <button className="file-option-button" title="Upload to device">
                <BiCloudUpload />
            </button>
        </div>
    );
}

export default FileOptions;