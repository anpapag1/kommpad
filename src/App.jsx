import "./App.css";
import Button from "./appcomponents/button.jsx";
import Encoder from "./appcomponents/encoder.jsx";

function App() {

  return (
    <main className="container">
      <h1 className="text">KOMM.PAD</h1>
      <div className="box">
        <div className="buttonMatrix">
          <Button value="PREV" />
          <Button value="NEXT" />
          <Button value="PLAY PAUSE" />
          <Button value="SPKER" />
          <Button value="HD/NES" />
          <Button value="LAYER CHANGE" />
        </div>
        <div className="encoderDisplay">
          <Encoder />
          <div className="disp"></div>
        </div>
      </div>
    </main>
  );
}

export default App;
