import './components.css';
import { BiExport, BiImport, BiSave, BiCloudUpload } from "react-icons/bi";

function FileOptions({ onSave, config, onConfigUpdate }) {
    const handleExport = () => {
        const jsonString = JSON.stringify(config, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'kommpad-config.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    // Log the raw file content
                    console.log('Raw file content:', e.target.result);
                    
                    const importedConfig = JSON.parse(e.target.result);
                    
                    // Validate imported config structure
                    if (!importedConfig || typeof importedConfig !== 'object') {
                        throw new Error('Invalid config format');
                    }
    
                    // Log the parsed config
                    console.log('Parsed config:', importedConfig);
                    
                    onConfigUpdate(importedConfig);
                } catch (error) {
                    console.error('Import error details:', error);
                    alert(`Import failed: ${error.message}`);
                }
            };
            reader.onerror = (error) => {
                console.error('File reading error:', error);
                alert('Error reading file');
            };
            reader.readAsText(file);
        }
    };


    return (
        <div className="file-options">
            <button className="file-option-button" title="Export to PC" onClick={handleExport}>
                <BiExport />
            </button>
            <input
                type="file"
                id="import-json"
                accept=".json"
                style={{ display: 'none' }}
                onChange={handleImport}
            />
            <button 
                className="file-option-button" 
                title="Import from PC"
                onClick={() => document.getElementById('import-json').click()}
            >
                <BiImport />
            </button>
            <button className="file-option-button" title="Save" onClick={onSave}>
                <BiSave />
            </button>
            <button className="file-option-button" title="Upload to device">
                <BiCloudUpload />
            </button>
        </div>
    );
}

export default FileOptions;