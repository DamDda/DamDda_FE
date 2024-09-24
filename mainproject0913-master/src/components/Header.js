import React, { useState } from "react";

const Headers = ({ nickname }) => {
  return (
    <div style={{ marginTop: "20px", marginLeft: "100px", textAlign: "left" }}>
      <h1
        style={{
          borderBottom: "0.5px solid gray",
          display: "inline-block",
          width: "1000px",
          paddingBottom: "20px",
          fontSize: "30px",
        }}
      >
        {nickname ? `${nickname}님 마이페이지` : "사용자님 마이페이지"}
      </h1>
    </div>
  );
};

export default Headers;
