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
import InputAdornment from '@mui/material/InputAdornment';
import FilePresentIcon from '@mui/icons-material/FilePresent';


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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0px auto",
            width: "80%",
            maxWidth: "800px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: "25px 15px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                marginRight: "20px",
                width: "20%",
                minWidth: "80px",
                maxWidth: "100px",
                display: "flex", // Flexbox로 변경
                justifyContent: "space-between", // 좌우로 텍스트를 펼침
              }}
            >
              <span>프</span>
              <span>로</span>
              <span>젝</span>
              <span>트</span>
              <span>:</span>
            </Typography>
            <TextField
              sx={{
                width: "80%",
              }}
              id="standard-basic"
              variant="standard"
              InputProps={{
                readOnly: true, // 입력 불가능 설정
              }}
              defaultValue={projectDetail.collaborationDTO.title} // 기본 내용 추가
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: "25px 15px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                marginRight: "20px",
                width: "20%",
                minWidth: "80px",
                maxWidth: "100px",
                display: "flex", // Flexbox로 변경
                justifyContent: "space-between", // 좌우로 텍스트를 펼침
              }}
            >
              <span>이</span>
              <span>름</span>
              <span>:</span>
            </Typography>
            <TextField
              sx={{
                width: "80%",
              }}
              id="standard-basic"
              variant="standard"
              InputProps={{
                readOnly: true, // 입력 불가능 설정
              }}
              defaultValue={projectDetail.collaborationDTO.name} // 기본 내용 추가
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: "25px 15px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                marginRight: "20px",
                width: "20%",
                minWidth: "80px",
                maxWidth: "100px",
                display: "flex", // Flexbox로 변경
                justifyContent: "space-between", // 좌우로 텍스트를 펼침
              }}
            >
              <span>연</span>
              <span>락</span>
              <span>처</span>
              <span>:</span>
            </Typography>
            <TextField
              sx={{
                width: "80%",
              }}
              id="standard-basic"
              variant="standard"
              InputProps={{
                readOnly: true, // 입력 불가능 설정
              }}
              defaultValue={projectDetail.phoneNumber} // 기본 내용 추가
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: "25px 15px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                marginRight: "20px",
                width: "20%",
                minWidth: "80px",
                maxWidth: "100px",
                display: "flex", // Flexbox로 변경
                justifyContent: "space-between", // 좌우로 텍스트를 펼침
              }}
            >
              <span>이</span>
              <span>메</span>
              <span>일</span>
              <span>:</span>
            </Typography>
            <TextField
              sx={{
                width: "80%",
              }}
              id="standard-basic"
              variant="standard"
              InputProps={{
                readOnly: true, // 입력 불가능 설정
              }}
              defaultValue={projectDetail.email} // 기본 내용 추가
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              margin: "25px 15px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                marginRight: "20px",
                width: "20%",
                minWidth: "80px",
                maxWidth: "100px",
                display: "flex", // Flexbox로 변경
                justifyContent: "space-between", // 좌우로 텍스트를 펼침
              }}
            >
              <span>제</span>
              <span>안</span>
              <span>내</span>
              <span>용</span>
              <span>:</span>
            </Typography>
            <TextField
              sx={{
                width: "80%",
              }}
              id="standard-basic"
              variant="outlined"
              InputProps={{
                readOnly: true, // 입력 불가능 설정
              }}
              defaultValue={projectDetail.content} // 기본 내용 추가
              // defaultValue = "아아ㅏ앙ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"
              multiline // 여러 줄 입력 가능
              rows={10} // 기본 높이 설정
              maxRows={100} // 최대 4줄까지 자동 조절
              fullWidth
            />
          </Box>
        </Box>

        <Box mt={2}>
          {projectDetail.collabDocList &&
            projectDetail.collabDocList.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0px auto",
                  width: "80%",
                  maxWidth: "800px",
                }}
              >
                <h3
                  style={{
                    width: "100%", // 너비를 100%로 설정
                    textAlign: "left", // 텍스트를 왼쪽 정렬
                    margin: "0", // 필요에 따라 상하좌우 여백 설정
                  }}
                >
                  첨부 파일:
                </h3>
                {/* 파일 아이콘과 파일명을 표시하는 입력 필드 */}

                <Box>
                  {projectDetail.collabDocList.map((fileName, index) => (
                    <TextField
                      sx={{
                        margin: "30px",
                        width: "600px",
                      }}
                      label="File"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              onClick={() => handleDownload(fileName)}
                            >
                              <FilePresentIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <span
                              onClick={() => handleDownload(fileName)}
                              style={{ cursor: "pointer" }}
                            >
                              {fileName}
                            </span>
                          </InputAdornment>
                        ),
                      }}
                    />
                  ))}
                </Box>
              </Box>
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
