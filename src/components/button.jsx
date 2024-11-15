import "./components.css";

function Button(props) {
    return (
        <div className="buttons">{props.value}</div>
    );
}

export default Button;