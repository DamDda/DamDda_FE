const ButtonComponent = ({ text, onClick, style }) => {
    return (
      <button style={style} onClick={onClick}>
        {text}
      </button>
    );
  };
  
  export const BlueButtonComponent = ({ text, onClick }) => {
  const buttonStyle = {
    backgroundColor: "#677cf9",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color:"#ffffff",

  };
    return (
      <button style={buttonStyle} onClick={onClick}>
        {text}
      </button>
    );
  };

    
  export const BlueBorderButtonComponent = ({ text, onClick }) => {
    const buttonStyle = {
      backgroundColor: "transparent", // 배경 투명
      padding: "10px 20px",
      border: "2px solid #677cf9", // 테두리 설정
      borderRadius: "5px",
      cursor: "pointer",
      color:"#2d2736",
  
    };
      return (
        <button style={buttonStyle} onClick={onClick}>
          {text}
        </button>
      );
    };
    
  export const RedButtonComponent = ({ text, onClick }) => {

  const buttonStyle = {
    backgroundColor: "#ce9dee",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color:"#ffffff",
  };

    return (
      <button style={buttonStyle} onClick={onClick}>
        {text}
      </button>
    );
  };
  export const RedBorderButtonComponent = ({ text, onClick }) => {

    const buttonStyle = {
      backgroundColor: "transparent", // 배경 투명
      padding: "10px 20px",
      border: "2px solid #ce9dee", // 테두리 설정
      borderRadius: "5px",
      cursor: "pointer",
      color: "#2d2736", // 글자 색상도 테두리 색상과 맞춤
    };
  
    return (
      <button style={buttonStyle} onClick={onClick}>
        {text}
      </button>
    );
  };
  