import React, { useState } from "react";
import { TextField, Button, Link } from "@mui/material";
import FindID from "./FindID";
import ResetPassword from "./ResetPassword";
import Join from "./Join";

const Login = () => {
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
        {/* 아이디 입력 */}
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

        {/* 비밀번호 입력 */}
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

        {/* 회원가입, 로그인 버튼 */}
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="primary" onClick={Join}>
            회원가입
          </Button>
          <Button type="submit" variant="contained" color="primary">
            로그인
          </Button>
        </div>

        {/* 구분선 */}
        <div style={{ margin: "20px 0", borderBottom: "1px solid lightgray" }} />

        {/* 아이디/비밀번호 찾기 링크 */}
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <div>
            아이디를 잊어버리셨나요?{" "}
            <Link href={FindID} variant="body2">
              아이디 찾기
            </Link>
          </div>
          
          <div>
            비밀번호를 잊어버리셨나요?{" "}
            <Link href={ResetPassword} variant="body2">
              비밀번호 재설정하기
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
