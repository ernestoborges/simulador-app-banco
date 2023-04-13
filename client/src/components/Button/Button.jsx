import "./styles.css";

export function Button({ type, classe, text, click, disabled }) {
  return (
    <div className={classe ? `custom-buttom ${classe}` : "custom-buttom"}>
      <button className="main-button" type={type} onClick={click ? click : ()=>{}} disabled={disabled}>
        {text}
      </button>
    </div>
  );
}
