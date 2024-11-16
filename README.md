# Komm.Pad

Komm.Pad is a configurable macro pad application built with React and Python. It allows users to configure buttons and encoders for various actions such as keyboard shortcuts, media controls, and more.

## Features

- Configure multiple layers of buttons and encoders
- Save and load configurations from JSON files
- Upload configurations to a connected macro pad device
- Real-time updates and feedback

## Project Structure

├── .gitignore ├── .vscode/ │ └── extensions.json ├── index.html ├── main.py ├── package.json ├── public/ ├── README.md ├── src/ │ ├── App.css │ ├── App.jsx │ ├── appcomponents/ │ │ ├── button.jsx │ │ ├── components.css │ │ └── encoder.jsx │ ├── code/ │ │ └── macro.json │ ├── main.jsx │ ├── settings.css │ ├── settings.jsx │ ├── settingscomponents/ │ │ ├── components.css │ │ └── configurator.jsx │ ├── sidebar.css │ ├── sidebar.jsx │ └── sidebarcomponents/ │ ├── components.css │ ├── fileOptions.jsx │ ├── layers.jsx │ ├── macros.jsx │ └── serial.jsx └── vite.config.js

## Getting Started

### Prerequisites

- Node.js
- Python
- Tauri CLI

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/kommpad.git
   cd kommpad
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Run the application:
   ```sh
   npm run dev
   ```

### Running the Python Backend

1. Ensure you have the required Python packages:

   ```sh
   pip install pyserial
   ```

2. Run the Python script:
   ```sh
   python main.py
   ```

## Usage

- Use the GUI to configure buttons and encoders.
- Save and load configurations using the provided buttons.
- Connect to the macro pad device and upload configurations.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
