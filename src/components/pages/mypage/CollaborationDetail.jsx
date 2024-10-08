import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
    Paper, 
    Typography, 
    Button, 
    TextField, 
    Box,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    IconButton,
    DialogContentText, 
    CircularProgress,
    DialogActions} from '@mui/material';    
import DeleteIcon from '@mui/icons-material/Delete'; // 올바른 경로로 임포트
import axios from 'axios';
import { useUser } from "../../../UserContext";



const CollaborationDetail = ({ collabId, filter, setCollabClick }) => {
    
  const { user } = useUser();
  //const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState(null);

  const [open, setOpen] = useState(false); // 모달 상태 관리
  const [currentAction, setCurrentAction] = useState(""); // 현재 실행할 액션 (승인 or 거절)

  const handleReadDetail = async () => {
    try {
      const response = await axios.get(`/collab/readDetail/${collabId}`, {
        withCredentials: true,
      })
      console.log(response.data)
      setProjectDetail(response.data)
    } catch (error) {
      console.log('handleReadDetail에서 에러 발생 ' + error)
    }
  }

  useEffect(() => {
    handleReadDetail();
  }, []);

  if (!projectDetail) return <CircularProgress />;  // 로딩 상태 표시



  const handleDownload = async fileName => {
    console.log(fileName) //4604642e-2515-466e-aa78-a18afebf9a3b_성공성공오예.txt
    try {
      const response = await axios.get(`/collab/download`, {
        params: { fileName },
        responseType: 'blob',
        withCredentials: true,
      })

      // 파일 다운로드 처리
      const contentDisposition = response.headers['content-disposition']
      const downloadFileName = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/['"]/g, '')
        : fileName

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', downloadFileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('파일 다운로드 중 에러 발생:', error)
      alert('파일 다운로드에 실패했습니다.')
    }
  }



  // 모달 열기
  const handleClickOpen = (action) => {
    setCurrentAction(action); // 현재 실행할 액션 저장 (승인 or 거절)
    setOpen(true);
  };

  // 모달 닫기
  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = (currentAction) => {
    if (currentAction === "승인" || currentAction === "거절") {
      handleApproval(currentAction);
    } else if (currentAction === "삭제") {
      handleDelete(currentAction);
    }
    handleClose();
  };

  /*협업받은 제안자일 때만 approval, reject 가능하도록 설정 */
  const handleApproval = async (status) => {
    let approvalPath;
    if(status === "승인"){
        approvalPath = `/collab/approval`
    } else if(status === "거절"){
        approvalPath = `/collab/reject`
    }
    try {
      await axios.put(approvalPath, [collabId], {
        withCredentials: true,
      })
      alert(`선택된 협업들이 ${status}되었습니다.`);
      setCollabClick(false);
    } catch (error) {
        console.error(`${status} 처리 중 에러 발생:`, error);
        alert(`${status} 처리에 실패했습니다.`);
    }
  }

  const handleDelete = async (status) => {
    await axios.delete(`/collab/delete`, {
        params: { user_id: user.id }, 
        data: [collabId]  // 바로 배열을 전송
      });
    alert(`선택된 협업이 ${status}되었습니다.`)
    setCollabClick(false);
  }




  return (
    <>
      <Paper style={{ margin: "100px auto", padding: " 20px" }}>
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          InputProps={{
            readOnly: true, // 입력 불가능 설정
          }}
          defaultValue={projectDetail.title} // 기본 내용 추가
          fullWidth
        />

<Box>

<TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          InputProps={{
            readOnly: true, // 입력 불가능 설정
          }}
          defaultValue={projectDetail.collaborationDTO.name} // 기본 내용 추가
          fullWidth
        />

</Box>
<Typography>이름: </Typography>
<TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          InputProps={{
            readOnly: true, // 입력 불가능 설정
          }}
          defaultValue={projectDetail.title} // 기본 내용 추가
          fullWidth
        />

<TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          InputProps={{
            readOnly: true, // 입력 불가능 설정
          }}
          defaultValue={projectDetail.title} // 기본 내용 추가
          fullWidth
        />

<TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          InputProps={{
            readOnly: true, // 입력 불가능 설정
          }}
          defaultValue={projectDetail.title} // 기본 내용 추가
          fullWidth
        />

        <Typography variant="h5">{projectDetail.title}</Typography>
        <Typography>이름: {projectDetail.collaborationDTO.name}</Typography>
        <Typography>휴대폰 번호: {projectDetail.phoneNumber}</Typography>
        <Typography>이메일: {projectDetail.email}</Typography>
        <Typography>협업 제안 내용: {projectDetail.content}</Typography>

        <Box mt={2}>
          {projectDetail.collabDocList &&
            projectDetail.collabDocList.length > 0 && (
              <div>
                <h3>첨부 파일:</h3>
                <ul>
                  {projectDetail.collabDocList.map((fileName, index) => (
                    <li onClick={() => handleDownload(fileName)} key={index}>
                      {fileName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </Box>

        <Box
          marginTop="20px"
          display="flex"
          width="100%"
          justifyContent="space-between"
          p={2}
        >
          {/* 좌측에 삭제 버튼 */}
          <Button
            sx={{ margin: "10px" }}
            variant="outlined"
            color="error"
            onClick={() => handleClickOpen("삭제")}
          >
            삭제
          </Button>

          {/* 우측에 승인, 거절 버튼 */}
          {filter === "제안 받은 협업" && (
            <Box display="flex">
              <Button
                sx={{ margin: "10px" }}
                variant="contained"
                onClick={() => handleClickOpen("승인")}
              >
                승인
              </Button>
              <Button
                sx={{ margin: "10px" }}
                variant="outlined"
                onClick={() => handleClickOpen("거절")}
              >
                거절
              </Button>
            </Box>
          )}
        </Box>
      </Paper>

      {/* 모달 (Dialog) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>정말로 {currentAction}하시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            확인을 누르면 {currentAction}됩니다. 정말로 {currentAction}{" "}
            하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={() => handleAction(currentAction)} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CollaborationDetail;
