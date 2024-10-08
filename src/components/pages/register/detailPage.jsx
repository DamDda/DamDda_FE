import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Modal,
  Snackbar,
  IconButton,
  Paper,
  Input,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styled from "styled-components";
import Write from "./write";
import "./Register.css";
import "../../styles/style.css";

//상세설명 페이지
const DetailPage = ({
  descriptionImagesUrl, //  기존에 저장된 이미지 URL 리스트
  descriptionDetail, // 기존에 저장된 상세 설명 내용
  setDescriptionDetail, // 상세 설명 내용을 업데이트하는 함수
  setDescriptionImages, // 이미지 리스트를 업데이트하는 함수
}) => {
  // 폼 데이터 관리 (상세 설명)
  const [formData, setFormData] = useState({
    description: "",
  });

  // 컴포넌트가 렌더링될 때 초기화
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: descriptionDetail, // description 필드를 업데이트
    }));
    setImagePreviews(descriptionImagesUrl); // 이미지 미리보기 업데이트
  }, [descriptionDetail]);

  const [aiModalOpen, setAiModalOpen] = useState(false); // AI 도움받기 모달 상태
  const [confirmationOpen, setConfirmationOpen] = useState(false); // 설명 등록 확인 모달 상태
  const [imagePreviews, setImagePreviews] = useState([]); // 이미지 미리보기 상태
  const [snackbarOpen, setSnackbarOpen] = useState(false); // 스낵바 상태 (알림)
  const [aiText, setAiText] = useState("AI가 생성한 설명 내용"); // AI 도움받기 내용

  console.log(imagePreviews);
  console.log(formData.description, "1 ", descriptionDetail);

  // 입력 파일을 참조할 ref
  const inputRef = useRef(null);

  // AI 도움받기 모달 열기
  const openAiModal = () => {
    setAiModalOpen(true);
  };

  // AI 도움받기 모달 닫기
  const closeAiModal = () => {
    setAiModalOpen(false);
  };

  // AI 도움받기 설명 등록 요청
  const handleRegisterDescription = () => {
    setConfirmationOpen(true);
    closeAiModal();
  };

  // 설명을 AI에서 받은 텍스트로 설정
  const handleConfirmRegister = () => {
    setFormData({
      ...formData,
      description: aiText, // 설명을 AI에서 생성한 텍스트로 설정
    });
    setConfirmationOpen(false);
    setSnackbarOpen(true);
  };

  // 설명 등록 확인 모달 닫기
  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  // 스낵바 닫기
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // 이미지 업로드 핸들러 (업로드된 이미지 파일 처리)
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files); // 업로드된 파일 배열로 변환

    // 각 파일의 미리보기 URL 생성
    const filePreviews = files.map((file) => {
      return URL.createObjectURL(file);
    });

    setDescriptionImages((prevImages) => [...prevImages, ...files]); // 기존 이미지에 추가
    setImagePreviews((prevImages) => [...prevImages, ...filePreviews]); // 이미지 미리보기 상태 업데이트
    console.log(imagePreviews);
  };

  // 이미지 삭제 핸들러
  const handleImageDelete = (index) => {
    setImagePreviews((prevImages) => {
      const newImages = prevImages.slice();
      newImages.splice(index, 1);
      return newImages;
    });
    setDescriptionImages((prevImages) => {
      const newImages = prevImages.slice();
      newImages.splice(index, 1);
      return newImages;
    });
  };

  // 상세 설명 내용이 변경될 때 호출
  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  // 숨겨진 파일 입력 필드 스타일링
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          {/* 페이지 제목과 버튼 */}
          <div className="header-container">
            <h1>상세설명</h1>
            <div className="button-right">
              <Button
                className="outlined-button"
                variant="outlined"
                onClick={openAiModal}
              >
                AI 도움받기
              </Button>
            </div>
          </div>

          {/* 상세설명 인풋창 */}
          <div
            style={{
              width: "100%",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={handleDescriptionChange}
              style={{ height: "300px", width: "1200px" }}
            />

            {/* <Write /> */}
          </div>

          {/* AI 도움받기 모달 */}
          <Modal open={aiModalOpen} onClose={closeAiModal}>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                margin: "auto",
                width: "750px",
                marginTop: "100px",
              }}
            >
              <h2>AI 도움받기</h2>
              <TextField
                fullWidth
                multiline
                rows={30}
                value={aiText}
                InputProps={{
                  readOnly: true,
                }}
                style={{ marginTop: "20px", width: "700px" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Button className="outlined-button" onClick={closeAiModal}>
                  닫기
                </Button>
                <Button
                  className="primary-button"
                  variant="contained"
                  style={{ marginLeft: "10px" }}
                  onClick={handleRegisterDescription}
                >
                  상세설명으로 등록
                </Button>
              </div>
            </div>
          </Modal>

          {/* 등록 확인 모달 */}
          <Modal open={confirmationOpen} onClose={handleCloseConfirmation}>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                margin: "auto",
                width: "400px",
                marginTop: "100px",
                borderRadius: "10px",
              }}
            >
              <h3>정말로 등록하시겠습니까?</h3>
              <Button
                className="primary-button"
                onClick={handleConfirmRegister}
                variant="contained"
              >
                확인
              </Button>
              <Button
                className="outlined-button"
                onClick={handleCloseConfirmation}
              >
                취소
              </Button>
            </div>
          </Modal>

          {/* 성공 메시지 스낵바 */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="success">
              상세설명이 등록되었습니다!
            </Alert>
          </Snackbar>

          {/* 이미지 미리보기 및 업로드 */}
          <div style={{ width: "100%", marginTop: "40px" }}>
            <Typography variant="h6">이미지</Typography>
            <Paper
              style={{
                padding: "20px",
                minHeight: "100px",
                position: "relative",
              }}
            >
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    margin: "10px",
                  }}
                >
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => handleImageDelete(index)}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              ))}
              <Input
                type="file"
                inputProps={{ multiple: true }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  opacity: 0,
                  width: 0,
                  height: 0,
                }}
                ref={inputRef}
                onChange={handleImageUpload}
              />
            </Paper>
            <Button
              className="primary-button"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              onClick={() => inputRef.current.click()}
            >
              📤이미지 업로드
              <VisuallyHiddenInput
                type="file"
                onChange={handleImageUpload}
                multiple
              />
            </Button>
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default DetailPage;
