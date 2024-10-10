import React, { useState, useRef, useEffect } from "react";
import {
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
import "./Register.css";
import "../../styles/style.css";
import AiModal from "./AiModal/AiModal";

const DetailPage = ({
  descriptionImagesUrl,
  descriptionDetail,
  setDescriptionImages,
  aiRequestData, // 생성형 AI 데이터 수신
}) => {
  const [formData, setFormData] = useState({
    description: "",
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: descriptionDetail,
    }));
    setImagePreviews(descriptionImagesUrl);
  }, [descriptionDetail]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  console.log(imagePreviews);
  console.log(formData.description, "1 ", descriptionDetail);

  const inputRef = useRef(null);

  const handleConfirmRegister = () => {
    setFormData({
      ...formData,
    });
    setConfirmationOpen(false);
    setSnackbarOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    const filePreviews = files.map((file) => {
      return URL.createObjectURL(file);
    });

    setDescriptionImages((prevImages) => [...prevImages, ...files]);
    setImagePreviews((prevImages) => [...prevImages, ...filePreviews]);
    console.log(imagePreviews);
  };

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

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  // --------생성형 AI 모달 관련 상태 및 함수 시작--------

  const [aiModalOpen, setAiModalOpen] = useState(false);
  // AI 모달의 열림/닫힘 상태를 관리하는 상태 변수

  /**
   * AI 모달을 닫는 함수
   * 모달을 닫는 작업을 수행할 때 호출됩니다.
   */
  const closeAiModal = () => {
    setAiModalOpen(false); // 모달을 닫기 위해 상태를 false로 변경
  };

  /**
   * AI가 생성한 설명을 formData에 저장하고 모달을 닫는 함수
   * @param {string} aiGeneratedDescriptionDetail - AI가 생성한 프로젝트 설명
   */
  const confirmAiDescriptionDetailRegistration = (
    aiGeneratedDescriptionDetail
  ) => {
    // formData의 description 필드를 AI가 생성한 설명으로 업데이트
    setFormData({ ...formData, description: aiGeneratedDescriptionDetail });

    // 설명 등록 후 모달을 닫음
    closeAiModal();
  };

  // --------생성형 AI 모달 관련 상태 및 함수 종료--------

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
                onClick={() => setAiModalOpen(true)}
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
              alignItems: "flex-end",
            }}
          >
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={handleDescriptionChange}
              style={{
                height: "600px",
                width: "1200px",
                whiteSpace: "pre-wrap",
              }}
            />
          </div>

          {/* 생성형 AI 도움받기 모달 */}
          <AiModal
            aiModalOpen={aiModalOpen}
            closeAiModal={closeAiModal}
            aiRequestData={aiRequestData}
            confirmAiDescriptionDetailRegistration={
              confirmAiDescriptionDetailRegistration
            }
          />

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
