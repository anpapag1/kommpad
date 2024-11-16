import "./components.css";

function Button(props) {
  return (
    <div className="buttons" onClick={props.onClick}>
      {props.value}
    </div>
  );
}

export default Button;