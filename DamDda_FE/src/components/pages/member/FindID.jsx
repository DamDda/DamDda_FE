import React, { useState } from "react";
import { TextField, Button, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

import '../../styles/style.css'
import { Header } from "../../layout/Header";
import { Footer } from "../../layout/Footer";
const FindID = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
  
    if (!formData.name) {
      setNameError("이름을 입력해주세요.");
      return;
    }
  
    if (!formData.email) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }
  
    try {
      const response = await axios.post(`${SERVER_URL}/member/findid`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('오류가 발생했습니다.');
      }
  
      const formData = await response.json();
      
      // 입력한 정보가 맞는 경우
      if (formData.id) {
        setUserId(formData.id); 
        setOpen(true);
      } else {
        // 아이디를 찾을 수 없는 경우 처리
        alert("아이디를 찾을 수 없습니다. 다시 입력해주세요.");
      }
     
    } catch (error) {
      console.error("아이디 찾기 중 문제 발생!!!!!!!!!", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
    <Header />
     	 <div className="container">
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h2>아이디 찾기</h2>
        <form onSubmit={handleSubmit}>
          {/* 이름 입력 */}
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            label="이름"
            variant="standard"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(nameError)}
            helperText={nameError}
            margin="normal"
          />

          {/* 이메일 입력 */}
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            label="이메일"
            type="email"
            variant="standard"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(emailError)}
            helperText={emailError}
            margin="normal"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Button type="submit" variant="contained" color="primary" >
              아이디 찾기
            </Button>
          </div>

          {/* 모달창 추가 */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>아이디 찾기 결과</DialogTitle>
            <DialogContent>
              아이디: {userId}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                닫기
              </Button>
            </DialogActions>
          </Dialog>


          <div
            style={{ margin: "20px 0", borderBottom: "1px solid lightgray" }}
          />

          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <div>
              비밀번호를 잊어버리셨나요?{" "}
              <MuiLink component={Link} to="/reset-password" variant="body2">
                비밀번호 재설정하기
              </MuiLink>
            </div>

            <div>
              가입을 원하시나요?{" "}
              <MuiLink component={Link} to="/join" variant="body2">
                회원가입하러 가기
              </MuiLink>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
    <Footer />
    </>

  );
};

export default FindID;
