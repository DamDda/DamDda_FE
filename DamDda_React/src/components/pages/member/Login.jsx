import React, { useState } from "react";
import { TextField, Button, Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id) {
      setIdError("아이디를 입력해주세요.");
    } else {
      setIdError("");
    }

    if (!formData.password) {
      setPasswordError("비밀번호를 입력해주세요.");
    } else {
      setPasswordError("");
    }

    if (formData.id && formData.password) {
      console.log("폼 제출됨", formData);
    }
  };

  const handleJoinClick = () => {
    navigate("/join"); // 회원가입 페이지로 이동
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} style={{ width: "400px" }}>
        <TextField
          required
          fullWidth
          id="id"
          name="id"
          label="아이디"
          variant="standard"
          value={formData.id}
          onChange={handleChange}
          error={Boolean(idError)}
          helperText={idError}
          margin="normal"
        />

        <TextField
          required
          fullWidth
          id="password"
          name="password"
          label="비밀번호"
          type="password"
          variant="standard"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(passwordError)}
          helperText={passwordError}
          margin="normal"
        />

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="outlined" color="primary" onClick={handleJoinClick} sx={{ mb: 2, mr: 2 }}>
            회원가입
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{ mb: 2, mr: 1 }}>
            로그인
          </Button>
        </div>

        <div
          style={{ margin: "20px 0", borderBottom: "1px solid lightgray" }}
        />

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <div>
            아이디를 잊어버리셨나요?{" "}
            <MuiLink component={Link} to="/find-id" variant="body2">
              아이디 찾기
            </MuiLink>
          </div>

          <div>
            비밀번호를 잊어버리셨나요?{" "}
            <MuiLink component={Link} to="/reset-password" variant="body2">
              비밀번호 재설정하기
            </MuiLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
