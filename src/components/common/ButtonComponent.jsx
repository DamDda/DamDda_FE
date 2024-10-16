// import { Button, Tooltip } from '@mui/material'

// const ButtonComponent = ({ text, onClick, style }) => {
//     return (
//         <button style={style} onClick={onClick}>
//             {text}
//         </button>
//     )
// }

// export const BlueButtonComponent = ({ text, onClick }) => {
//     const buttonStyle = {
//         backgroundColor: '#677cf9',
//         padding: '10px 20px',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//         color: '#ffffff',
//     }
//     return (
//         <button style={buttonStyle} onClick={onClick}>
//             {text}
//         </button>
//     )
// }

// export const BlueBorderButtonComponent = ({ text, onClick }) => {
//     const buttonStyle = {
//         backgroundColor: 'transparent', 
//         padding: '10px 20px',
//         border: '2px solid #677cf9', 
//         borderRadius: '5px',
//         cursor: 'pointer',
//         color: '#2d2736',
//     }
//     return (
//         <button style={buttonStyle} onClick={onClick}>
//             {text}
//         </button>
//     )
// }

// export const RedButtonComponent = ({ text, onClick }) => {
//     const buttonStyle = {
//         backgroundColor: '#ce9dee',
//         padding: '10px 20px',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//         color: '#ffffff',
//     }

//     return (
//         <button style={buttonStyle} onClick={onClick}>
//             {text}
//         </button>
//     )
// }
// export const RedBorderButtonComponent = ({ text, onClick }) => {
//     const buttonStyle = {
//         backgroundColor: 'transparent', 
//         padding: '10px 20px',
//         border: '2px solid #ce9dee', 
//         borderRadius: '5px',
//         cursor: 'pointer',
//         color: '#2d2736', 
//     }

//     return (
//         <button style={buttonStyle} onClick={onClick}>
//             {text}
//         </button>
//     )
// }

// // StatusButton 컴포넌트
// export const StatusButton = ({
//     status,
//     label,
//     showRejectReason,
//     rejectMessage,
//     onClick,
//     sx,
// }) => {
//     const getButtonProps = () => {
//         switch (status) {
//             case '진행중':
//                 return {
//                     color: 'white',
//                     borderColor: '#4caf50',
//                     backgroundColor: '#4caf50',
//                 }
//             case '마감':
//                 return {
//                     color: 'white',
//                     borderColor: '#f44336',
//                     backgroundColor: '#f44336',
//                 }
//             case '승인완료':
//                 return {
//                     color: 'black',
//                     borderColor: '#4caf50',
//                     backgroundColor: '#4caf50',
//                 }
//             case '승인대기':
//                 return {
//                     color: 'black',
//                     borderColor: '#ff9800',
//                     backgroundColor: '#ff9800',
//                 }
//             case '승인거절':
//                 return {
//                     color: 'black',
//                     borderColor: '#f44336',
//                     backgroundColor: '#f44336',
//                 }
//             case '미정':
//                 return {
//                     color: 'black',
//                     borderColor: 'yellow',
//                     backgroundColor: 'yellow',
//                 }
//             case '결제 취소':
//                 return {
//                     color: 'white',
//                     borderColor: '#ce9dee',
//                     backgroundColor: '#ce9dee',
//                     disableHover: true,
//                 }
//             case '결제/배송 정보':
//                 return {
//                     color: '#1e88e5',
//                     borderColor: '#1e88e5',
//                     backgroundColor: 'transparent',
//                     hoverBackgroundColor: '#e3f2fd',
//                     width: '140px',
//                 }
//             default:
//                 return {
//                     color: '#757575',
//                     borderColor: '#757575',
//                     backgroundColor: 'transparent',
//                 }
//         }
//     }

//     const {
//         color,
//         borderColor,
//         backgroundColor,
//         width,
//         hoverBackgroundColor,
//         disableHover,
//     } = getButtonProps()

//     return (
//         <Tooltip
//             title={showRejectReason && rejectMessage ? rejectMessage : ''}
//             arrow
//             placement="top"
//         >
//             <Button
//                 variant="outlined"
//                 onClick={onClick}
//                 sx={{
//                     '--variant-borderWidth': '2px',
//                     borderRadius: 20,
//                     width: width || '100px',
//                     height: '40px',
//                     fontSize: '14px',
//                     color,
//                     borderColor,
//                     backgroundColor,
//                     ...sx,
//                     '&:hover': {
//                         backgroundColor: disableHover
//                             ? backgroundColor
//                             : hoverBackgroundColor || backgroundColor,
//                         borderColor,
//                         color,
//                     },
//                 }}
//             >
//                 {label}
//             </Button>
//         </Tooltip>
//     )
// }



import { Button, Tooltip } from "@mui/material";

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
    color: "#ffffff",
  };
  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export const BlueBorderButtonComponent = ({ text, onClick }) => {
  const buttonStyle = {
    backgroundColor: "transparent",
    padding: "10px 20px",
    border: "2px solid #677cf9",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#2d2736",
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
    color: "#ffffff",
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};
export const RedBorderButtonComponent = ({ text, onClick }) => {
  const buttonStyle = {
    backgroundColor: "transparent",
    padding: "10px 20px",
    border: "2px solid #ce9dee",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#2d2736",
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

// StatusButton 컴포넌트
export const StatusButton = ({
  status,
  label,
  showRejectReason,
  rejectMessage,
  onClick,
  sx,
}) => {
  const getButtonProps = () => {
    switch (status) {
      case "진행중":
        return {
          color: "white",
          borderColor: "#4caf50",
          backgroundColor: "#4caf50",
        };
      case "마감":
        return {
          color: "white",
          borderColor: "#f44336",
          backgroundColor: "#f44336",
        };
      case "승인완료":
        return {
          color: "black",
          borderColor: "#4caf50",
          backgroundColor: "#4caf50",
        };
      case "승인대기":
        return {
          color: "black",
          borderColor: "#ff9800",
          backgroundColor: "#ff9800",
        };
      case "승인거절":
        return {
          color: "black",
          borderColor: "#f44336",
          backgroundColor: "#f44336",
        };
      case "미정":
        return {
          color: "black",
          borderColor: "yellow",
          backgroundColor: "yellow",
        };
      case "결제 취소":
        return {
          color: "white",
          borderColor: "#ce9dee",
          backgroundColor: "#ce9dee",
          disableHover: true,
        };
      case "결제/배송 정보":
        return {
          color: "#1e88e5",
          borderColor: "#1e88e5",
          backgroundColor: "transparent",
          hoverBackgroundColor: "#e3f2fd",
          width: "140px",
        };
      default:
        return {
          color: "#757575",
          borderColor: "#757575",
          backgroundColor: "transparent",
        };
    }
  };

  const {
    color,
    borderColor,
    backgroundColor,
    width,
    hoverBackgroundColor,
    disableHover,
  } = getButtonProps();

  return (
    <Tooltip
      title={showRejectReason && rejectMessage ? rejectMessage : ""}
      arrow
      placement="top"
    >
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{
          "--variant-borderWidth": "2px",
          borderRadius: 20,
          width: width || "100px",
          height: "40px",
          fontSize: "14px",
          color,
          borderColor,
          backgroundColor,
          ...sx,
          "&:hover": {
            backgroundColor: disableHover
              ? backgroundColor
              : hoverBackgroundColor || backgroundColor,
            borderColor,
            color,
          },
        }}
      >
        {label}
      </Button>
    </Tooltip>
  );
};


//Entire.jsx버튼
export const ProgressButton = ({ type, progress, handleClick, children }) => {
    return (
      <Button
        onClick={() => handleClick(type)}
        variant={progress === type ? "contained" : "outlined"}
        size="small"
        sx={{
          borderRadius: "12px",
          fontSize: "0.75rem",
          marginRight: "20px",
        }}
      >
        {children}
      </Button>
    );
  };