import React, { useState } from 'react'; 
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import {user} from "../../../UserContext"
import axios from "axios"
import {SERVER_URL} from "../../../constants/URLs"

const EditModal = ({ open, onClose, onSubmit, setError,error, currentPassword }) => {
  const [password, setPassword] = useState('');
  // const [error, setError] = useState(''); // 에러 메시지 상태 추가


  const handleSubmit = async () => {
    
    // console.log("handleSubmit 처음 부분:");
    // // e.preventDefault();

    // const formatLogin = {
    //   loginId: user.id,
    //   password: password,
    // };
    // try {
    //   let valid = true;
    //   console.log("트라이 처음 부분:");
      
    //   // 모든 필드가 입력되었을 때만 검증 진행
    //   if (valid) {
    //     console.log("if처음부분임:");
    //     const response = await axios.post(`${SERVER_URL}/member/login`, formatLogin, {
    //       withCredentials: true,
    //       headers: { "Content-Type": "application/json" },
    //     });
    //     // response.data에서 X-Nickname 값 가져오기
    //     const nickname = response.data["X-Nickname"];
    //     console.log("Nickname:", nickname);
    //     if(nickname === user.nickname){
    //       setIsEditing(true); // 프로필 수정 페이지로 이동
    //     } else{
    //       setPasswordError("비밀번호가 틀렸습니다. 다시 입력해주세요.");
    //     }        
    //     }       
    //   }
    // catch (error) {
    //   setPasswordError("비밀번호가 틀렸습니다. 다시 입력해주세요.");
    // }

    // currentPassword와 입력된 비밀번호 비교
    // if (password === currentPassword) {  // 올바른 비밀번호는 부모 컴포넌트에서 전달된 currentPassword로 비교
      onSubmit(password);  // 비밀번호가 맞으면 onSubmit 호출
      // setError('');  // 에러 메시지 초기화
      // onClose();  // 모달 닫기
    // } else {
    //   setError('비밀번호가 틀렸습니다. 다시 입력해주세요.');  // 에러 메시지 설정
    // }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <Typography variant="h6" align="center">
          🔒 접근 암호 인증
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography align="center">
          암호 입력 후 프로필 수정 페이지로 이동할 수 있습니다.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* 에러 메시지 표시 */}
        {error && (
          <Typography color="error" align="center" style={{ marginTop: '10px' }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          취소
        </Button>
        <Button onClick={handleSubmit} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
