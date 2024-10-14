const ButtonComponent = ({ text, onClick, style }) => {
    return (
      <button style={style} onClick={onClick}>
        {text}
      </button>
    );
  };
  
  export const BlueButtonComponent = ({ text, onClick }) => {
  const buttonStyle = {
    backgroundColor: "skyBlue",
    color: "blue",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
    return (
      <button style={buttonStyle} onClick={onClick}>
        {text}
      </button>
    );
  };
    
  export const RedButtonComponent = ({ text, onClick }) => {

  const buttonStyle = {
    backgroundColor: "red",
    color: "yellow",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

    return (
      <button style={buttonStyle} onClick={onClick}>
        {text}
      </button>
    );
  };